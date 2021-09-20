
let Tasks = new Set<Task>();

/**
 * Force run all pending tasks
 * Useful for testing purposes
 * @returns {void}
 */
const flush = (): void => {
  const tasks = Tasks;

  Tasks = new Set<Task>(); /* IE11 does not support Set iterables */

  for (const task of tasks) {
    task.fulfil();
  }
};

/**
 * A utility class to create Task
 */
class Task {

  /**
   * Callback function
   */
  public readonly callback: () => void;
  private args: unknown[];

  /**
   * Create the new task
   * @param callback The callback to execute
   */
  constructor (callback: () => void, ...args: unknown[]) {
    this.callback = callback;
    this.args = args;
    Tasks.add(this);
  }

  /**
   * Immediately fulfil the callback
   * @returns {void}
   */
  fulfil (): void {
    if (Tasks.has(this)) {
      Tasks.delete(this);

      this.callback();
    }
  }

  /**
   * Cancel the task
   * @returns {void}
   */
  cancel (): void {
    Tasks.delete(this);
  }
}

type TaskClass = typeof Task;
type TaskCallback = () => void;

export {
  Task,
  TaskClass,
  TaskCallback,
  flush
};
