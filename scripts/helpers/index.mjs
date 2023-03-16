#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const fileDirName = meta => {
  const __filename = fileURLToPath(meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}

export * from './index.cjs';
