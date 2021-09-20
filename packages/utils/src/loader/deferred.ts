type PromiseField<T> = (value: T) => void

/**
 * Creates pending promise, that can be resolved or rejected manually
 */
export class Deferred<T> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _resolve: PromiseField<T> = () => {
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _reject: PromiseField<T> = () => {
  };

  private _promise: Promise<T> = new Promise<T>((resolve, reject) => {
    this._reject = reject;
    this._resolve = resolve;
  });

  public get promise (): Promise<T> {
    return this._promise;
  }

  public resolve (value: T): void {
    this._resolve(value);
  }

  public reject (value: T): void {
    this._reject(value);
  }
}
