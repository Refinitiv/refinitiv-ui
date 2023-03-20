#!/usr/bin/env node
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { PACKAGE_ROOT } from './util.cjs';
import { log, errorHandler, success } from '../helpers/index.mjs';

/**
 * Placeholder of element version
 */
const PLACEHOLDER_VERSION = 'PUBLISH_VERSION';

/**
 * File options
 */
const FILE_OPTIONS = { encoding: 'utf8' };

const handler = async () => {
  const packageJson = JSON.parse(
    await fs.promises.readFile(new URL(path.resolve(PACKAGE_ROOT, 'package.json'), import.meta.url))
  );

  const elementName = packageJson.name;
  const newVersion = packageJson.version;

  log(`Updating version of ${elementName}`);
  const files = await fg('./lib/**/*.js', { cwd: PACKAGE_ROOT });
  files.forEach(file => {
    const curFile = path.join(PACKAGE_ROOT, file);
    const data = fs.readFileSync(curFile, FILE_OPTIONS);
    if (data.includes(PLACEHOLDER_VERSION)) {
      const newData = data.replace(new RegExp(PLACEHOLDER_VERSION, 'g'), newVersion);
      fs.writeFileSync(curFile, newData, FILE_OPTIONS);
    }
  });

  log(`Version of ${elementName} updated to ${newVersion}`);

  success('Version in element file has been updated');
};

try {
  log('Generating new version tag...');
  handler();
} catch (error) {
  errorHandler(`Update Version Error: ${error}`);
}
