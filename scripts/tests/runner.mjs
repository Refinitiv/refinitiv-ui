#!/usr/bin/env node
import { log } from '../helpers/esm.mjs';
import { startTestRunner as startTest } from "@web/test-runner";

// TestRunner instance
let runner = null;
let baseQueueConfig = null; // base queue config
const testRunnerQueue = new Map();

/**
 * Start Test runner
 * @param {Object} config Web Test Runner config
 * @returns {Promise<TestRunner>} Web Test Runner instance
 */
const startTestRunner = async config => {
  // No auto exit process because of starting next runner in queue after stop runner
  runner = await startTest({ config, autoExitProcess: false });
  return runner;
};

/**
 * Start next runner in queue
 *
 * @param {string} element element name
 * @param {Object} config config using for start the test
 * @param {Array} testFiles string glob pattern for finding the tests
 * @returns {Promise<TestRunner>} Web Test Runner
 */
const startQueueRunner = async (element, config, testFiles) => {

  // Cache base config for share to a next queue
  if (!baseQueueConfig) baseQueueConfig = config;

  // Add test to queue if runner already exits and running
  if (runner && !runner.stopped) {
    console.log('add to queue', element);
    testRunnerQueue.set(element, testFiles); // Add runner to queue
    return;
  }

  // Start test an element
  log(`Element: ${element}`, 'magenta');

  // Setup BrowserStack session name
  config.browsers.forEach(launcher => {
    if (launcher.capabilities) {
      launcher.capabilities.name = `elements: ${element}`;
    }
  });

  // Change test files and name to the next element
  config.element = element;
  config.files = testFiles;

  // Start test runner
  runner = await startTestRunner(config);
  runner.on('stopped', handleNextQueue);

  return runner;
}

/**
 * Handle runner in queue to start next
 *
 * @param {boolean} passed result of current runner
 */
const handleNextQueue = async (passed) => {

  if (!passed) process.exit(1); // Stop process, if found test failed from result of current runner

  // Remove current test runner (finished) from queue
  if (testRunnerQueue.has(runner.config.element)) {
    testRunnerQueue.delete(runner.config.element);
  }

  // Start next runner if still have runner in queue
  if (testRunnerQueue.size >= 1) {
    const [firstElement] = testRunnerQueue.keys();
    const nextTestFiles = testRunnerQueue.get(firstElement);
    runner = await startQueueRunner(firstElement, baseQueueConfig, nextTestFiles);
  }

  // Clear base config for queue runner
  if (testRunnerQueue.size === 1) baseQueueConfig = null;
}

/**
 * Handle runner stopping with correct exit code
 * @returns {void}
 */
const stopRunner = () => {
  if (runner) {
    if (runner.running) runner.stop();
    runner.passed ? process.exit(0) : process.exit(1);
  }
};
process.on('SIGINT', stopRunner);
process.on('exit', stopRunner);

export {
  startTestRunner,
  startQueueRunner
};
