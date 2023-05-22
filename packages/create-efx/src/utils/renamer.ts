

import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import replacer from './replacer.js';

/**
 * Converts string with kebab case to camel case.
 * @param string the string to convert.
 * @return the camel cased string.
 */
const toCamelCase = (string: string) => {
  const modTxt = string.replace(/-([a-z])/g, g => {
    return g[1].toUpperCase();
  });
  return (modTxt[0].toUpperCase() + modTxt.slice(1));
};

/**
 * Rename all filenames to the new name
 * @param root current directory
 * @param newName name to replace
 * @param templateName template name to be replaced
 * @return {void}
 */
const renameFiles = async function (root: string, newName: string, templateName: string) {
  try {
    // Rename element files to new name
    const entries = await fg([`**/${templateName}.*`], { cwd: root, objectMode: true });

    if (!entries?.length) {
      throw new Error('Element files are not found for rename');
    }

    await Promise.all(entries.map(async (entry) => {
      let fileExt = path.extname(entry.name);
      if (entry.name.includes('.test')) {
        fileExt = '.test' + fileExt;
      }
      const oldFilename = path.join(root, entry.path);
      const newFilename = oldFilename.replace(entry.name, `${newName}${fileExt}`);
      await fs.rename(oldFilename, newFilename);
    }));

    // Remove .template extension from files
    const suffix = '.template';
    const suffixEntries = await fg([`.*${suffix}`, `*${suffix}`], { cwd: root, objectMode: true });

    await Promise.all(suffixEntries.map(async (suffixEntry: { path: string }) => {
      const oldFilename = path.join(root, suffixEntry.path);
      const newFilename = oldFilename.substring(0, oldFilename.indexOf(suffix));
      await fs.rename(oldFilename, newFilename);
    }));
  }
  catch (error) {
    console.error('Unable to rename files');
    throw error;
  }
};

/**
 * Rename all template name text in element file
 * @param root current directory
 * @param newName name to replace
 * @param templateName template name to be replaced
 * @return Promise
 */
const renameElements = async function (root: string, newName: string, templateName: string) {
  const camelCasedTemplateName = toCamelCase(templateName);
  const camelCasedName = toCamelCase(newName);

  await replacer.groupReplace(
    [templateName, camelCasedTemplateName],
    [newName, camelCasedName],
    root
  );
};

/**
 * Renames all filenames and text that contains templateName to the new name
 * @param root current directory
 * @param newName name to replace
 * @param templateName template name to be replaced
 * @return {void}
 */
const renameAll = async function (root: string, newName: string, templateName: string) {
  await renameFiles(root, newName, templateName);
  await renameElements(root, newName, templateName);
};

export default renameAll;
