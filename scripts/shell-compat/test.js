import { startTestRunner } from '@web/test-runner';

import config from '../../web-test-runner.config.js';

await startTestRunner({
  config: {
    ...config,
    files: ['packages/core/__test__/app-scope.test.js', 'packages/elements/src/compat/__test__/*.test.js'],
    browsers: config.browsers.slice(0, 1),
    coverage: false
  },
  readCliArgs: false,
  readFileConfig: false,
  autoExitProcess: true
});
