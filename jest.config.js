module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-navigation|expo(nent)?|@expo(nent)?|react-clone-referenced-element|@unimodules|unimodules|sentry-expo|native-base)"
  ],
};
