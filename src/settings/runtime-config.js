// Runtime environment variables
// Add here only variables used in both client and server
export default process.env.IS_SERVER || process.env.NODE_ENV === 'test'
  ? {
    VERSION: process.env.VERSION, // the version is injected at build time
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_PATH: process.env.PUBLIC_PATH,
    CLIENT_API_URL: process.env.CLIENT_API_URL,
    SENTRY_CLIENT_DSN: process.env.SENTRY_CLIENT_DSN,
    SENTRY_CLIENT_TAGS: process.env.SENTRY_CLIENT_TAGS,
  }
  : {
    VERSION: window.env.VERSION,
    PUBLIC_URL: window.env.PUBLIC_URL,
    PUBLIC_PATH: window.env.PUBLIC_PATH,
    CLIENT_API_URL: window.env.CLIENT_API_URL,
    SENTRY_CLIENT_DSN: window.env.SENTRY_CLIENT_DSN,
    SENTRY_CLIENT_TAGS: window.env.SENTRY_CLIENT_TAGS,
  };
