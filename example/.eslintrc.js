module.exports = {
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-var': 2
  }
}
