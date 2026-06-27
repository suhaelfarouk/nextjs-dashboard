module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  rules: {},
};
