import { Runner } from './runner.js';
import { TaskCallback } from './task.js';

class ThrottlerRunner extends Runner {

  private hasThrottler = false;
  private callback: TaskCallback | undefined;

  /**
   * Schedule a throttled task
   * @param callback Callback function
   * @returns {void}
   */
  schedule (callback: TaskCallback): void {
    this.callback = callback;
    if (!this.hasThrottler) {
      this.hasThrottler = true;
      this.createTask(() => {
        this.hasThrottler = false;
        const clb = this.callback;
        this.callback = undefined;
        this.runCallback(clb as TaskCallback);
      });
    }
  }

  cancel (): void {
    super.cancel();
    this.hasThrottler = false;
  }
}

export {
  ThrottlerRunner
};
