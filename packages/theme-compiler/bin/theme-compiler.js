#! /usr/bin/env node
import chalk from 'chalk';
import fs from 'fs-extra';
import { createRequire } from 'node:module';
import path from 'node:path';

import options from '../src/cli-options.js';
import ThemeParser from '../src/themeParser.js';

try {
  const require = createRequire(import.meta.url);
  const { version } = require('../package.json');

  const cssOutDir = path.join(options.outdir, 'css');
  const importsOutDir = path.join(options.outdir, 'imports');
  const compiledOutDir = path.join(options.outdir, 'es5');

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
