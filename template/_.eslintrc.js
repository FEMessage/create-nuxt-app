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
    /**
     * Switched to `recommended` from `essential` for stricter rules.
     * https://eslint.vuejs.org/rules/#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead
     */
    'plugin:vue/recommended',
    'prettier/vue'
  ],
  plugins: [
    // To lint *.vue files
    'vue',
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
