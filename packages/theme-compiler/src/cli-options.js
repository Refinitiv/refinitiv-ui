const argv = require('yargs-parser')(process.argv.slice(2));
const path = require('path');
const variables = Object.create(null);
const args = Object.create(null);
const cwd = process.cwd();
let entrypoint;
let outdir;

try {
  entrypoint = require(path.join(cwd, 'package.json')).main;
}
catch (e) {
  // continue
}
finally {
  if (entrypoint) {
    entrypoint = path.join(cwd, entrypoint);
  }
  else {
    entrypoint = path.join(cwd, 'index.less');
  }
}

Object.keys(argv).map(key => ({ key, value: argv[key] }))

.forEach(arg => {
  if (typeof arg.value === 'string') {
    variables[arg.key] = arg.value;
  }
  else if (arg.key === '_' && !outdir) {
    outdir = path.join(cwd, arg.value[0] || 'dist');
  }
  else {
    args[arg.key] = arg.value;
  }
});

module.exports = { argv: args, cwd, entrypoint, variables, outdir };
