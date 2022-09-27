import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import minimist, { ParsedArgs } from 'minimist';
import prompts from 'prompts';
import renameAll from './utils/renamer.js';
import { emptyDir, formatProjectName, getProjectName, isDirExist, validateProjectName } from './utils/helpers.js';

interface ArgvCommands extends ParsedArgs{
  h?: boolean;
  help?: boolean;
  v?: boolean;
  version?: boolean;
}

interface PackageJSONModule {
  default: {
    version: string
  }
}

const TEMPLATE_NAME = 'efx-element';

// Avoids auto conversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string.
const argv: ArgvCommands = minimist(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();

const cmd = {
  h: argv.h,
  help: argv.help,
  v: argv.v,
  version: argv.version
};

const init = async () => {
  let targetDir = argv._[0];
  let promptResults;

  if (cmd.h || cmd.help) {
    console.log('\nUsage: create-efx [options] [name]');
    console.log('\nOptions:');
    console.log('\n-h, --help           print create-efx command line options');
    console.log('\n-v, --version        print create-efx version\n');
    return;
  }

  if (cmd.v || cmd.version) {
    const packageJSONPath = path.join(__dirname, '../package.json');
    void import(packageJSONPath).then((module: PackageJSONModule) => {
      console.log('v' + module.default.version);
    });
    return;
  }

  const projectName = getProjectName(targetDir);
  let error = validateProjectName(projectName);

  if (error) {
    console.log(chalk.red(error));
  }

  try {
    promptResults = await prompts(
      [
        {
          // only show this question when user input invalid name.
          type: !error ? null : 'text',
          name: 'projectName',
          message: chalk.reset('Project name:'),
          initial: targetDir,
          onState: ({ value }) => {
            targetDir = value as string;
          },
          validate: (name: string) => {
            error = validateProjectName(getProjectName(name));
            if (!name || error) {
              return error;
            }
            return true;
          }
        },
        {
          type: () => !error && isDirExist(targetDir) ? 'confirm' : null,
          name: 'overwrite',
          message: () => `Target directory "${chalk.cyan(targetDir)}" is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }) => {
            if (overwrite === false) {
              throw new Error(chalk.red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker'
        }
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('✖') + ' Operation cancelled');
        }
      }
    );
  }
  catch (error) {
    console.log((error as Error).message);
    return;
  }

  const root = path.resolve(targetDir);

  if (promptResults.overwrite) {
    emptyDir(root);
  }
  else {
    fs.mkdirSync(root, { recursive: true });
  }
  
  console.log(`\nScaffolding project in ${chalk.cyan(root)} ...`);
  await fsExtra.copy(path.join(__dirname, '../template'), root);

  const newName = formatProjectName(path.basename(root));
  await renameAll(root, newName, TEMPLATE_NAME);

  console.log(`\n${chalk.green('Done.')} Now run:\n`);

  if (root !== cwd) {
    console.log(`${chalk.cyan('cd')} ${path.relative(cwd, root)}`);
  }
  console.log(chalk.cyan('npm install'));
  console.log(chalk.cyan('npm start\n'));
};

init().catch((error) => {
  console.error(error);
});
