/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/unit/**/*.spec.ts"
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};