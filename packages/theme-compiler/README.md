# Theme Compiler

Theme compiler for Element Framework Themes.

### Usage:

The theme compiler needs to be a dependency of each theme.
In the `package.json` of each theme, add a new build script which calls the compiler.

Usage:
``` json
"scripts": {
  "build": "theme-compiler [out directory] [less variables]"
}
```

Example:
``` json
"scripts": {
  "build": "theme-compiler dark --variant=dark"
}
```

Then you can run `npm run build`.


### Adding a watcher for development

To watch for changes while you are developing a theme, you can include the `watch` library.

```
$ npm i --save-dev watch
```

Then you can modify you npm scripts to watch for file changes and recompile the theme.

Example:
``` json
"scripts": {
  "build": "theme-compiler dark --variant=dark",
  "watch": "watch 'npm run build' src"
}
```

Then you can run `npm run watch`.
