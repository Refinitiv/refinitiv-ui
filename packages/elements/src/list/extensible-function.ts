/**
 * Extensible function class
 * @deprecate Don't use this! It causes uncaught EvalError when using script-src 'self' CSP.
 */
export abstract class ExtensibleFunction extends Function {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(fn: Function) {
    super();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}
