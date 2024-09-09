export default {
  preset: "ts-jest/presets/default-esm", // Use the ESM preset for ts-jest
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        useESM: true, // Enable ESM in ts-jest
      },
    ],
  },
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ES modules
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore dist folder
  moduleNameMapper: {
    // Mock non-JS file imports if necessary
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
