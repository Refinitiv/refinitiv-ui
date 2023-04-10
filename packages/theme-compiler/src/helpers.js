const prefix = /^element:/;
const dependencyPattern = new RegExp(`${prefix.source}|\\.less$`, 'g');
const ElementsFileManager = require('./fileManager');
const NpmImportPlugin = require('less-plugin-npm-import');
const LessPluginInlineSvg = require('./less-plugin-inline-svg');
const CleanCSS = require('clean-css');
const path = require('path');
const browserslist = require('browserslist');

// PostCss processor, setup Autoprefixer and Browserslist configurations
const browserListConfig = browserslist.findConfig(process.cwd()); // Get config on current directory of node process path
const autoPrefixerConfig = browserListConfig && browserListConfig.defaults.length ? { overrideBrowserslist: browserListConfig.defaults } : {};
const processor = require('postcss')().use(require('autoprefixer')(autoPrefixerConfig));

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
    return `dispatchEvent(new CustomEvent('ef.${eventName}Styles.define', { detail: { name: '${name}', styles: '${style.replace(/'/g, '\\\'')}' }}));\n`;
  }
  return `elf.${eventName}Styles.define('${name}', '${style.replace(/'/g, '\\\'')}');\n`;
}

const autoPrefix = css => processor.process(css, { from: false }).then(o => o.css);

const cleanCSS = (css, semicolonAfterLastProperty = false) => {
  let option = { level: '2' };
  if (semicolonAfterLastProperty) {
    option = { ...option, format: { semicolonAfterLastProperty: true } }
  };
  const output = new CleanCSS(option).minify(css);
  return output.styles;
}

const wrapHostSelectors = css => css.replace(/(:host)([.:[#][^\s,{]+)/g, '$1($2)');

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
        let fm = new ElementsFileManager(less, {
          filename,
          isEntrypoint: filename === entrypoint
        });
        pluginManager.addFileManager(fm);
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
  let importString = 'import \'./imports/native-elements.js\';\n';
  importString += dependencies.filter(name => name.indexOf('-') !== -1)
    .map(dep => `import './${dep}.js';`).join('\n') + '\n';
  return {
    importString,
    injectorString: wrap(name, css.replace(/([^\\])\\([^\\])/g, '$1\\\\$2'), variables.registration === 'event')
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
// Generate both regular minified CSS & a similar version with a semicolon after last property
// A workaround for a less-parser bug described in https://github.com/less/less.js/pull/3700
// The PR has been merged but it's not released yet as of less 4.1.3.
const generateOutput = (filename, output, variables) => {
  return autoPrefix(output.css).then(prefixedCSS => {
    return {
      minifiedCSS: cleanCSS(prefixedCSS),
      allSemicolonMinifiedCSS: cleanCSS(prefixedCSS, true)
    };
  }).then(({ minifiedCSS, allSemicolonMinifiedCSS }) => {
    return {
      minifiedCSS: wrapHostSelectors(minifiedCSS),
      allSemicolonMinifiedCSS: wrapHostSelectors(allSemicolonMinifiedCSS)
    };
  }).then(({ minifiedCSS, allSemicolonMinifiedCSS }) => {
    let name = path.basename(filename).replace(/\.less$/, '');
    let dependencies = output.imports
      .filter(filename => prefix.test(filename))
      .map(filename => filename.replace(dependencyPattern, ''));
    let styleInfo = generateJsInfo(name, minifiedCSS, dependencies, variables);
    return {
      name,
      dependencies,
      injector: styleInfo.injectorString,
      contents: generateJs(styleInfo),
      css: minifiedCSS,
      allSemicolonCSS: allSemicolonMinifiedCSS
    };
  });
};

const getElementFiles = () => ElementsFileManager.elements;

const getThemeInfo = () => {
  const packageJSON = require(process.cwd() + '/package.json');
  return {
    'name': packageJSON['name'],
    'version': packageJSON['version']
  };
};

module.exports = {
  generateJs,
  generateOutput,
  generateLessOptions,
  cleanCSS,
  getElementFiles,
  getElementNameFromLess,
  getThemeInfo
};
