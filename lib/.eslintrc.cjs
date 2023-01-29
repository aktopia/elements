module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
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
    quotes: [2, 'single', { avoidEscape: true }],
    'react/display-name': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        reservedFirst: true,
      },
    ],
    'react/jsx-no-literals': [
      'error',
      {
        noStrings: true,
        ignoreProps: true,
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/no-object-type-as-default-prop': ['error', {}],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/no-array-index-key': ['error'],
    'react/jsx-key': ['error', {}],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react-hooks/exhaustive-deps': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/button-has-type': ['error', {}],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'always',
        children: 'always',
        propElementValues: 'always',
      },
    ],
    'react/jsx-fragments': ['error', 'element'],
    'react/void-dom-elements-no-children': ['error'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/no-unstable-nested-components': ['error', { allowAsProps: false }],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    'react/jsx-no-target-blank': ['error', {}],
    'react/jsx-no-script-url': [
      'error',
      [
        {
          name: 'Link',
          props: ['to'],
        },
        {
          name: 'Foo',
          props: ['href', 'to'],
        },
      ],
    ],
  },
};
