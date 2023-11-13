// frontend/.eslintrc.js

module.exports = {
  // ...other ESLint rules,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['prettier', '@tanstack/query'],
  rules: {
    'prettier/prettier': 'error',
  },
};
