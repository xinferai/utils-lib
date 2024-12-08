/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {

  preset: 'ts-jest',

  testEnvironment: 'node',

  clearMocks: true,

  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.ts', '**/tests/**/test.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  collectCoverage: false, //true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  setupFilesAfterEnv: ["jest-extended/all"],

};

module.exports = config;
