import { Runner } from './runner';
import { TaskCallback } from './task';

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
