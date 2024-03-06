import { ExtensibleFunction } from './extensible-function.js';

/**
 * Renderer base class.
 * Used for creating renderers to render data items.
 * @deprecate Don't use this! It causes uncaught EvalError when using script-src 'self' CSP.
 */
export abstract class Renderer extends ExtensibleFunction {}
