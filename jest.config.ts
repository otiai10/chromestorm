import type { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: [
    "**/tests/*.spec.ts",
    "**/tests/**/*.spec.ts",
  ],
  collectCoverageFrom: [
    "./src/*.ts",
    "./src/**/*.ts",
  ],
  coverageReporters: ["text", "json"],
};

export default config;
