module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'prettier', 'plugin:react-hooks/recommended', 'plugin:react/jsx-runtime'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/display-name': 'off',
    'react/jsx-sort-props': ['error', {
      'callbacksLast': true,
      'shorthandFirst': true,
      'ignoreCase': false,
      'reservedFirst': true,
    }],
    'react/jsx-no-literals': ['error', {
      'noStrings': true,
      'ignoreProps': true,
    }],
    'react/jsx-no-leaked-render': ['error', { 'validStrategies': ['coerce', 'ternary'] }],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { 'ignoreCase': true }],
    'react-hooks/exhaustive-deps': 'error',
    'react/function-component-definition': ['error', {
      'namedComponents': 'function-declaration',
      'unnamedComponents': 'arrow-function',
    }],
    'react/jsx-no-script-url': [
      'error',
      [
        {
          'name': 'Link',
          'props': ['to'],
        },
        {
          'name': 'Foo',
          'props': ['href', 'to'],
        },
      ],
    ],
  },
};
