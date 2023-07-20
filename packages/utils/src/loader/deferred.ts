type PromiseField<T> = (value: T) => void;

enum PromiseState {
  pending,
  resolved,
  rejected
}

/**
 * Creates pending promise, that can be resolved or rejected manually
 */
export class Deferred<T> {
  private _resolve!: PromiseField<T>;

  private _reject!: PromiseField<T>;

  private state = PromiseState.pending;

  private _promise: Promise<T> = new Promise<T>((resolve, reject) => {
    this._reject = reject;
    this._resolve = resolve;
  });

  public get promise(): Promise<T> {
    return this._promise;
  }

  public resolve(value: T): void {
    this._resolve(value);
    this.state = PromiseState.resolved;
  }

  public reject(value: T): void {
    this._reject(value);
    this.state = PromiseState.rejected;
  }

  public isSettled(): boolean {
    return this.state === PromiseState.rejected || this.state === PromiseState.resolved;
  }

  public isPending(): boolean {
    return this.state === PromiseState.pending;
  }

  public isRejected(): boolean {
    return this.state === PromiseState.rejected;
  }

  public isResolved(): boolean {
    return this.state === PromiseState.resolved;
  }
}
