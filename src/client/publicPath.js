// Set dynamically webpack public path only on production environment
// in dev env we have another server to serve static files
if (process.env.IS_PRODUCTION) {
// eslint-disable-next-line
  __webpack_public_path__ = window.env.PUBLIC_PATH;
}
