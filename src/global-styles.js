import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  // load needed css as string, so it's included in all other styles loaded directly
  // eslint-disable-next-line no-undef
  ${preval`
    const fs = require('fs')
    const sanitize = fs.readFileSync(require.resolve('sanitize.css/sanitize.css'), 'utf8')
    module.exports = sanitize
  `};

  * {
    padding: 0;
    margin: 0;
  }
`;
