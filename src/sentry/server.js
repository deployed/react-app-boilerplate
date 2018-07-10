import logger from 'razzle-dev-utils/logger';

import convertTags from './convertTags';


// eslint-disable-next-line import/no-mutable-exports
let Raven;

if (process.env.IS_PRODUCTION && process.env.SENTRY_SERVER_DSN) {
  // eslint-disable-next-line global-require
  Raven = require('raven');
  Raven.config(process.env.SENTRY_SERVER_DSN, {
    release: process.env.VERSION,
    tags: process.env.SENTRY_SERVER_TAGS ? convertTags(process.env.SENTRY_SERVER_TAGS) : {},
  }).install();
} else {
  console.warn('Sentry is disabled in development mode');
  const noop = () => {};
  // Mock the Raven API in development
  Raven = {
    captureException: (err) => {
      logger.error('captureException mock error:', err);
    },
    setUserContext: noop,
    config: () => ({ install: noop }),
    requestHandler: () => (req, res, next) => next(),
    errorHandler: () => (err, req, res, next) => next(err),
    parsers: {
      parseRequest: noop,
    },
  };
}

export default Raven;
