module.exports = {
  preset: "ts-jest",
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  "resetMocks": false,
  testEnvironmentOptions: {
    customExportConditions: ['react-jsx'],
  },
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: { 
    APP_NAME: "Moneey App" ,
  },
  moduleNameMapper: {
    // tsconfig.paths
    "@/(.*)$": "<rootDir>/src/$1",

    // mocking assests and styling
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/mocks/fileMock.ts",
    "^.+\\.(css|scss)$": "<rootDir>/src/test/mocks/styleMock.ts",
    /* mock models and services folder */
    "(assets|models|services)": "<rootDir>/src/test/mocks/fileMock.ts",
  },
  // automock: true,
};
