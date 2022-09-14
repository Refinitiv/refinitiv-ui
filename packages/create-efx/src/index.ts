import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import minimist from 'minimist';
import prompts from 'prompts';
import renameAll from './utils/renamer';
import { emptyDir, formatProjectName, getProjectName, isDirExist, validateProjectName } from './utils/helpers';

const TEMPLATE_NAME = 'efx-element';

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string.
const argv = minimist(process.argv.slice(2), { string: ['_'] });

const init = async () => {
  let targetDir = argv._[0];
  let promptResults;

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
            targetDir = value;
          },
          validate: (name) => {
            error = validateProjectName(getProjectName(name));
            if(!name || error) {
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
              throw new Error(chalk.red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker'
        },
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

  console.log(`\nScaffolding project in ${chalk.cyan(root)}`);
  await fsExtra.copy('./src/template', root);

  const newName = formatProjectName(path.basename(root));
  await renameAll(root, newName, TEMPLATE_NAME);

  const cwd = process.cwd();
  console.log(`\nDone. Now run:\n`);

  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log(`  npm install`);
  console.log(`  npm start`);
};

init().catch((error) => {
  console.error(error);
});
