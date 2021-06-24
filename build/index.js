const childProcess = require('child_process');

const scripts = [
  './__release-scripts__/api-analyzer.js',
  './__release-scripts__/jsxdts-generator.js',
  './__release-scripts__/theme-extractor.js'
];

scripts.forEach(script => childProcess.fork(script));
