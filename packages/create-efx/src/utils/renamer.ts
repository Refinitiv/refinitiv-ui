

import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import replacer from './replacer';

const getCamelCaseFromDashSeparated = function (text: string) {
  const modTxt = text.replace(/-([a-z])/g, g => {
    return g[1].toUpperCase();
  });
  return (modTxt[0].toUpperCase() + modTxt.slice(1));
};

const renameFiles = async function (folderPath: string, elementPath: string, seedName: string) {
  // Rename element files to new name
  const newName = path.basename(elementPath);
  const entries = await fg([`**/${seedName}.*`],{ cwd: folderPath, objectMode: true });

  if(!entries || !entries.length) {
    throw new Error('Element files are not found for rename');
  }

  const renameElementFile = new Promise<void>((resolve, reject) => {
    try {
      entries.forEach(async (entry) => {
        let fileExt = path.extname(entry.name);
        if (entry.name.includes('.test')){
          fileExt = '.test' + fileExt;
        }
        const oldFilename = path.join(folderPath, entry.path);
        const newFilename = oldFilename.replace(entry.name, `${newName}${fileExt}`);
        await fs.rename(oldFilename, newFilename);
      })
      resolve();
    } catch(err) {
      reject(err);
    }
  });

  // Remove .template extension from files
  const suffix = '.template';
  const suffixEntries = await fg([`.*${suffix}`],{ cwd: folderPath, objectMode: true });
  const removeSuffix = new Promise<void>((resolve, reject) => {
    try {
      suffixEntries.forEach(async (suffixEntry: { path: any; }) => {
        const oldFilename = path.join(folderPath, suffixEntry.path);
        const newFilename = oldFilename.substring(0, oldFilename.indexOf(suffix));
        await fs.rename(oldFilename, newFilename);
      })
      resolve();
    } catch(err) {
      reject(err);
    }
  });

  return Promise.all([renameElementFile, removeSuffix])
}

const renameElements = async function (folderPath: string, elementPath: string, seedName: string) {
  const newName = path.basename(elementPath);

  const camelCasedSeedName = getCamelCaseFromDashSeparated(seedName);
  const camelCasedName = getCamelCaseFromDashSeparated(newName);

  await replacer.groupReplace(
    [seedName, camelCasedSeedName],
    [newName, camelCasedName],
    folderPath
  );
}

const renameAll = async function (folderPath: string, elementPath: string, seedName: string) {
  await renameFiles(folderPath, elementPath, seedName);
  await renameElements(folderPath, elementPath, seedName);
};

export default renameAll;
