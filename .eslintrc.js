module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
  globals: {
    it: true,
    describe: true,
    context: true,
    before: true,
  },
};
