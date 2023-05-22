#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import { startTestRunner as startTest } from "@web/test-runner";
import { log } from '../helpers/esm.mjs';

let runner = null; // Current `TestRunner` instance
let configCache = null; // Cache for Web Test Runner config
const testRunnerQueue = new Map(); // If current runner is running the test will add to queue

/**
 * Start Test runner
 * @param {Object} config Web Test Runner config
 * @returns {Promise<TestRunner>} Web Test Runner instance
 */
const startTestRunner = async config => {
  runner = await startTest({
    config,
    readFileConfig: false, // Use config from params only, prevent auto overriding from file config
    autoExitProcess: false // No auto exit process because of starting next runner in queue after stop runner
  });
  return runner;
};

/**
 * Start next runner in queue
 * @param {string} element element name
 * @param {Object} config config using for start the test
 * @param {Array} testFiles string glob pattern for finding the tests
 * @returns {Promise<TestRunner>} Web Test Runner
 */
const startQueueTestRunner = async (element, config, testFiles) => {
  // Cache base config for share to a next queue
  if (!configCache) configCache = config;

  // Setup BrowserStack session name
  configCache.browsers.forEach(launcher => {
    if (launcher.capabilities) {
      launcher.capabilities.name = `elements: ${element}`;
    }
  });

  // Add test to queue if runner already exists and running
  if (runner && !runner.stopped) {
    testRunnerQueue.set(element, testFiles); // Add runner to queue
    return;
  }

  // Start test runner by change the new test files and coverage config
  log(`Element: ${element}`, 'magenta');
  runner = await startTestRunner({
    ...configCache,
    element,
    files: testFiles,
    concurrency: 1, // Prevent unstable test and runner
    coverageConfig: {
      include: [`**/lib/${element}/**/*.js`],
      reportDir: `coverage/${element}`
    }
  });

  // When test finished check the next queue
  runner.on('stopped', handleNextQueue);

  return runner;
}

/**
 * Handle runner in queue to start next
 * @param {boolean} passed result of current runner
 */
const handleNextQueue = async passed => {

  if (!passed) process.exit(1); // Stop process, if found test failed from result of current runner

  // Remove current test runner (finished) from queue
  if (testRunnerQueue.has(runner.config.element)) {
    testRunnerQueue.delete(runner.config.element);
  }

  // Start next runner if still have runner in queue
  if (testRunnerQueue.size >= 1) {
    const [nextElement] = testRunnerQueue.keys(); // Get the first item in queue
    const nextTestFiles = testRunnerQueue.get(nextElement);
    runner = await startQueueTestRunner(nextElement, configCache, nextTestFiles);
  }

  // Clear base config for queue runner
  if (testRunnerQueue.size === 1) configCache = null;
}

/**
 * Handle runner stopping with correct exit code
 * @returns {void}
 */
const stopRunner = () => {
  if (!runner) return;
  let code = null;

  // Stop the runner and get the exit code
  if (!runner.running) {
    code = runner.passed ? 0 : 1; // use test result for exit code
  } else {
    runner.stop();
    code = 0;
  }

  // Clear current runner and end process
  runner = null;
  process.exit(code);
};
process.on('SIGINT', stopRunner);
process.on('exit', stopRunner);
process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`,
  );
});

export {
  startTestRunner,
  startQueueTestRunner
};
