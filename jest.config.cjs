module.exports = {
    preset: "ts-jest/presets/js-with-ts-esm",
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(png|jpg|jpeg|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
};
