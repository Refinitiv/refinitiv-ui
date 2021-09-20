#!/usr/bin/env node
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const { log, errorHandler, success, PACKAGES_ROOT } = require('../helpers');

/**
 * Placeholder of element version
 */
const PLACEHOLDER_VERSION = 'PUBLISH_VERSION';

/**
 * File options
 */
const FILE_OPTIONS = { encoding: 'utf8' };

/**
 * Resolved path to list of core, demo-block and elements packages folder
 * @type {string[]}
 */
const ELEMENT_PATHS = [
  path.resolve(PACKAGES_ROOT, 'core'),
  path.resolve(PACKAGES_ROOT, 'demo-block'),
  path.resolve(PACKAGES_ROOT, 'elements')
];

const handler = async () => {
  for (const elementDir of ELEMENT_PATHS) {
    const packageJson = require(path.resolve(elementDir, 'package.json'));
    const elementName = packageJson.name;
    const newVersion = packageJson.version;
  
    log(`Updating version of ${elementName}`);
    const files = await fg('./lib/**/*.js', { cwd: elementDir });
    files.forEach(file => {
      const curFile = path.join(elementDir, file);
      const data = fs.readFileSync(curFile, FILE_OPTIONS);
      if (data.includes(PLACEHOLDER_VERSION)) {
        const newData = data.replace(new RegExp(PLACEHOLDER_VERSION, 'g'), newVersion);
        fs.writeFileSync(curFile, newData, FILE_OPTIONS);
      }
    });

    log(`Version of ${elementName} updated to ${newVersion}`);
  }

  success('Version in element file has been updated');
};

try {
  log('Generating new version tag...');
  handler();
} catch (error) {
  errorHandler(`Update Version Error: ${error}`);
}
