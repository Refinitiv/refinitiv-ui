import * as build from './build.mjs';
import * as lint from './lint.mjs';
import * as start from './start.mjs';
import * as test from './test.mjs';

export const commands = [build, lint, test, start];
