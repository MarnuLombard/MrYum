module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: [
        'tests/**/*',
      ],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off', // See: https://github.com/typescript-eslint/typescript-eslint/issues/2552#issuecomment-691694839
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
  },
};
