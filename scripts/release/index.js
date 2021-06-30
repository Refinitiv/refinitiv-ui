#!/usr/bin/env node
const childProcess = require('child_process');

const scripts = [
  './api-analyzer.js',
  './jsxdts-generator.js',
  './theme-extractor.js'
];

scripts.forEach(script => childProcess.fork(script));
