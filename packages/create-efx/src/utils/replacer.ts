// @ts-nocheck
const fg = require('fast-glob');
const fs = require('fs-extra');
const path = require('path');

const promises = [];

const fileTypes = [
  'js',
  'css',
  'less',
  'sass',
  'scss',
  'md',
  'html',
  'htm',
  'txt',
  'xml',
  'csv',
  'json',
  'ts'
];

const fileNames = [
  '**/.gitlab-ci.yml'
];

const processOptions = function (options = {}) {
  options.ignore = (options.ignore || []).concat(['node_modules/**']);

  const glob = options.glob ? typeof options.glob === 'string' ? [options.glob] : options.glob : [
    '**/*.{' + fileTypes.join() + '}',
    ...fileNames
  ];

  return Object.assign({
    glob,
    cwd: options.cwd ? options.cwd : process.cwd(),
    globalFlag: options.globalFlag ? options.globalFlag : 'g'
  }, options);
};

const singleReplace = function (filePath, oldName, newName, options) {
  if (!options) {
    options = processOptions(options);
  }
  return new Promise(function (resolve, reject) {
    const curFile = path.join(options.cwd, filePath);
    fs.readFile(curFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        // handle multiple replace ops
        let result;
        if (Array.isArray(oldName) && Array.isArray(newName)) {
          if (oldName.length === newName.length) {
            let newData = data;
            newName.forEach(function (newName, index) {
              newData = newData.replace(new RegExp(oldName[index], options.globalFlag), newName);
            });
            result = Promise.resolve(newData);
          }
          else {
            reject('cannot perform multiple find and replace on unequal sources');
          }
        }
        else {
          result = Promise.resolve(data.replace(new RegExp(oldName, options.globalFlag), newName));
        }
        result.then(out => {
          fs.writeFile(curFile, out, 'utf8', err => {
            if (err) {
              reject(err);
            }
            else {
              resolve();
            }
          });
        });

      }
    });
  });

};
/**
 * takes a pair of strings or length matched arrays, find and replace
 * @param {array|string} find array of strings or single string to find
 * @param {array|string} replace array of strings or single string to replace - must equal find
 * @param {object} options list of options for glob/cwd/ignore list regex
 * @return {Promise<{fileCount: number}>} Promise containing number of files changed
 */
const groupReplace = function (find, replace, options) {
  options = processOptions(options);
  return new Promise(function (resolve, reject) {
    try {
      const files = fg.sync(options.glob, { cwd: options.cwd, ignore: options.ignore });
      files.forEach(function (file) {
        promises.push(singleReplace(file, find, replace, options));
      });
      Promise.all(promises).then(function (res) {
        resolve(res);
      });
    }
    catch (err) {
      reject(err);
    }
  })
    .then(() => {
      return {
        fileCount: promises.length
      };
    });
};

export default {
  groupReplace,
  singleReplace
}
