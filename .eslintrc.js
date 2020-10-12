module.exports = {
  env: {
    node: true,
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
    'no-console': 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
    'no-return-assign': 0,
  },
};
