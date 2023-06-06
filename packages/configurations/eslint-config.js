module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  globals: {
    document: false,
    navigator: false,
    window: false
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    'no-alert': 0,
    'no-array-constructor': 2,
    'no-bitwise': 0,
    'no-caller': 0,
    'no-catch-shadow': 0,
    'no-class-assign': 0,
    'no-cond-assign': 2,
    'no-console': 2,
    'no-const-assign': 0,
    'no-constant-condition': 2,
    'no-continue': 0,
    'no-control-regex': 2,
    'no-debugger': 2,
    'no-delete-var': 2,
    'no-div-regex': 2,
    'no-dupe-keys': 2,
    'no-dupe-args': 2,
    'no-duplicate-case': 2,
    'no-else-return': 0,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-eq-null': 0,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': 0,
    'no-extra-semi': 2,
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implicit-coercion': 0,
    'no-implied-eval': 2,
    'no-inline-comments': 0,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-invalid-this': 0,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-loop-func': 0,
    'no-mixed-requires': [2, true],
    'no-mixed-spaces-and-tabs': [2, false],
    'linebreak-style': [0, 'unix'],
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [0, { max: 2 }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-nested-ternary': 0,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-object': 0,
    'no-new-require': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 0,
    'no-path-concat': 2,
    'no-plusplus': 0,
    'no-process-env': 0,
    'no-process-exit': 0,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-restricted-modules': 0,
    'no-return-assign': [2, 'always'],
    'no-script-url': 0,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow': 0,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-sync': 0,
    'no-ternary': 0,
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'no-this-before-super': 0,
    'no-throw-literal': 2,
    'no-undef': 0,
    'no-undef-init': 2,
    'no-undefined': 0,
    'no-unexpected-multiline': 2,
    'no-underscore-dangle': 0,
    'no-unneeded-ternary': 2,
    'no-unreachable': 2,
    'no-unused-expressions': 0,
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    'no-use-before-define': 0,
    'no-useless-call': 2,
    'no-void': 0,
    'no-var': 0,
    'no-warning-comments': [0, { terms: ['todo', 'fixme', 'xxx'], location: 'start' }],
    'no-with': 2,
    'array-bracket-spacing': [2, 'never'],
    'arrow-parens': 0,
    'arrow-spacing': 0,
    'accessor-pairs': 0,
    'block-scoped-var': 0,
    'callback-return': 0,
    camelcase: [0, { properties: 'always' }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    complexity: [0, 11],
    'computed-property-spacing': [2, 'never'],
    'consistent-return': 0,
    'consistent-this': [0, 'that'],
    'constructor-super': 0,
    curly: [2, 'all'],
    'default-case': 2,
    'dot-location': [2, 'property'],
    'dot-notation': [0, { allowKeywords: true }],
    'eol-last': 2,
    eqeqeq: [2],
    'func-names': 0,
    'func-style': [2, 'expression'],
    'generator-star-spacing': 0,
    'guard-for-in': 0,
    'handle-callback-err': [2, '^(err|error)$'],
    'id-length': 0,
    'init-declarations': 0,
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'lines-around-comment': 0,
    'max-depth': [0, 4],
    'max-len': [0, 80, 4],
    'max-nested-callbacks': [0, 2],
    'max-params': [0, 3],
    'max-statements': [0, 10],
    'new-cap': [2, { newIsCap: true, capIsNew: false }],
    'new-parens': 2,
    'newline-after-var': 0,
    'object-curly-spacing': [2, 'always'],
    'object-shorthand': 0,
    'one-var': [2, 'never'],
    'operator-assignment': [2, 'always'],
    'padded-blocks': 0,
    'prefer-const': 0,
    'prefer-spread': 0,
    'prefer-reflect': 0,
    'quote-props': 0,
    quotes: [2, 'single', 'avoid-escape'],
    radix: 2,
    'id-match': 0,
    'require-yield': 0,
    semi: [2, 'always'],
    'semi-spacing': [2, { before: false, after: true }],
    'sort-vars': 0,
    'space-before-blocks': [2, 'always'],
    'keyword-spacing': 2,
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, { words: true, nonwords: false }],
    'spaced-comment': [2, 'always', { exceptions: ['-'] }],
    strict: 0,
    'use-isnan': 2,
    'valid-jsdoc': [2, { requireReturn: false }],
    'valid-typeof': 2,
    'vars-on-top': 0,
    'wrap-iife': [2, 'any'],
    yoda: [2, 'never']
  },
  extends: ['prettier'],
  plugins: ['eslint-plugin-html']
};
