const prefix = /^element:/;
const dependencyPattern = new RegExp(`${prefix.source}|\\.less$`, 'g');
const ElementsFileManager = require('./fileManager');
const NpmImportPlugin = require('less-plugin-npm-import');
const LessPluginInlineSvg = require('./less-plugin-inline-svg');
const autoprefixer = require('postcss')().use(require('autoprefixer'));
const clean = new (require('clean-css'))({ returnPromise: true, level: '2' });
const path = require('path');

const wrap = (name, style) => `elf.${name.indexOf('-') > 0 ? 'custom'
: 'native'}Styles.define('${name}', '${style.replace(/'/g, '\\\'')}');\n`;

const cleanCSS = css => autoprefixer.process(css, { from: false })
.then(o => clean.minify(o.css)).then(o => o.styles);

const wrapHostSelectors = css => Promise
.resolve(css.replace(/(:host)([.:[#][^\s,{]+)/g, '$1($2)'));

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

const generateJsInfo = (name, css, dependencies) => {
  let importString = 'import \'./imports/native-elements.js\';\n';
  importString += dependencies.filter(name => name.indexOf('-') !== -1)
  .map(dep => `import './${dep}.js';`).join('\n') + '\n';
  return {
    importString,
    injectorString: wrap(name, css.replace(/([^\\])\\([^\\])/g, '$1\\\\$2'))
  };
};

const generateJs = (style) => {
  return `${style.importString}\n${style.injectorString}`;
};

const getElementNameFromLess = (filename) => {
  return path.basename(filename).replace(/\.less$/, '');
};

const generateOutput = (filename, output) => {
  return cleanCSS(output.css).then(wrapHostSelectors).then(css => {
    let name = path.basename(filename).replace(/\.less$/, '');
    let dependencies = output.imports
    .filter(filename => prefix.test(filename))
    .map(filename => filename.replace(dependencyPattern, ''));
    let styleInfo = generateJsInfo(name, css, dependencies);
    return {
      name,
      dependencies,
      injector: styleInfo.injectorString,
      contents: generateJs(styleInfo),
      css
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
