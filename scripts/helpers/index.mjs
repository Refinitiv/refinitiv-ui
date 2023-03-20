#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const fileDirName = meta => {
  const filename = fileURLToPath(meta.url);
  const dirname = dirname(filename);
  return { dirname, filename };
}

export * from './index.cjs';
