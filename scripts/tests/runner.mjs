#!/usr/bin/env node
import { startTestRunner as startTest } from "@web/test-runner";
import { log } from '../helpers/esm.mjs';

let runner = null; // Current `TestRunner` instance
let baseQueueConfig = null; // Base queue config
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
  if (!baseQueueConfig) baseQueueConfig = config;

  // Setup BrowserStack session name
  baseQueueConfig.browsers.forEach(launcher => {
    if (launcher.capabilities) {
      launcher.capabilities.name = `elements: ${element}`;
    }
  });

  // Add test to queue if runner already exits and running
  if (runner && !runner.stopped) {
    testRunnerQueue.set(element, testFiles); // Add runner to queue
    return;
  }

  // Start test runner by change the new test files and coverage config
  log(`Element: ${element}`, 'magenta');
  runner = await startTestRunner({
    ...baseQueueConfig,
    element,
    files: testFiles,
    concurrency: 1, // Prevent unstable test and runner
    coverageConfig: {
      include: [`**/lib/${ element }/**/*.js`],
      reportDir: `coverage/${ element }`
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
    runner = await startQueueTestRunner(nextElement, baseQueueConfig, nextTestFiles);
  }

  // Clear base config for queue runner
  if (testRunnerQueue.size === 1) baseQueueConfig = null;
}

/**
 * Handle runner stopping with correct exit code
 * @returns {void}
 */
const stopRunner = () => {
  if (!runner) return;
  if (runner.running) runner.stop();
  runner.passed ? process.exit(0) : process.exit(1);
};
process.on('SIGINT', stopRunner);
process.on('exit', stopRunner);

export {
  startTestRunner,
  startQueueTestRunner
};
