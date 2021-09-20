import { Task, TaskCallback } from './task';
import { DebouncerRunner } from './debouncer-runner';

/**
 * Task to be executed after a defined time
 * @private
 */
class TimeoutTask extends Task {

  private timeout: number | undefined;

  constructor (callback: TaskCallback, timeout: number) {
    super(callback);
    this.timeout = window.setTimeout(this.fulfil.bind(this), timeout);
  }

  cancel (): void {
    super.cancel();
    clearTimeout(this.timeout);
  }
}

/**
 * Debounces task execution and only executes
 * the latest scheduled task, after the given timeout.
 */
class TimeoutTaskRunner extends DebouncerRunner {
  /**
   * @param [timeout=0] de-bounce timeout
   */
  constructor (timeout = 0) {
    super(TimeoutTask, timeout);
  }
}

export {
  TimeoutTaskRunner
};
