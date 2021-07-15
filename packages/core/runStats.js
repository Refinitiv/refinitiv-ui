/* eslint-disable no-console */
const exec = require('child_process').exec;

const execute = function (command, callback) {
  console.log(command);
  exec(command, function (error, stdout) {
    if(error) {
      console.error(error);
    }
    else {
      callback(stdout);
    }
  });
};

execute('npm -v', function (value) {
  const npmVersion = parseInt(value.substr(0, 1), 10);
  const noInstallCommand = (npmVersion > 6) ? 'npx --no @elf/stats' : 'npx --no-install @elf/stats';

  execute(noInstallCommand, function (result) {
    console.log(result);
  });
});
