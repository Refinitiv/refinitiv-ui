import { execSync } from 'node:child_process';

import { errorHandler, info, success } from '../helpers/index.mjs';

export const command = 'build';
export const desc = 'Build package';
export const builder = (yargs) => {
  yargs
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      default: false,
      description: 'Watch file change'
    })
    .option('sourceMap', {
      type: 'boolean',
      default: false,
      description: 'Create source map files for emitted JavaScript files.'
    })
    .option('declarationMap', {
      type: 'boolean',
      default: false,
      description: 'Create sourcemaps for d.ts files.'
    });
};
export const handler = (argv) => {
  const watch = !!argv.watch;
  const sourceMap = !!argv.sourceMap;
  const declarationMap = !!argv.declarationMap;

  info(watch ? 'Watch element changes' : 'Build all elements');

  try {
    const command = ['tsc'];
    watch && command.push('--watch', '--preserveWatchOutput');
    sourceMap && command.push('--sourceMap');
    declarationMap && command.push('--declarationMap');

    execSync(command.join(' '), { stdio: 'inherit' });

    success('Successfully built all elements');
  } catch (err) {
    errorHandler(err);
    process.exit(1);
  }
};
