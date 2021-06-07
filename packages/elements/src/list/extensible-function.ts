/**
 * Extensible function class
 * TODO: Move this to @refinitiv-ui/utils
 * ! Do not import this module !
 */
export abstract class ExtensibleFunction extends Function {
  constructor (fn: Function) {
    super();
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}
