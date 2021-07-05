#!/usr/bin/env node
const path = require('path');
const childProcess = require('child_process');

const scripts = [
  path.resolve(__dirname, './api-analyzer.js'),
  path.resolve(__dirname, './jsxdts-generator.js'),
  path.resolve(__dirname, './theme-extractor.js')
];

scripts.forEach(script => childProcess.fork(script));
