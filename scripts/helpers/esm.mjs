#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fs from 'node:fs';

/**
 * Get file and directory name of meta url
 * @param meta string meta node meta url
 * @returns objects directory name and filename of meta url
 */
export const fileDirName = meta => {
  const fileName = fileURLToPath(meta.url);
  const dirName = dirname(fileName);
  return { dirName, fileName };
}

/**
 * Get JSON data from url path
 * @param url string url the absolute or relative input URL to parse
 * @returns object
 */
export const getJSON = async (url) => {
  return JSON.parse(await fs.promises.readFile(url));
};

export * from './index.cjs';
