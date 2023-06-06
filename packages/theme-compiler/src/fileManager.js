const prefix = /^elements?:/;
const elementsMatch = /^elements:/;
const dependencyMatch = /^element:/;
const path = require('path');
const glob = require('glob-promise');

const elementFileList = [];

const addElementFile = filename => {
  // {LESS} seems to return files in order of priority
  // Therefore we should skip any with the same name as the topmost should be the priority.
  // TODO: Check this. It could also be to do with lazy loading from the Element File Manager.
  // ... Change to synchronous?
  let index = elementFileList.findIndex(item => path.basename(item) === path.basename(filename));
  if (index === -1) {
    elementFileList.push(filename);
  }
};

module.exports = function (less, options) {

  const FileManager = less.FileManager;

  const ElementsFileManager = function (options) {
    this.options = options;
    this.filename = options.filename;
  };

  ElementsFileManager.prototype = new FileManager();
  ElementsFileManager.prototype.contructor = ElementsFileManager;

  ElementsFileManager.prototype.supports = function (filename) {
    return prefix.test(filename);
  };

  ElementsFileManager.prototype.loadFile = function (filename, currentDirectory, options, environment) {
    if (this.options.isEntrypoint) {
      return glob(filename.replace(prefix, ''), { cwd: currentDirectory }).then(files => {
        files.forEach(file => addElementFile(path.join(currentDirectory, file)));
        return { filename: '', contents: '' };
      });
    }
    if (elementsMatch.test(filename)) {
      return FileManager.prototype.loadFile.call(this, this.filename, '', options, environment);
    }
    if (dependencyMatch.test(filename)) {
      return new Promise(resolve => resolve({ filename, contents: '' }));
    }
    return FileManager.prototype.loadFile.apply(this, arguments);
  };

  return new ElementsFileManager(options);

};

Object.defineProperty(module.exports, 'elements', {
  get: function () {
    return elementFileList.slice(0);
  }
});
