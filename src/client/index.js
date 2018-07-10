/* eslint-disable import/first */
import './publicPath';

import 'babel-polyfill';

// Initialize sentry
import 'sentry/client';

import React from 'react';
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { Router } from 'react-router';
import Loadable from 'react-loadable';
import { Provider as MobXProvider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import { configure as configureMobx } from 'mobx';
import { ThemeProvider } from 'styled-components';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';

// Import translations messages
import { translationMessages } from 'translations';
import { DEFAULT_LOCALE } from 'settings';

// Import theme
import theme from 'theme';

// Import CSS reset and Global Styles
import 'global-styles';

// Import App entry and store
import App from 'containers/App';
import AppStore from 'stores/AppStore';

// Import apollo configuration
import apolloClient from './apolloClient';


// Configure MobX to use strict mode
configureMobx({
  enforceActions: true,
});

// Initialize MobX stores
const appStore = new AppStore({ api: apolloClient });
appStore.initialize();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, appStore.routingStore);

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <MobXProvider appStore={appStore} {...appStore.getAllStores()}>
        <IntlProvider locale={DEFAULT_LOCALE} messages={messages}>
          <Router history={history}>
            <ApolloProvider client={apolloClient}>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </ApolloProvider>
          </Router>
        </IntlProvider>
      </MobXProvider>,
      MOUNT_NODE,
    );
  });
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['translations', 'containers/App'], () => {
    unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'/* webpackChunkName: "IntlPolyfill" */));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}
