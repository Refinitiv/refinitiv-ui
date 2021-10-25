import { Task, TaskCallback } from './task.js';
import { ThrottlerRunner } from './throttler-runner.js';
import { AnimationTaskRunner } from './animation-task-runner.js';

const throwErrorAsync = (error: Error): void => {
  setTimeout(() => {
    throw error;
  });
};

const queueMicrotask = (callback: () => unknown): void => {
  if ('queueMicroTask' in window) {
    return window.queueMicrotask(callback);
  }
  Promise.resolve().then(callback).catch(throwErrorAsync);
};

/**
 * Task to be executed after any current synchronous tasks
 * @private
 */
class MicroTask extends Task {
  constructor (callback: TaskCallback) {
    super(callback);
    queueMicrotask(() => this.fulfil());
  }
}

/**
 * Throttles task execution and only executes
 * the latest scheduled task, after any current synchronous tasks.
 */
class MicroTaskRunner extends ThrottlerRunner {

  private loopRunner = new AnimationTaskRunner();

  constructor () {
    super(MicroTask);
  }

  schedule (callback: TaskCallback): void {
    if (this.processing) {
      // loop protection
      this.loopRunner.schedule(() => this.schedule(callback));
      return;
    }
    super.schedule(callback);
  }

  cancel (): void {
    if (this.loopRunner) {
      this.loopRunner.cancel();
    }
    super.cancel();
  }

}

export {
  MicroTaskRunner
};
