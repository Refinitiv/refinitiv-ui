module.exports = {
  extends: ['./eslint-config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'eslint-plugin-import'],
      extends: [
        './eslint-config.js',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        extraFileExtensions: ['.html'],
      },
      rules: {
        '@typescript-eslint/unbound-method': 0,
        'valid-jsdoc': [
          2,
          {
            requireReturnType: false,
            requireParamType: false,
          },
        ],
      },
    },
  ],
};
