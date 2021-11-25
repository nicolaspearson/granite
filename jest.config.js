module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: process.env.GITHUB_ACTIONS ? ['lcovonly', 'text'] : ['html', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleFileExtensions: ['json', 'ts', 'tsx', 'js', 'jsx'],
  testEnvironment: require.resolve(`jest-environment-node`),
  testMatch: ['**/test/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['/.pnp.js$', '/.pnp.cjs$'],
  verbose: true,
};
