module.exports = {
  "parser": "@babel/eslint-parser",
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
    requireConfigFile: false,
  },
  rules: {
    quotes: ["warn", "double"],
    semi: ["error", "always"],
  },
};
