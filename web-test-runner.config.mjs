#!/usr/bin/env node
import path from 'node:path';
import { defaultReporter } from '@web/test-runner';
import { ROOT, PACKAGES_ROOT } from './scripts/helpers/esm.mjs';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: [path.join(PACKAGES_ROOT , '*/__test__/**/*.test.js')],
  nodeResolve: true,
  preserveSymlinks: true,
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
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        // Use file path from step 2
        executablePath: 'C:\\Users\\UC255417\\chrome.exe'
      }
    }, {
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--disable-extensions'
      ]
    }),
    playwrightLauncher({
      product: 'firefox',
      launchOptions: {
        executablePath: 'C:\\Users\\UC255417\\Downloads\\test\\firefox-1372\\firefox\\firefox.exe'
      }
    }, { headless: true }),
    playwrightLauncher({
      product: 'webkit',
      launchOptions: {
        executablePath: 'C:\\Users\\UC255417\\Downloads\\test\\webkit-1767\\Playwright.exe'
      }
    }, { headless: true }),
  ],
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: ROOT,
};
