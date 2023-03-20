#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fs from 'node:fs';

/**
 * Get file and directory name of meta url
 * @param string meta node meta url
 * @returns objects directory name and filename of meta url
 */
export const fileDirName = meta => {
  const fileName = fileURLToPath(meta.url);
  const dirName = dirname(fileName);
  return { dirName, fileName };
}

/**
 * Get JSON data from url path
 * @param string url path to JSON file
 * @returns object
 */
export const getJSON = async url => {
  return JSON.parse(
    await fs.promises.readFile(new URL(url, import.meta.url))
  );
};

export * from './index.cjs';
