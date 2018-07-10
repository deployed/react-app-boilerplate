import http from 'http';
import Loadable from 'react-loadable';
import logger from 'razzle-dev-utils/logger';

import app from './server';


const server = http.createServer(app);

let currentApp = app;


Loadable.preloadAll().then(() => {
  server.listen(process.env.PORT, process.env.HOST, (error) => {
    if (error) {
      logger.error('Starting server error:', error);
    }

    logger.info(`🚀 started on: ${process.env.HOST}:${process.env.PORT}`);
  });
});

if (module.hot) {
  logger.info('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    logger.info('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    // eslint-disable-next-line global-require
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
