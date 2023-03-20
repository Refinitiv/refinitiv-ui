import path from 'node:path';
import { fileDirName } from '../../scripts/helpers/index.mjs';

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

export { Source, Build };

