module.exports = {
  "extends": "eslint:recommended",
  env: { es6: true, browser: true },
  rules: {
    "prefer-const": "error",
    "no-unused-vars": ["error"],
    "max-classes-per-file": ["error", 1],
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }]
  },
  "parser":"babel-eslint",
  "parserOptions": {
    "sourceType": "module",
  }
};
