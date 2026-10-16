export default {
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"],
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "html",
    // "text",
    // "lcov",
    // "clover"
  ],
};
