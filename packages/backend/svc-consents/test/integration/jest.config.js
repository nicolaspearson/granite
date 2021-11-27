module.exports = Object.assign({}, require(`../../jest.config.js`), {
  collectCoverageFrom: [
    'src/**/*.controller.ts',
    'src/**/*.dto.ts',
    'src/**/*.module.ts',
    '!src/**/*.repository.ts', // TODO: Enable this once the user controller has been created.
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
