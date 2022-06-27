# Element Framework Configurations

The package contains `eslint` and `TypeScript` configurations used for Element Framework development.

Use [ESLint](https://eslint.org/) to lint your es6 code.

Use [TypeScript](https://www.typescriptlang.org/) to keep the code easier to deploy, read and debug.

Configurations are used across all Element Framework components for consistency and code quality.

## Installation

```shell
npm install @refinitiv-ui/configurations --save-dev
```

This will install the following files:

- `eslint-config.js` - generic ESLint configuration
- `typescript.eslint-config.js` - extends of `eslint-config.js` with support of recommended linting for TypeScript
- `tsconfig.json` - development TypeScript parser configurations to meet ES6 specs
- `prod.tsconfig.json`- extends `tsconfig.json` to provide production configurations

You can override/use your own files to meet project requirements.

## TypeScript support

Below configurations are used with TypeScript (Element Framework v6).

### .eslintrc

Your project level (local) `.eslintrc`:

```json
{
  "root": true,
  "extends": [
    "./node_modules/@refinitiv-ui/configurations/typescript.eslint-config.js"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

`eslint` from version 6 does not support global modules and cannot resolve extensions by generic package name. Therefore you must ensure that `extends` contain the full path to the location of this module.

### tsconfig.json

Your project level `tsconfig.json`:

```json
{
  "extends": "@refinitiv-ui/configurations/tsconfig.json"
}
```

## No TypeScript support

Below configurations are used when TypeScript is not required.

### .eslintrc

Your project level (local) `.eslintrc`:

```json
{
  "root": true,
  "extends": ["./node_modules/@refinitiv-ui/configurations/eslint-config.js"]
}
```

## Usage

Modern IDE should pick up configurations automatically and apply to the project.
