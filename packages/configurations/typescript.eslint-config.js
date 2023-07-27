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
        'import/extensions': ['error', 'always'], // TODO: moved from .eslintrc at root
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
      files: ['**/*test.js'],
      plugins: ['mocha'],
      extends: ['plugin:mocha/recommended'],
      rules: {
        'mocha/max-top-level-suites': 0
        // 'require-await': 2 // TODO: enable this. Maybe we should do so globally?
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022
      }
    }
  ]
};
