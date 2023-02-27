import { ExtensibleFunction } from './extensible-function.js';
import type { DataItem, CollectionComposer } from '@refinitiv-ui/utils/collection.js';

/**
 * Render function interface
 * TODO: Move this to @refinitiv-ui/utils
 * ! Do not import this module !
 */
export interface RenderFunction {
  /**
     * Renders data items into elements
     * @param item Data item context
     * @param composer Composer context
     * @param element Reusable element. This element tries to be the same as was used before.
     * @returns List item element
 */
  (item: DataItem, composer: CollectionComposer, element?: HTMLElement): HTMLElement;
}

/**
 * Render constructor interface
 * TODO: Move this to @refinitiv-ui/utils
 * ! Do not import this module !
 */
export interface RendererConstructor {
  /**
   * @param fn Render function to use as the instance
   */
  new (fn: RenderFunction): RenderFunction;
}

/**
 * Renderer base class.
 * Used for creating renderers to render data items.
 * TODO: Move this to @refinitiv-ui/utils
 * ! Do not import this module !
 */
export abstract class Renderer extends ExtensibleFunction {}
