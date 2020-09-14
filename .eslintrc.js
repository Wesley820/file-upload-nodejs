module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'func-names': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': [
        {
          rootPathSuffix: './src/app',
          rootPathPrefix: '@app',
        },
        {
          rootPathSuffix: './src/config',
          rootPathPrefix: '@config',
        },
        {
          rootPathSuffix: './src/database',
          rootPathPrefix: '@database',
        },
        {
          rootPathSuffix: './src/start',
          rootPathPrefix: '@start',
        },
      ],
    },
  },
};
