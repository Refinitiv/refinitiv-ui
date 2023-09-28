import path from 'node:path';
import yargs from 'yargs-parser';

const argv = yargs(process.argv.slice(2));

const cwd = process.cwd();
const args = Object.create(null);
const variables = Object.create(null);

let entrypoint;
let outdir;

try {
  entrypoint = require(path.join(cwd, 'package.json')).main;
} catch (e) {
  // continue
} finally {
  if (entrypoint) {
    entrypoint = path.join(cwd, entrypoint);
  } else {
    entrypoint = path.join(cwd, 'index.less');
  }
}

Object.keys(argv)
  .map((key) => ({ key, value: argv[key] }))
  .forEach((arg) => {
    if (typeof arg.value === 'string') {
      variables[arg.key] = arg.value;
    } else if (arg.key === '_' && !outdir) {
      outdir = path.join(cwd, arg.value[0] || 'dist');
    } else {
      args[arg.key] = arg.value;
    }
  });

export default {
  argv: args,
  cwd,
  outdir,
  variables,
  entrypoint
};
