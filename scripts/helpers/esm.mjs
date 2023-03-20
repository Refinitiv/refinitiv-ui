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
 * @param string url the absolute or relative input URL to parse
 * @param string meta the base URL to resolve against if the input is not absolute
 * @returns object
 */
export const getJSON = async (url, meta = undefined) => {
  return JSON.parse(
    await fs.promises.readFile(new URL(url, meta ? meta.url : undefined))
  );
};

export * from './index.cjs';
