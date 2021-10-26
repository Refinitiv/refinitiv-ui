import { Task } from './task.js';
import { ThrottlerRunner } from './throttler-runner.js';

/**
 * Task to be executed after next animation frame
 * @private
 */
class AfterRenderTask extends Task {

  private timeout: number | undefined;
  private animationFrame = requestAnimationFrame(() => {
    this.timeout = window.setTimeout(this.fulfil.bind(this));
  });

  cancel (): void {
    super.cancel();
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.animationFrame);
  }
}

/**
 * Throttles task execution and only executes
 * the latest scheduled task, after the next animation frame.
 */
class AfterRenderTaskRunner extends ThrottlerRunner {
  constructor () {
    super(AfterRenderTask);
  }
}

export {
  AfterRenderTaskRunner
};
