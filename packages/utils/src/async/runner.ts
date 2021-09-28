import { Task, TaskClass, TaskCallback } from './task.js';



class Runner {

  private Task: TaskClass;
  private args: unknown[];
  private _processing = false;
  private _task: Task | undefined;

  constructor (Task: TaskClass, ...args: unknown[]) {
    this.Task = Task;
    this.args = args;
  }

  /**
   * Schedule a task
   * @param callback Callback function
   * @returns {void}
   */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  schedule (callback: TaskCallback): void {
    // placeholder
  }

  /**
   * Cancel the task
   * @returns {void}
   */
  cancel (): void {
    if (this.task) {
      this.task.cancel();
    }
  }

  /**
   * Immediately fulfil the task
   * @returns {void}
   */
  fulfil (): void {
    if (this.task) {
      this.task.fulfil();
    }
  }

  /**
   * Initialise a runner task
   * @param callback Task callback function
   * @returns {void}
   */
  createTask (callback: TaskCallback): void {
    this._task = new this.Task(callback, ...this.args);
  }

  /**
   * Run the main callback
   * @param callback The callback to execute
   * @returns {void}
   */
  runCallback (callback: TaskCallback): void {
    this._processing = true;
    try {
      callback();
    }
    catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
    finally {
      this._processing = false;
    }
  }

  /**
   * Checks to see whether the
   * runner is currently processing the task
   */
  get processing (): boolean {
    return this._processing;
  }

  /**
   * Checks to see whether the
   * runner is currently processing the task
   */
  get task (): Task | undefined {
    return this._task;
  }
}

export {
  Runner
};
