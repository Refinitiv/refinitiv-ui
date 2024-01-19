module.exports = {
  extends: ['./eslint-config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        extraFileExtensions: ['.html']
      },
      rules: {
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-namespace': 0,
        'valid-jsdoc': [
          2,
          {
            requireReturnType: false,
            requireParamType: false
          }
        ]
      }
    },
    {
      files: ['*.js', '*.cjs'],
      rules: {
        'no-console': 1
      }
    },
    {
      files: ['*test.js'],
      plugins: ['mocha'],
      extends: ['plugin:mocha/recommended'],
      rules: {
        'mocha/max-top-level-suites': 0
      }
    }
  ]
};
