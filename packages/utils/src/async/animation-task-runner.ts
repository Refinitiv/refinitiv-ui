import { Task } from './task';
import { ThrottlerRunner } from './throttler-runner';

/**
 * Task to be executed on the next animation frame
 * @private
 */
class AnimationTask extends Task {

  private animationFrame = requestAnimationFrame(() => this.fulfil());

  cancel (): void {
    super.cancel();
    cancelAnimationFrame(this.animationFrame);
  }
  
}

/**
 * Throttles task execution and only executes
 * the latest scheduled task, on the next animation frame.
 */
class AnimationTaskRunner extends ThrottlerRunner {
  constructor () {
    super(AnimationTask);
  }
}

export {
  AnimationTaskRunner
};
