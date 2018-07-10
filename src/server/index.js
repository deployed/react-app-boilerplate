/* eslint-disable consistent-return, no-param-reassign, no-unused-vars, no-console, import/first */
// setup process related env variables
import './env';

import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import compression from 'compression';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { IntlProvider } from 'react-intl';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as MobXProvider, useStaticRendering } from 'mobx-react';
import { Helmet } from 'react-helmet';
import logger from 'razzle-dev-utils/logger';

import App from 'containers/App';
import AppStore from 'stores/AppStore';
import Raven from 'sentry/server';

// Import theme for ThemeProvider
import theme from 'theme';

import { getHeader, getFooter } from './html-template';
import createApolloClient from './createApolloClient';

// import react loadable stats file. Disable no unresolved for lint without build
import loadableStats from '../../build/react-loadable.json'; // eslint-disable-line import/no-unresolved

import { DEFAULT_LOCALE } from '../settings';

// Import global styles
import '../global-styles';

// Import i18n messages
import { translationMessages } from '../translations';


// tell MobX that we are rendering on server side
// https://github.com/mobxjs/mobx-react#server-side-rendering-with-usestaticrendering
useStaticRendering(true);

const server = express();

server
  .use(Raven.requestHandler())
  .disable('x-powered-by');

// if PUBLIC_PATH is not absolute url - serve static files
// NOTE: absolute PUBLIC_PATH will work only in prod env
if (process.env.PUBLIC_PATH && !process.env.PUBLIC_PATH.match(/https?:\/\//)) {
  server.use(process.env.PUBLIC_PATH, express.static(process.env.RAZZLE_PUBLIC_DIR));
}

if (process.env.IS_DEV) {
  // Handle source maps correctly for now
  // TODO: remove it?
  server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
} else {
  server.use(compression());
}

server
  .get('/*', async (req, res, next) => {
    // Set correct content type for ssr
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const client = createApolloClient(req);
    // Initialize MobX stores
    const appStore = new AppStore({ api: client, cookie: req.headers.cookie });
    await appStore.initialize();
    // Set location to routing store
    appStore.routingStore.location = req._parsedUrl; // eslint-disable-line no-underscore-dangle
    const context = {};
    // Create the server side style sheet
    const sheet = new ServerStyleSheet();
    const modules = [];
    const tree = sheet.collectStyles(
      <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
        <MobXProvider appStore={appStore} {...appStore.getAllStores()}>
          <ApolloProvider client={client}>
            <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages}>
              <ThemeProvider theme={theme}>
                <StaticRouter context={context} location={req.url}>
                  <App />
                </StaticRouter>
              </ThemeProvider>
            </IntlProvider>
          </ApolloProvider>
        </MobXProvider>
      </Loadable.Capture>,
    );
    try {
      await getDataFromTree(tree);
    } catch (e) {
      return next(e);
    }

    if (context.url) {
      logger.debug(`Redirecting found. Redirect from: "${req.path}" to: "${context.url}"`);
      res.redirect(context.status, context.url);
      return;
    }

    res.status(200);

    const apolloData = client.extract();
    const helmet = Helmet.renderStatic();


    const bundles = getBundles(loadableStats, modules)
    // Filter out undefined - react loadable do not support well webpack 4
    // Loadable getBundles returns undefined chunks if webpack chunk is too small
      .filter((bundle) => bundle !== undefined);

    res.write(getHeader(helmet, bundles));

    const stream = sheet.interleaveWithNodeStream(
      renderToNodeStream(tree),
    );

    stream.pipe(res, { end: false });

    const sessionStore = appStore.sessionStore.toJs();
    stream.on('end', () => res.end(getFooter(apolloData, sessionStore)));
  });

// error middleware
server
  .use(Raven.errorHandler())
  .use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    logger.error('Unexpected error', err);
    if (process.env.IS_PRODUCTION) {
      // TODO: add better 500 page
      res.status(err.statusCode).send(`Server error ${err.statusCode}`);
    } else {
      res.status(err.statusCode);
      res.end(err.stack);
    }
  });


process.on('unhandledRejection', async (err) => {
  logger.error('Unhandled rejection', err);
  try {
    await new Promise((res) => Raven.captureException(err, res));
  } catch (ravenError) {
    logger.error('Raven error', ravenError);
  } finally {
    process.exit(1);
  }
});

process.on('uncaughtException', async (err) => {
  logger.error('Uncaught exception', err);
  try {
    await new Promise((res) => Raven.captureException(err, res));
  } catch (ravenError) {
    logger.error('Raven error', ravenError);
  } finally {
    process.exit(1);
  }
});

export default server;
