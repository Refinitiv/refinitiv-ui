/**
 * Extensible function class
 * TODO: Move this to @refinitiv-ui/utils
 * ! Do not import this module !
 */
export abstract class ExtensibleFunction extends Function {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor (fn: Function) {
    super();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}
