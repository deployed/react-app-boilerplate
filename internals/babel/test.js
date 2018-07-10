const babelJest = require('babel-jest');
const getBabelConfig = require('./index');


// transformer for jest - used in package json jest config
module.exports = babelJest.createTransformer(getBabelConfig('test', true));
