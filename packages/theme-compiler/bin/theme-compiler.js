#! /usr/bin/env node
import chalk from 'chalk';
import fs from 'fs-extra';
import { createRequire } from 'node:module';
import path from 'node:path';

import options from '../src/cli-options.js';
import { toShadowCss } from '../src/helpers.js';
import ThemeParser from '../src/themeParser.js';

try {
  const require = createRequire(import.meta.url);
  const { version } = require('../package.json');

  const cssOutDir = path.join(options.outdir, 'css');
  const importsOutDir = path.join(options.outdir, 'imports');
  const compiledOutDir = path.join(options.outdir, 'es5');
  const portableOutDir = path.join(options.outdir, 'portable');

  let stylesES5 = ''; // for all-elements bundle
  let nativeCss = ''; // for native-elements css

  console.log(chalk.grey(`ELF Theme Compiler (${chalk.green(version)})\n`));

  // Remove the output directory
  console.log(chalk.red('Delete'), options.outdir);
  fs.remove(options.outdir);

  // Render all of the element styles
  const elementStyles = await ThemeParser.parse(options.entrypoint, options.variables);

  // Generate and save all element styles
  await fs.ensureDir(options.outdir);
  await Promise.all(
    elementStyles.map((style) => {
      if (style.name.indexOf('-') === -1) {
        nativeCss += style.css + '\n';
      }
      stylesES5 += style.injector + '\n';
      const filename = path.join(options.outdir, style.name + '.js');
      console.log(chalk.blue('Output'), filename);
      return fs.writeFile(filename, style.contents);
    })
  );

  // Save all-elements bundle
  await fs.ensureDir(compiledOutDir);
  await fs.writeFile(path.join(compiledOutDir, 'all-elements.js'), stylesES5);

  // Save native CSS
  await fs.ensureDir(cssOutDir);
  const cssFilename = path.join(cssOutDir, 'native-elements.css');
  console.log(chalk.yellow('Output'), cssFilename);
  await fs.writeFile(cssFilename, nativeCss);

  // Save portable native styles for Shadow DOM, these never touch the document
  const nativeStyles = elementStyles.filter((style) => style.name.indexOf('-') === -1);
  // html and body both become :host, so they ship separately from the other native elements
  const hostElements = ['html', 'body'];
  const host = toShadowCss(
    hostElements.map((name) => nativeStyles.find((style) => style.name === name)?.css ?? '').join('\n')
  );
  const theme = toShadowCss(
    nativeStyles
      .filter((style) => !hostElements.includes(style.name))
      .map((style) => style.css)
      .join('\n')
  );
  await fs.ensureDir(portableOutDir);
  const portableFiles = {
    'host.css': host.css,
    'theme.css': theme.css,
    // @font-face is ignored inside shadow roots, so fonts must be loaded once at document level
    'fonts.css': [host.fonts, theme.fonts].filter(Boolean).join('\n')
  };
  await Promise.all(
    Object.entries(portableFiles).map(([name, content]) => {
      const filename = path.join(portableOutDir, name);
      console.log(chalk.yellow('Output'), filename);
      return fs.writeFile(filename, content);
    })
  );

  // Generate combined import files
  let importStr;
  const imports = {
    native: [],
    custom: [],
    all: []
  };
  elementStyles.forEach((style) => {
    importStr = `import '../${style.name}.js';`;
    (style.name.indexOf('-') !== -1 ? imports.custom : imports.native).push(importStr);
    imports.all.push(importStr);
  });

  // Save all import files
  await fs.ensureDir(importsOutDir);
  await Promise.all(
    Object.keys(imports).map((filename) => {
      return fs.writeFile(path.join(importsOutDir, filename + '-elements.js'), imports[filename].join('\n'));
    })
  );

  // Log success!
  console.log(chalk.green('\nCompiled successfully!'));
} catch (error) {
  console.log(chalk.red('\nCompiled failed!\n'));
  console.log(error);
  process.exitCode = 1;
}
