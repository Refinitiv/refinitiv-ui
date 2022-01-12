module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: tag => tag.match(/^(ef)-.+/i),
      },
    },
  },
  transformIgnorePatterns: ["node_modules/(?!@refinitiv-ui)/"],
  moduleNameMapper: {
    "@refinitiv-ui/elements/((?!lib).*)$": "<rootDir>/node_modules/@refinitiv-ui/elements/lib/$1"
  }
}
