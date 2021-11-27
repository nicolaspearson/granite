module.exports = Object.assign({}, require(`../../jest.config.js`), {
  collectCoverageFrom: [
    'src/**/*.controller.ts',
    '!src/**/*.dto.ts', // TODO: Enable this once all user controller methods are implemented.
    'src/**/*.module.ts',
    '!src/**/*.repository.ts', // TODO: Enable this once all user controller methods are implemented.
    '!src/**/*.service.ts',
    '!src/main.module.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: '<rootDir>/coverage/integration',
  setupFiles: ['<rootDir>/test/integration/setup.ts'],
  testMatch: ['**/test/integration/**/*.spec.ts'],
});
