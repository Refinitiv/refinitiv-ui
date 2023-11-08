import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import CleanCSS from 'clean-css';
import NpmImportPlugin from 'less-plugin-npm-import';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

import { ElementsFileManager, getElementFiles } from './fileManager.js';
import LessPluginInlineSvg from './less-plugin-inline-svg/index.js';

const prefix = /^element:/;
const dependencyPattern = new RegExp(`${prefix.source}|\\.less$`, 'g');

const clean = new CleanCSS({ returnPromise: true, level: '2' });

// PostCss processor, setup Autoprefixer and Browserslist configurations
const browserListConfig = browserslist.findConfig(process.cwd()); // Get config on current directory of node process path
const autoPrefixerConfig =
  browserListConfig && browserListConfig.defaults.length
    ? { overrideBrowserslist: browserListConfig.defaults }
    : {};
const processor = postcss().use(autoprefixer(autoPrefixerConfig));

/**
 * Return injector code in form of string
 * @param {string} name element's path
 * @param {string} style element's path
 * @param {string} isEvent condition if need to be event method
 * @returns {string} injector code
 */
const wrap = (name, style, isEvent) => {
  const eventName = name.indexOf('-') > 0 ? 'custom' : 'native';
  if (isEvent) {
    return `dispatchEvent(new CustomEvent('ef.${eventName}Styles.define', { detail: { name: '${name}', styles: '${style.replace(
      /'/g,
      "\\'"
    )}' }}));\n`;
  }
  return `elf.${eventName}Styles.define('${name}', '${style.replace(/'/g, "\\'")}');\n`;
};

const cleanCSS = (css) =>
  processor
    .process(css, { from: false })
    .then((o) => clean.minify(o.css))
    .then((o) => o.styles);

const wrapHostSelectors = (css) => Promise.resolve(css.replace(/(:host)([.:[#][^\s,{]+)/g, '$1($2)'));

/**
 * Return less option template
 * @param {string} entrypoint source map output
 * @param {string} filename source of the element styles
 * @param {string} variables variables that override the less file
 * @returns {string} injector code
 */
const generateLessOptions = (entrypoint, filename, variables) => ({
  filename: entrypoint,
  math: 2,
  strictUnits: true,
  ieCompat: false,
  relativeUrls: true,
  modifyVars: variables,
  plugins: [
    new NpmImportPlugin({ prefix: '~' }),
    new NpmImportPlugin({ prefix: '~/' }),
    {
      install: function (less, pluginManager) {
        const fileManager = new ElementsFileManager(less, {
          filename,
          isEntrypoint: filename === entrypoint
        });
        pluginManager.addFileManager(fileManager);
      }
    },
    new LessPluginInlineSvg({
      base64: true
    })
  ]
});

/**
 * Return generated info for injector string
 * @param {string} name element name
 * @param {string} css element style
 * @param {string} dependencies list of elements
 * @param {string} variables option variables that include using event condition
 * @returns {object} injector code
 */
const generateJsInfo = (name, css, dependencies, variables) => {
  let importString = '';
  importString +=
    dependencies
      .filter((name) => name.indexOf('-') !== -1)
      .map((dep) => `import './${dep}.js';`)
      .join('\n') + '\n';
  return {
    importString,
    injectorString: wrap(
      name,
      css.replace(/([^\\])\\([^\\])/g, '$1\\\\$2'),
      variables.registration === 'event'
    )
  };
};

const generateJs = (style) => {
  return `${style.importString}\n${style.injectorString}`;
};

const getElementNameFromLess = (filename) => {
  return path.basename(filename).replace(/\.less$/, '');
};

/**
 * Return object that use for parser
 * @param {string} filename element source
 * @param {string} output less file source
 * @param {string} variables option variables that include using event condition
 * @returns {object}
 */
const generateOutput = (filename, output, variables) => {
  return cleanCSS(output.css)
    .then(wrapHostSelectors)
    .then((css) => {
      let name = path.basename(filename).replace(/\.less$/, '');
      let dependencies = output.imports
        .filter((filename) => prefix.test(filename))
        .map((filename) => filename.replace(dependencyPattern, ''));
      let styleInfo = generateJsInfo(name, css, dependencies, variables);
      return {
        name,
        dependencies,
        injector: styleInfo.injectorString,
        contents: generateJs(styleInfo),
        css
      };
    });
};

const getThemeInfo = () => {
  const packageJSON = JSON.parse(
    fs.readFileSync(new URL(path.resolve('./package.json'), import.meta.url).pathname)
  );
  return {
    name: packageJSON['name'],
    version: packageJSON['version']
  };
};

export {
  generateJs,
  generateOutput,
  generateLessOptions,
  cleanCSS,
  getElementFiles,
  getElementNameFromLess,
  getThemeInfo
};
