import { ExtensibleFunction } from './extensible-function.js';

/**
 * Do not use: Renderer is not CSP compliant. 
 * Used for creating renderers to render data items.
 * @deprecate Renderer is deprecated.
 */
export abstract class Renderer extends ExtensibleFunction {}
