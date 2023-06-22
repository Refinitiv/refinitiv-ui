# Element Framework Theme Compiler

Theme compiler for Element Framework Themes.

```sh
npm install -D @refinitiv-ui/theme-compiler
```

The theme compiler needs to be a dependency of each theme.
In the `package.json` of each theme, add a new build script which calls the compiler.

## Usage

You can create npm script and use `theme-compiler` command to build EF theme.

```json
"scripts": {
  "build": "theme-compiler [output directory] [additional less variables]"
}
```

Example:

```json
"scripts": {
  "build": "theme-compiler dark --variant=dark"
}
```

## Watch

To watch for changes while you are developing a theme, you can include the `watch` library.

```sh
npm i --save-dev watch
```

Modify you npm scripts to watch for file changes and recompile the theme.

Example:

```json
"scripts": {
  "build": "theme-compiler dark --variant=dark",
  "watch": "watch 'npm run build' src"
}
```

Then you can run `npm run watch`.

## Browsers

Theme Compiler uses the [Browserslist](https://github.com/browserslist/browserslist) to Autoprefixing CSS, you can create `.browserslistrc` in your project to specify the target browsers. See [Browserlist](https://github.com/browserslist/browserslist) for more information.
