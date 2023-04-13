module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    // tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-template-curly-in-string": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
  },
};
