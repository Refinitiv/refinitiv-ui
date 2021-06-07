const fs = require('fs');
const path = require('path');
const { ELEMENT_DIST, getElementTagName, getElementList } = require('./util');

/**
 * Remove hyphen and transform to upper case
 * @param {string} text
 * @returns {string} upper case text without hyphen
 */
const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();

/**
 * Transform text to pascal case
 * @param {string} text
 * @returns {string} text with pascal case
 */
const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);

/**
 * Merges standard HTML DOM JSX Type declaration with webcomponent's
 * This will ensure that our webcomponent works in React TypeScript
 * @returns {void}
 */
const handler = async () => {
  const JSX_MERGE_TEMPLATE = path.join(__dirname, 'interface', 'jsxTemplate.d.ts');

  const JSX_TYPE_DECLARATION = 'jsx.d.ts';
  const JSX_TYPE_DECLARATION_PATH = path.join(__dirname, 'interface', JSX_TYPE_DECLARATION);

  // Copy jsx.d.ts into the root of outDir
  fs.copyFileSync(
    JSX_TYPE_DECLARATION_PATH,
    path.join(process.cwd(), ELEMENT_DIST, JSX_TYPE_DECLARATION)
  );

  const files = await getElementList(path.join(process.cwd(), ELEMENT_DIST));

  for (const file of files) {
    const elementName = getElementTagName(file);

    // Assuming all JavaScript files will be compiled with TypeScript declaration
    const typeDeclaration = file.replace('.js', '.d.ts');

    if (!fs.existsSync(typeDeclaration)) return;

    const elementClassName = toPascalCase(elementName);
    const typeDeclarationContent = fs.readFileSync(typeDeclaration, {
      encoding: 'utf-8',
    });

    // If JSXInterface already exist
    if (typeDeclarationContent.indexOf('JSXInterface') !== -1) return;

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
    const depth = (file.split('/').length - 1) - path.join(process.cwd(), ELEMENT_DIST).split('/').length;

    let content = '';
    content += `import { JSXInterface } from '${'../'.repeat(depth)}${JSX_TYPE_DECLARATION}';\n`;
    content += typeDeclarationContent + '\n';
    content += template;

    fs.writeFileSync(typeDeclaration, content);
  }

  console.log(`\nFinish generating JSX Type declaration.\n`)
};

try {
  console.log(`\nGenerating JSX Type declarations...\n`);
  handler();
} catch (error) {
  console.error(`jsx.d.ts Generator Error: ${error}`)
}

