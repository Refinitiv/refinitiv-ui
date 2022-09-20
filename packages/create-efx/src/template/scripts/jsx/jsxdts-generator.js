#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import { ELEMENT_DIST, ELEMENT_PREFIX, PACKAGE_ROOT, getElementTagName, getElementList } from './utils.js';

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
 * Merges standard HTML DOM JSX Type declaration with webcomponent's
 * This will ensure that our webcomponent works in React TypeScript
 * @returns {void}
 */
const handler = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const JSX_MERGE_TEMPLATE = path.join(__dirname, 'interface', 'jsxTemplate.d.ts');

  const JSX_TYPE_DECLARATION = 'jsx.d.ts';
  const JSX_TYPE_DECLARATION_PATH = path.join(__dirname, 'interface', JSX_TYPE_DECLARATION);

  // Copy jsx.d.ts into the root of outDir
  fs.copyFileSync(
    JSX_TYPE_DECLARATION_PATH,
    path.join(PACKAGE_ROOT, ELEMENT_DIST, JSX_TYPE_DECLARATION)
  );

  const files = await getElementList(path.join(PACKAGE_ROOT, ELEMENT_DIST));

  for (const file of files) {
    const elementName = getElementTagName(file);

    // Assuming all JavaScript files will be compiled with TypeScript declaration
    const typeDeclaration = file.replace('.js', '.d.ts');

    if (!fs.existsSync(typeDeclaration)) {
      return;
    }

    // Check if element starts with element prefix
    // Then use element tag name with or without prefix to produce class name
    const startsWithEF = elementName.split('-')[0] === ELEMENT_PREFIX;

    const elementClassName = toPascalCase(startsWithEF ? elementName.slice(elementName.indexOf('-') + 1): elementName);
    const typeDeclarationContent = fs.readFileSync(typeDeclaration, {
      encoding: 'utf-8'
    });

    // If JSXInterface already exist
    if (typeDeclarationContent.indexOf('JSXInterface') !== -1) {
      return;
    }

    const template = fs
      .readFileSync(JSX_MERGE_TEMPLATE, { encoding: 'utf-8' })
      .replace('// $0', `'${elementName}': ${elementClassName};`)
      .replace(
        '// $1',
        `'${elementName}': Partial<${elementClassName}> | JSXInterface.${
          typeDeclarationContent.indexOf(
            `class ${elementClassName} extends ControlElement`
          ) === -1
            ? 'HTMLAttributes'
            : 'ControlHTMLAttributes'
        }<${elementClassName}>;`
      );

    // Directory depth relatively to `ELEMENT_DIST`
    const depth = (file.split('/').length - 1) - path.join(PACKAGE_ROOT, ELEMENT_DIST).split('/').length;

    let content = '';
    // Import path should not end with *.d.ts
    content += `import { JSXInterface } from '${depth !== 0 ? '../'.repeat(depth): './'}${path.basename(JSX_TYPE_DECLARATION, '.d.ts')}';\n`;
    content += typeDeclarationContent + '\n';
    content += template;

    fs.writeFileSync(typeDeclaration, content);
  }

  console.log(chalk.green('Finish generating JSX Type declaration.'));
};

try {
  console.log('Generating JSX Type declarations...');
  handler();
}
catch (error) {
  console.log(chalk.red(`jsx.d.ts Generator Error: ${error}`));
}

