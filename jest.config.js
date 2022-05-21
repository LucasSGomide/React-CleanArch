module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts{ts, tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  trasnform: {
    ".+\\.ts$": "ts-jest",
  },
};
