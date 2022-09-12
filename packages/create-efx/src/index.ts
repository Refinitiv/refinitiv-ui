import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import minimist from 'minimist';
import prompts from 'prompts';
import { emptyDir, isEmptyDir, validateProjectName, formatProjectName } from './utils/helpers';
import renameAll from './utils/renamer';

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string.
const argv = minimist(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();

const init = async () => {
  let targetDir = argv._[0];
  let result;

  const projectName = targetDir ? path.basename(path.resolve(targetDir)) : '';
  const error = validateProjectName(projectName);
  const isExist = (dir: string) => fs.existsSync(dir) && !isEmptyDir(dir);

  try {
    result = await prompts(
      [
        {
          type: isExist(targetDir) || !error ? null : 'text',
          name: 'projectName',
          message: chalk.reset('Project name:'),
          initial: targetDir,
          onState: ({ value }) => {
            targetDir = value;
          },
          validate: (name) => {
            const basename = path.basename(path.resolve(name));
            const error = validateProjectName(basename);
            if(!name || error && !isExist(name)) {
              return error;
            }
            return true;
          }
        },
        {
            type: isExist(targetDir) ? 'confirm' : null,
            name: 'overwrite',
            message: () => `Target directory "${targetDir}" is not empty. Remove existing files and continue?`
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

  const finalDes = path.resolve(targetDir);
  const newDes = path.join(path.dirname(finalDes), formatProjectName(path.basename(finalDes)));

  if(result.overwrite) {
    // emptyDir(finalDes);
    console.log('will overwrite !!');
  }
  else {
   fs.mkdirSync(newDes, { recursive: true });
  }

  console.log(`\nScaffolding project in ${newDes}`);
  // await fsExtra.copy('./src/template', newDes);
  // await renameAll(newDes, 'efx-element')
};

init().catch((error) => {
  console.error(error);
});
