/* eslint-disable max-len */
import serialize from 'serialize-javascript';

import { runtimeConfig } from 'settings';


// FIXME: can not use RAZZLE_ASSETS_MANIFEST - no modules found error
// eslint-disable-next-line global-require, import/no-dynamic-require, import/no-unresolved
const assets = require('./../../build/assets.json');
// const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const { PORT, HOST, PUBLIC_PATH } = process.env;

function joinPublicUrl(url) {
  if (process.env.IS_DEV) {
    return `http://${HOST}:${parseInt(PORT, 10) + 1}/${url}`;
  }
  return `${PUBLIC_PATH}${url}`;
}

// WARNING: the doctype have to be in first line!
export const getHeader = (helmet, chunks) => `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  ${helmet.script.toString()}  
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="${joinPublicUrl('favicon.ico')}" />
${
  !process.env.IS_DEV
    ? `<script src="${assets.vendor.js}" defer></script>`
    : `<script src="${assets.vendor.js}" defer crossorigin></script>`
}
  ${
  chunks.map((chunk) => !process.env.IS_DEV
    ? `<script src="${joinPublicUrl(chunk.file)}" defer></script>`
    : `<script src="${joinPublicUrl(chunk.file)}" defer crossorigin></script>`).join('')
}
${
  !process.env.IS_DEV
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`
}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <noscript>If you're seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>, please <strong>enable JS</strong> to make this app work.</noscript>
  <div id="app">`;


export const getFooter = (apolloState, sessionStore) => `</div>
  <script>window.SESSION_STORE=${serialize(sessionStore)};</script>
  <script>window.__APOLLO_STATE__=${serialize(apolloState)}</script>
  <script>window.env=${serialize(runtimeConfig)};</script>
</body>
</html>
`;
