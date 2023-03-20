#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const fileDirName = meta => {
  const fileName = fileURLToPath(meta.url);
  const dirName = dirname(fileName);
  return { dirName, fileName };
}

export * from './index.cjs';
