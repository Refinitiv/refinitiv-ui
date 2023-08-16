# Contributing

We greatly welcome contributions. You can help to make the snippets better by improving snippets, documentation, samples.

## Developing

- You can run and debug this extension by using VS Code menu `Run and Debug` on the left sidebar or press `F5`
- Create a new file with a file name suffix matching your language.
- Verify that your snippets are proposed on IntelliSense.

### Make changes

- You can relaunch the extension from the debug toolbar after making changes to the files listed above.
- You can reload the VS Code window with your extension by pressing `Ctrl+R` or `Cmd+R` on Mac to load your changes.

## Install extension

- To start using your extension with VS Code, you can use command `npm run vsce:install` to install the extension.

## CLI Commands

Package extension to `*.vsix` file:

```bash
npm run vsce:package
```

Publish the extension to the Marketplace

```bash
npm run vsce:publish
```

Display help commands

```bash
npm run vsce -- -h
```
