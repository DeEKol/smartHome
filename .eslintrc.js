module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/*", "dist/*", "config/*", "*.svelte"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {
    // Общие правила
    // "prettier/prettier": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.ts"],
      env: {
        browser: true,
        es2021: true,
      },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-useless-catch": "off",
      },
    },
    {
      files: ["*.svelte"],
      rules: {
        "prettier/prettier": 0,
      },
    },
  ],
};
