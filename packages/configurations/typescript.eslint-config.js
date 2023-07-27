module.exports = {
  extends: ['./eslint-config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'eslint-plugin-import'],
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
        'import/extensions': [2, 'always'],
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
      files: ['*test.js'],
      plugins: ['mocha'],
      extends: ['plugin:mocha/recommended'],
      rules: {
        'mocha/max-top-level-suites': 0,
        'import/extensions': [2, 'ignorePackages']
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022
      }
    }
  ]
};
