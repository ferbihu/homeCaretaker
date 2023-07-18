module.exports = {
    globalSetup: './test/setup.js',
    globalTeardown: './test/down.js',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    //collectCoverageFrom: ['./src/**', '!src/index.js'],
    testEnvironment: 'node',
};