#!/usr/bin/env node
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Get file and directory name of meta url
 * @param meta meta node meta url
 * @returns objects directory name and filename of meta url
 */
export const fileDirName = (meta) => {
  const fileName = fileURLToPath(meta.url);
  const dirName = dirname(fileName);
  return { dirName, fileName };
};

/**
 * Get JSON data from url path
 * @param url the absolute or relative input URL to parse
 * @param meta the base URL to resolve against if the input is not absolute
 * @returns object
 */
export const getJSON = async (url, meta = undefined) => {
  const _url = pathToFileURL(url);
  return JSON.parse(await fs.promises.readFile(new URL(_url, meta ? meta.url : undefined)));
};

export * from './index.cjs';
