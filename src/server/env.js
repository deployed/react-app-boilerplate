// import and setup dotenv settings
import paths from 'razzle/config/paths';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import checkNodeVersion, { PROGRAMS } from 'check-node-version';
import logger from 'razzle-dev-utils/logger';

import packageJson from '../../package.json';


// Check if node version on which we run the
checkNodeVersion({
  node: packageJson.engines.node,
}, (error, results) => {
  if (error) {
    logger.error('Check ', error);
    process.exit(1);
    return;
  }

  if (results.isSatisfied) {
    return;
  }

  logger.error('Some package version(s) failed!');
  Object.keys(results.versions).forEach((packageName) => {
    const info = results.versions[packageName];
    if (!info.isSatisfied) {
      const { raw, range } = info.wanted;
      logger.error(`Error: Wanted ${packageName} version ${raw} (${range})`);
      logger.error(PROGRAMS[packageName].getInstallInstructions(raw));
      logger.error(`Missing ${packageName}.`);
    }
  });
  process.exit(1);
});

if (!process.env.NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

// set app specific variables
process.env.RAZZLE_ASSETS_MANIFEST = path.join(__dirname, 'build', 'assets.json');
process.env.RAZZLE_PUBLIC_DIR = process.env.NODE_ENV === 'production' ? paths.appBuildPublic : paths.appPublic;


// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${process.env.NODE_ENV}.local`,
  `${paths.dotenv}.${process.env.NODE_ENV}`,
  `${paths.dotenv}.local`,
  paths.dotenv,
];
// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile,
    });
  }
});
