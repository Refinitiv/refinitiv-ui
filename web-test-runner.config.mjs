#!/usr/bin/env node
import path from 'node:path';
import { defaultReporter } from '@web/test-runner';
import { ROOT, PACKAGES_ROOT } from './scripts/helpers/esm.mjs';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { Buffer } from 'node:buffer';

// Workaround for issue UTF-8 wide characters are unsupported
// from https://github.com/modernweb-dev/web/issues/1888
export const pluginJsBufferToString = {
  name: "plugin-js-buffer-to-string",
  transform(context) {
    if (context.response.is("js") && Buffer.isBuffer(context.body)) {
        context.body = context.body.toString();
    }
  }
};

export default {
  files: [path.join(PACKAGES_ROOT , '*/__test__/**/*.test.js')],
  nodeResolve: true,
  preserveSymlinks: true,
  testFramework: {
    config: { timeout: 5000 }, // Mocha timeout 5 seconds
  },
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: { statements: 80, branches: 80, functions: 80, lines: 80 },
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true })
  ],
  concurrentBrowsers: 3,
  browsers: [
    playwrightLauncher({ product: 'chromium' }, {
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--disable-extensions'
      ]
    }),
    playwrightLauncher({ product: 'firefox' }, { headless: true }),
    playwrightLauncher({ product: 'webkit' }, { headless: true }),
  ],
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: ROOT,
  browserStartTimeout: 300000, // 5 minutes
  testsStartTimeout: 300000, // 5 minutes
  testsFinishTimeout: 300000, // 5 minutes
  plugins: [ pluginJsBufferToString ]
};
