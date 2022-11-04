const fs = require('fs-extra');
const less = require('less');
const helpers = require('./helpers.js');


/**
 * Parses the main {less} file / entrypoint
 *
 * @param {String} entrypoint The main less file to parse, usually index.less
 * @param {Object} variables Variables to modify in the less input
 * @returns {Promise} Promise
 */
const parse = (entrypoint, variables) => {

  const tempCollection = [];

  /**
   * Sorts a collection of element styles, in order of dependenices.
   *
   * @param {Array} collection Collection of element styles.
   * @returns {Array} The sorted array.
   */
  const sortCollection = function (collection) {
    let item = arguments[1];
    let depth = arguments[2] || 0;
    let result = arguments[3] || [];
    if (item) {
      depth++;
      item.dependencies.forEach(name => {
        let index = collection.findIndex(item => item.name === name);
        if (index !== -1) {
          sortCollection(collection, collection.splice(index, 1)[0], depth, result);
        }
      });
      depth--;
      result.push(item);
    }
    if (!depth && collection.length) {
      sortCollection(collection, collection.shift(), depth, result);
    }
    return result;
  };

  /**
   * Renders the main {less} file
   *
   * @returns {Promise} Promise
   */
  const render = () => {
    let options = helpers.generateLessOptions(entrypoint, entrypoint, variables);
    return fs.readFile(entrypoint, 'utf8').then(lessInput => {
      return less.render(lessInput, options).then(() => {
        helpers.getElementFiles().forEach(filename => renderElement(filename, lessInput, variables));
        return Promise.all(tempCollection)
        .then(resolvedCollection => {
          let result = sortCollection(resolvedCollection);
          return result;
        });
      });
    });
  };

  /**
   * Renders individual element styles
   *
   * @param {String} filename Source of the element styles
   * @param {String} lessInput Less input from the entrypoint
   * @param {Object} variables Variables to modify in the less input
   * @returns {Promise} Promise
   */
  const renderElement = (filename, lessInput, variables) => {
    // Obtain elementName
    const elemName = helpers.getElementNameFromLess(filename);

    // Detect correct elemName and append theme information as css variable in less file for use in telemetry
    lessInput = (elemName === 'html') ? stampThemeInfo(lessInput): lessInput;
    
    let options = helpers.generateLessOptions(entrypoint, filename, variables);
    let promise = less.render(lessInput, options)
    .then(output => helpers.generateOutput(filename, output, variables));
    tempCollection.push(promise);
    return promise;
  };

  const stampThemeInfo = (lessStr) => {
    const themeInfo = helpers.getThemeInfo();
    const themeName = themeInfo.name.replace(/^\@[^\/]+\//, '');
    const themeVersion = themeInfo.version;

    return lessStr + '\n' + `html { --theme-name: \'${themeName}\'; --theme-version: \'${themeVersion}\'; }`;
  }

  return render(entrypoint, variables);

};

module.exports = { parse };
