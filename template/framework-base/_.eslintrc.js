module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    /**
     * 关闭 plugin:vue 中与 prettier 冲突的 rule
     * @see https://github.com/prettier/eslint-config-prettier/blob/master/README.md#eslint-config-prettier-
     */
    'prettier/vue',
  ],
  plugins: [
    'jest',
    // To lint *.vue files
    'nuxt',
    // To apply .prettierrc
    'prettier'
  ],
  // Add your custom rules here
  rules: {
    'no-console': [
      'error',
      {
        allow: ['error']
      }
    ],
    'no-debugger': 'error',
    'prettier/prettier': 'error'
  }
}
