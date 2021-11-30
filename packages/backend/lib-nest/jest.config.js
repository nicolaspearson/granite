const path = require('path');

const rootDir = path.resolve(__dirname);

module.exports = Object.assign({}, require(`granite/packages/backend/jest.config.js`), {
  rootDir,
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
});
