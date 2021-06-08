const concurrently = require('concurrently');
const { validateDemoElement } = require('./validators');
const {
  message,
  isPackages,
  isElements,
  elementsPath,
  packagesPath,
  autoComplete
} = require('./helpers');

exports.command = 'start [element]';
exports.desc = 'Starting the development server';
exports.builder = (yargs) => {
  yargs
    .require('element', 'Please specify element name')
    .check((argv) => validateDemoElement(argv.element))
    .positional('element', {
      desc: 'Element name',
      type: 'string'
    })
    .completion('completion', autoComplete);
};
exports.handler = (argv) => {
  const element = argv.element;
  let commands = [];
  if (isPackages(element)) {
    type = 'Package';
    commands = [
      { command: `cd ${packagesPath(element)} && yarn start`, prefixColor: '#007ACC', name: `${element}: Start` }
    ];
  } else if (isElements(element)) {
    const elPath = elementsPath();
    type = 'Element';
    commands = [
      { command: `cd ${elPath} && yarn build:watch`, prefixColor: '#007ACC', name: `${element}: TypeScript` },
      { command: `cd ${elPath} && yarn web-dev-server --config server.config.js --element=${element}`, prefixColor: '#D5B60A', name: `${element}: WebDevServer` }
    ];
  }

  message(`Start: ${type} ${element}`, 'blue');
  concurrently(
    commands,
    { killOthers: ['failure', 'success'] }
  ).then(
    () => message(`Stop: ${type} ${element}`, 'blue'),
    () => message(`Error: ${type} cannot start ${element}`, 'red')
  );
};
