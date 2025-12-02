const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  // Tell Jest which TS files are ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Enable ESM mode in ts-jest
  globals: {
    "ts-jest": {
      useESM: true, 
    },
  },

  transform: {
    ...tsJestTransformCfg,
  },
};
