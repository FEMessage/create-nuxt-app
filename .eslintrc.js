module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'prettier',
    'node',
    'vue',
    'promise'
  ],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended",
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'error',
    'prettier/prettier': 'error',
  },
}
