module.exports = Object.assign({}, require('../../jest.config.js'), {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/*.enum.ts',
    '!src/**/*.module.ts',
    '!src/config/env.config.ts',
    '!src/config/typeorm.config.ts',
    '!src/db/**/*.ts',
    '!src/dto/req/login.request.dto.ts',
    '!src/dto/req/user-registration.request.dto.ts',
    '!src/error/*.error.ts',
    '!src/swagger/**/*.ts',
    '!src/main.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: '<rootDir>/coverage/unit',
  setupFiles: ['<rootDir>/test/unit/setup.ts'],
  testMatch: ['**/test/unit/**/*.spec.ts'],
});
