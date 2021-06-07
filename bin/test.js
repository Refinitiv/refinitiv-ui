const childProcess = require('child_process');
const { validatePackageOrElementExist } = require('./validators');
const {
  isElements,
  isPackages,
  elementsPath,
  packagesPath,
  message
} = require('./helpers');

exports.command = 'test [package]';
exports.desc = 'Test package';
exports.builder = (yargs) => {
  yargs
  .check((argv) => argv.package ? validatePackageOrElementExist(argv.package) : true)
    .positional('package', {
      desc: 'Package or Element name',
      type: 'string'
    })
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      default: false,
      description: 'Watch file change (element only)'
    })
    .option('snapshots', {
      alias: 's',
      type: 'boolean',
      default: false,
      description: 'Test snapshots (element only)'
    })
    //.completion('completion', getElements);
};
exports.handler = (argv) => {
  const package = argv.package;
  let command = null;
  let type = null;

  if (!package) {
    type = 'All Packages';
    command = 'yarn lerna run build && yarn lerna run test --concurrency=1';

  } else if (isElements(package)) {
    const elementOption = argv.package ? `--element ${package}` : '';
    const watchOption = argv.watch ? '--auto-watch=true --single-run=false' : '';
    const snapshotsOption = argv.snapshots ? '--update-snapshots --prune-snapshots' : '';
    const options = `${elementOption} ${watchOption} ${snapshotsOption}`;
    type = 'Element';
    command = `cd ${elementsPath()} && yarn build && yarn karma start ../../karma.conf.js ${options}`;

  } else if (isPackages(package)) {
    type = 'Package';
    command = `cd ${packagesPath(package)} && yarn build && yarn test`;
  }

  message(`Test: ${type} ${package || ''}`, 'blue');

  try {
    childProcess.execSync(command, { stdio: 'inherit' });
  } catch (error) {
    message(error.name + ': ' + error.message, 'red');
    process.exit(0);
  }
};
