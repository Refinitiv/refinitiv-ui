import { Task } from './task.js';
import { ThrottlerRunner } from './throttler-runner.js';

/**
 * Task to be executed on the next animation frame
 * @private
 */
class AnimationTask extends Task {
  private animationFrame = requestAnimationFrame(() => this.fulfil());

  override cancel(): void {
    super.cancel();
    cancelAnimationFrame(this.animationFrame);
  }
}

/**
 * Throttles task execution and only executes
 * the latest scheduled task, on the next animation frame.
 */
class AnimationTaskRunner extends ThrottlerRunner {
  constructor() {
    super(AnimationTask);
  }
}

export { AnimationTaskRunner };
