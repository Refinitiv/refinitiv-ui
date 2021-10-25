import { Runner } from './runner.js';
import { TaskCallback } from './task.js';

/**
 * Debounces a task
 */
class DebouncerRunner extends Runner {
  schedule (callback: TaskCallback): void {
    this.cancel();
    this.createTask(() => {
      this.runCallback(callback);
    });
  }
}

export {
  DebouncerRunner
};
