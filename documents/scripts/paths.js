import path from 'node:path';
import { fileDirName } from '../../scripts/helpers/index.js';

const { dirName } = fileDirName(import.meta);
const root = path.resolve(dirName, '../');

const Source = {}
Source.root = path.join(root, 'src');
Source.PAGES_FOLDER = path.join(Source.root, 'pages');
Source.ELEMENT_PAGES_FOLDER = path.join(Source.PAGES_FOLDER, 'elements');

const Build = {};
Build.root = path.join(root, 'build');
Build.PAGES_FOLDER = path.join(Build.root, 'pages');
Build.ELEMENT_PAGES_FOLDER = path.join(Build.PAGES_FOLDER, 'elements');

/*
 * List for generate document from TS.
 * Each item contains require fields.
 * entries - path of ts file that uses to generate doc.
 * tsconfig - tsconfig path.
 */
const generateDocList = [{
  entries: '../packages/elements/src/tree/managers/tree-manager.ts',
  tsconfig: '../packages/elements/tsconfig.json',
}]

export {
  Source,
  Build,
  generateDocList
};