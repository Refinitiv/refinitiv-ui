#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { ELEMENT_DIST, ELEMENT_PREFIX, PACKAGE_ROOT, getElementTagName, getElementList, ELEMENT_SOURCE } from './util.cjs';
import { log, errorHandler, success, fileDirName } from '../helpers/esm.mjs';

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
  const { dirName } = fileDirName(import.meta);
  const JSX_MERGE_TEMPLATE = path.join(dirName, 'interface', 'jsxTemplate.d.ts');

  const JSX_TYPE_DECLARATION = 'jsx.d.ts';
  const JSX_TYPE_DECLARATION_PATH = path.join(dirName, 'interface', JSX_TYPE_DECLARATION);

  // Copy jsx.d.ts into the root of outDir
  fs.copyFileSync(
    JSX_TYPE_DECLARATION_PATH,
    path.join(PACKAGE_ROOT, ELEMENT_DIST, JSX_TYPE_DECLARATION)
  );

  const files = await getElementList(path.join(PACKAGE_ROOT, ELEMENT_SOURCE));

  for (const file of files) {
    const elementName = getElementTagName(file);

    // Assuming all JavaScript files are compiled with TypeScript declaration
    const typeDeclaration = file.replace('.ts', '.d.ts').replace(ELEMENT_SOURCE, ELEMENT_DIST);

    if (!fs.existsSync(typeDeclaration)){
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

  success('Finish generating JSX Type declaration.');
};

try {
  log('Generating JSX Type declarations...');
  handler();
} catch (error) {
  errorHandler(`jsx.d.ts Generator Error: ${error}`);
}

