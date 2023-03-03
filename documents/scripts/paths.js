const path = require('path');
const root = path.resolve(__dirname, '../');

const Source = {}
Source.root = path.join(root, 'src');
Source.PAGES_FOLDER = path.join(Source.root, 'pages');
Source.ELEMENT_PAGES_FOLDER = path.join(Source.PAGES_FOLDER, 'components');

const Build = {};
Build.root = path.join(root, 'build');
Build.PAGES_FOLDER = path.join(Build.root, 'pages');
Build.ELEMENT_PAGES_FOLDER = path.join(Build.PAGES_FOLDER, 'components');

module.exports = { Source, Build };
