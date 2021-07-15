const childProcess = require('child_process');
const { validatePackageOrElementExist } = require('./validators');
const {
  elementsPath,
  packagesPath,
  isPackages,
  isElements,
  message,
} = require('./helpers');

exports.command = 'lint [package]';
exports.desc = 'Linting';
exports.builder = (yargs) => {
  yargs
    .check((argv) => argv.package ? validatePackageOrElementExist(argv.package) : true)
    .positional('package',
    {
      desc: 'Package or Element name',
      type: 'string'
    })
    .option('fix', {
      alias: 'f',
      type: 'boolean',
      default: false,
      description: 'Automatically fix problems'
    });
    //.completion('completion', getElements);
};
exports.handler = async (argv, options) => {
  const package = argv.package;
  const fixOption = argv.fix ? '--fix' : '';

  let command = null;
  let type = null;
  if (!package) {
    type = 'All Packages';
    command = 'yarn lerna run lint';
  } else if (isElements(package)) {
    type = 'Element';
    const elementPath = elementsPath(package || '');
    command = `yarn eslint ${elementPath} ${fixOption}`;
  } else if (isPackages(package)) {
    type = 'Package'
    command = `cd ${packagesPath(package)} && yarn lint`;
  }

  message(`Linting: ${type} ${package || ''}`, 'blue');

  try {
    childProcess.execSync(command, { stdio: 'inherit' });
    message(`Linting: Passed`, 'green');
  } catch (error) {
    process.exit(0);
  }
};
