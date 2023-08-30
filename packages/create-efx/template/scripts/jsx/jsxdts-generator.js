#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { ELEMENT_DIST, ELEMENT_SOURCE, PACKAGE_ROOT, getElementList, getElementTagName } from './utils.js';

/**
 * Remove hyphen and transform to upper case
 * @param {string} text raw text
 * @returns {string} upper case text without hyphen
 */
const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();

/**
 * Transform text to pascal case
 * @param {string} text raw text
 * @returns {string} text with pascal case
 */
const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);

/**
 * Merges standard HTML DOM JSX Type declaration with web component's
 * This will ensure that our web component works in React TypeScript
 * @returns {void}
 */
const handler = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const JSX_MERGE_TEMPLATE = path.join(__dirname, 'interface', 'jsxTemplate.d.ts');

  const JSX_TYPE_DECLARATION = 'jsx.d.ts';
  const JSX_TYPE_DECLARATION_PATH = path.join(__dirname, 'interface', JSX_TYPE_DECLARATION);

  // Copy jsx.d.ts into the root of outDir
  fs.copyFileSync(JSX_TYPE_DECLARATION_PATH, path.join(PACKAGE_ROOT, ELEMENT_DIST, JSX_TYPE_DECLARATION));

  const files = await getElementList(path.join(PACKAGE_ROOT, ELEMENT_SOURCE));

  for (const file of files) {
    // Assuming all JavaScript files are compiled with TypeScript declaration
    const typeDeclaration = file.replace('.ts', '.d.ts').replace(ELEMENT_SOURCE, ELEMENT_DIST);

    if (!fs.existsSync(typeDeclaration)) {
      return;
    }

    const typeDeclarationContent = fs.readFileSync(typeDeclaration, {
      encoding: 'utf-8'
    });

    // If JSXInterface already exist
    if (typeDeclarationContent.indexOf('JSXInterface') !== -1) {
      return;
    }

    const elementName = getElementTagName(file);
    const elementClassName = toPascalCase(elementName);
    const template = fs
      .readFileSync(JSX_MERGE_TEMPLATE, { encoding: 'utf-8' })
      .replace('// $0', `'${elementName}': ${elementClassName};`)
      .replace(
        '// $1',
        `'${elementName}': Partial<${elementClassName}> | JSXInterface.${
          typeDeclarationContent.indexOf(`class ${elementClassName} extends ControlElement`) === -1
            ? 'HTMLAttributes'
            : 'ControlHTMLAttributes'
        }<${elementClassName}>;`
      );

    // Directory depth relatively to `ELEMENT_DIST`
    const depth = file.split('/').length - 1 - path.join(PACKAGE_ROOT, ELEMENT_DIST).split('/').length;

    let content = '';
    // Import path should not end with *.d.ts
    content += `import { JSXInterface } from '${depth !== 0 ? '../'.repeat(depth) : './'}${path.basename(
      JSX_TYPE_DECLARATION,
      '.d.ts'
    )}';\n`;
    content += typeDeclarationContent + '\n';
    content += template;

    fs.writeFileSync(typeDeclaration, content);
  }

  console.log(chalk.green('Finish generating JSX Type declaration.'));
};

try {
  console.log('Generating JSX Type declarations...');
  handler();
} catch (error) {
  console.log(chalk.red(`jsx.d.ts Generator Error: ${error}`));
}
