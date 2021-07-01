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
