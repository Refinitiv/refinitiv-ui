const { execSync } = require('child_process');
const { info, success, errorHandler } = require('../helpers');

exports.command = 'build';
exports.desc = 'Build package';
exports.builder = yargs => {
  yargs
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      default: false,
      description: 'Watch file change'
    });
};
exports.handler = (argv) => {
  const watch = !!argv.watch;

  info(watch ? 'Watch element changes' : 'Build all elements');

  try {
    const command = ['tsc'];
    watch && command.push('--watch', '--preserveWatchOutput', '--sourceMap');

    execSync(command.join(' '), { stdio: 'inherit' });

    success('Successfully built all elements');
  }
  catch (err) {
    errorHandler(err);
    process.exit(1);
  }
};
