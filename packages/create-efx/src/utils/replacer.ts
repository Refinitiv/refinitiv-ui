import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';

/**
 * Find and replace all texts in a single file
 * @param filePath path to file
 * @param oldNames array of strings or single string to find
 * @param newNames array of strings or single string to replace - must equal find
 * @param cwd current working directory
 * @return Promise
 */
const singleReplace = async (filePath: string, oldNames: string[], newNames: string[], cwd: string) => {
  return new Promise<void>((resolve, reject) => {
    const currentFile = path.join(cwd, filePath);

    fs.readFile(currentFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      let result;
      let newData = data;

      newNames.forEach((newName, index) => {
        newData = newData.replace(new RegExp(oldNames[index], 'g'), newName);
      });
      // eslint-disable-next-line prefer-const
      result = Promise.resolve(newData);

      void result.then(out => {
        fs.writeFile(currentFile, out, 'utf8', err => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      });
    });
  });
};

const promises: Promise<void>[] = [];

/**
 * takes a pair of strings or length matched arrays, find and replace
 * @param oldNames array of strings or single string to find
 * @param newNames array of strings or single string to replace - must equal find
 * @param cwd current working directory
 * @return Promise containing number of files changed
 */
const groupReplace = async (oldNames: string[], newNames: string[], cwd: string) => {
  return new Promise(function (resolve, reject) {
    try {
      const files = fg.sync('**/*', { cwd });
      files.forEach(function (file) {
        promises.push(singleReplace(file, oldNames, newNames, cwd));
      });
      void Promise.all(promises).then(function (res) {
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
};
