module.exports = {
  // rootDir points to the folder that contains jest-config
  // https://github.com/facebook/jest/issues/3613
  rootDir: '../..',
  transform: {
    '^.+\\.js$': '<rootDir>/internals/babel/test.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/global-styles.js',
    '!src/*/*/Loadable.{js,jsx}',
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: [
    'text-summary',
  ],
  moduleDirectories: [
    '<rootDir>/node_modules',
    '<rootDir>/src',
  ],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/testing/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/testing/mocks/image.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFiles: [
    '<rootDir>/internals/testing/test-setup.js',
  ],
};
