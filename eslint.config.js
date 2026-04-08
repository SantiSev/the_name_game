const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react/self-closing-comp": "warn",
    },
  },
]);
