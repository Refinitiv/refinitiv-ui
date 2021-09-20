export {
  html,
  svg,
  TemplateResult,
  SVGTemplateResult,
  CSSResult,
  PropertyValues,
  ReactiveElement,
  css,
  notEqual,
  supportsAdoptingStyleSheets,
  unsafeCSS
} from 'lit';

export {
  eventOptions,
  property,
  query,
  queryAll,
  queryAsync,
  queryAssignedNodes,
  state
} from 'lit/decorators.js';

/**
 * Export directives from lit
 * todo: asyncAppend/Replace breaks build
 */
// export { asyncAppend } from 'lit/directives/async-append.js';
// export { asyncReplace } from 'lit/directives/async-replace.js';
export { cache } from 'lit/directives/cache.js';
export { classMap } from 'lit/directives/class-map.js';
export { guard } from 'lit/directives/guard.js';
export { ifDefined } from 'lit/directives/if-defined.js';
export { repeat } from 'lit/directives/repeat.js';
export { styleMap } from 'lit/directives/style-map.js';
export { unsafeHTML } from 'lit/directives/unsafe-html.js';
export { until } from 'lit/directives/until.js';

/**
 * Export element base classes
 */
import { BasicElement } from './elements/BasicElement.js';
export { BasicElement };
export { ControlElement } from './elements/ControlElement.js';
export { ResponsiveElement, ElementSize, ResizeEvent } from './elements/ResponsiveElement.js';
export class LitElement extends BasicElement {
  constructor () {
    /* eslint-disable-next-line no-console */
    console.warn('Please use an ELF element type, instead of LitElement');
    super();
  }
}

/**
 * Export notices.
 * These can be used to show warning messages in the console.
 * For example, when deprecated features are used in elements.
 */
export { WarningNotice } from './notices/WarningNotice.js';
export { DeprecationNotice } from './notices/DeprecationNotice.js';

/**
 * Export Custom Element decorator
 * Use this to register elements into the registry.
 * Overrides customElement decorator from lit-element export.
 * @override
 */
import { CustomElement as customElement } from './decorators/CustomElement.js';
export { customElement }; // We have to do this due to some transpilation issue (es-dev-server --> IE)

/**
 * Export TapEvent
 */
export { TapEvent } from './events/TapEvent.js';

/**
 * Export common interfaces
 */
export type { MultiValue } from './interfaces/MultiValue';
export type { StyleMap } from './interfaces/StyleMap';
export type { StyleInfo } from './interfaces/StyleInfo';

/**
 * Export useful utils
 */
export { FocusableHelper } from './utils/focusableHelper.js';
export { matches } from './utils/matches.js';

/**
 * Export focused key.
 * Used to observe `focused` attribute changes
 */
export { FocusedPropertyKey } from './registries/FocusRegistry.js';

import { CustomStyleRegistry } from './registries/CustomStyleRegistry.js';
import { NativeStyleRegistry } from './registries/NativeStyleRegistry.js';
import { global } from './utils/global.js';

global.elf = global.Elf = global.ELF = {
  customStyles: CustomStyleRegistry,
  nativeStyles: NativeStyleRegistry,
  version: 'PUBLISH_VERSION'
};

Object.freeze(global.elf);
