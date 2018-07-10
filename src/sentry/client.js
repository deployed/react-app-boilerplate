import { runtimeConfig } from 'settings';

import convertTags from './convertTags';

// eslint-disable-next-line import/no-mutable-exports
let Raven;

if (process.env.IS_PRODUCTION && runtimeConfig.SENTRY_CLIENT_DSN) {
  // eslint-disable-next-line global-require
  Raven = require('raven-js');
  Raven
    .config(runtimeConfig.SENTRY_CLIENT_DSN, {
      release: runtimeConfig.VERSION,
      tags: runtimeConfig.SENTRY_CLIENT_TAGS ? convertTags(runtimeConfig.SENTRY_CLIENT_TAGS) : {},
      // Ignore list based off: https://gist.github.com/1878283
      // Will cause a deprecation warning, but the demise of `ignoreErrors` is still under discussion.
      // See: https://github.com/getsentry/raven-js/issues/73
      ignoreErrors: [
        // Random plugins/extensions
        'top.GLOBALS',
        // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        'http://tt.epicplay.com',
        'Can\'t find variable: ZiteReader',
        'jigsaw is not defined',
        'avastBHO',
        'ComboSearch is not defined',
        'http://loading.retry.widdit.com/',
        'atomicFindClose',
        'plugin.setSuspendState',
        // Facebook borked
        'fb_xd_fragment',
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
        // reduce this. (thanks @acdha)
        // See http://stackoverflow.com/questions/4113268
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        'conduitPage',
        // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
        'Script error.',
      ],
    }).install();
} else {
  const noop = () => {};

  Raven = {
    captureException: (err) => {
      console.error('captureException mock error:', err);
    },
    setUserContext: noop,
    config: () => ({ install: noop }),
    requestHandler: () => (req, res, next) => next(),
    parsers: {
      parseRequest: noop,
    },
  };
}

export default Raven;
