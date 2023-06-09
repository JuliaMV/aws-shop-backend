module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testEnvironment: "node",
  testMatch: ["**/*/*.test.ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};
