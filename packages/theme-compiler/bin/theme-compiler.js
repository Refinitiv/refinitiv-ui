#! /usr/bin/env node

const chalk = require('chalk');

(async function (parser) {

  const ThemeParser = require('../src/themeParser');
  const fs = require('fs-extra');
  const path = require('path');
  const { version } = require('../package.json');

  const options = require('../src/cli-options');
  const cssOutDir = path.join(options.outdir, 'css');
  const lessOutDir = path.join(options.outdir, 'less');
  const importsOutDir = path.join(options.outdir, 'imports');
  const compiledOutDir = path.join(options.outdir, 'es5');

  let stylesES5 = ''; // for all-elements bundle
  let nativeCSS = ''; // for native-elements css
  // This css is generated as less as a workaround for a less parser bug described in https://github.com/less/less.js/pull/3700
  // For Less 4.1.3, the PR has been merged but the fix is yet to be released.
  let fullSemicolonCSS = ''; // for full semicolon native-elements less

  console.log(chalk.grey(`ELF Theme Compiler (${chalk.green(version)})\n`));

  // Remove the output directory
  console.log(chalk.red('Delete'), options.outdir);
  fs.remove(options.outdir);

  // Render all of the element styles
  const elementStyles = await ThemeParser.parse(options.entrypoint, options.variables);

  // Generate and save all element styles
  await fs.ensureDir(options.outdir);
  await Promise.all(elementStyles.map(style => {
    if (style.name.indexOf('-') === -1) {
      nativeCSS += (style.css + '\n');
      fullSemicolonCSS += (style.fullSemicolonCSS + '\n');
    }
    stylesES5 += style.injector + '\n';
    const filename = path.join(options.outdir, style.name + '.js');
    console.log(chalk.blue('Output'), filename);
    return fs.writeFile(filename, style.contents);
  }));

  // Save all-elements bundle
  await fs.ensureDir(compiledOutDir);
  await fs.writeFile(path.join(compiledOutDir, 'all-elements.js'), stylesES5);

  // Save native-elements CSS
  await fs.ensureDir(cssOutDir);
  const cssFilename = path.join(cssOutDir, 'native-elements.css');
  console.log(chalk.yellow('Output'), cssFilename);
  await fs.writeFile(cssFilename, nativeCSS);

  // Save native-elements less
  await fs.ensureDir(lessOutDir);
  const lessFilename = path.join(lessOutDir, 'native-elements.less');
  console.log(chalk.yellow('Output'), lessFilename);
  await fs.writeFile(lessFilename, fullSemicolonCSS);

  // Generate combined import files
  let importStr;
  const imports = {
    native: [],
    custom: [],
    all: []
  };
  elementStyles.forEach(style => {
    importStr = `import '../${style.name}.js';`;
    (style.name.indexOf('-') !== -1 ? imports.custom : imports.native).push(importStr);
    imports.all.push(importStr);
  });

  // Save all import files
  await fs.ensureDir(importsOutDir);
  await Promise.all(Object.keys(imports).map(filename => {
    return fs.writeFile(path.join(importsOutDir, filename + '-elements.js'), imports[filename].join('\n'));
  }))

  // Log success!
  console.log(chalk.green('\nCompiled successfully!'));

})()
.catch(e => {
  console.log(chalk.red('\nCompiled failed!\n'))
  console.log(e);
  process.exitCode = 1;
});
