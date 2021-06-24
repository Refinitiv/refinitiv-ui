/**
 * Export all from lit-element
 */
export * from 'lit-element';

/**
 * Export directives from lit-html
 * todo: asyncAppend/Replace breaks build
 */
// export { asyncAppend } from 'lit-html/directives/async-append';
// export { asyncReplace } from 'lit-html/directives/async-replace';
export { cache } from 'lit-html/directives/cache';
export { classMap } from 'lit-html/directives/class-map';
export { guard } from 'lit-html/directives/guard';
export { ifDefined } from 'lit-html/directives/if-defined';
export { repeat } from 'lit-html/directives/repeat';
export { styleMap } from 'lit-html/directives/style-map';
export { unsafeHTML } from 'lit-html/directives/unsafe-html';
export { until } from 'lit-html/directives/until';

/**
 * Export element base classes
 */
import { BasicElement } from './elements/BasicElement';
export { BasicElement };
export { ControlElement } from './elements/ControlElement';
export { ResponsiveElement, ElementSize } from './elements/ResponsiveElement';
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
export { WarningNotice } from './notices/WarningNotice';
export { DeprecationNotice } from './notices/DeprecationNotice';

/**
 * Export Custom Element decorator
 * Use this to register elements into the registry.
 * Overrides customElement decorator from lit-element export.
 * @override
 */
import { CustomElement as customElement } from './decorators/CustomElement';
export { customElement }; // We have to do this due to some transpilation issue (es-dev-server --> IE)

/**
 * Export TapEvent
 */
export { TapEvent } from './events/TapEvent';

/**
 * Export common interfaces
 */
export { MultiValue } from './interfaces/MultiValue';
export { StandardEvent } from './interfaces/StandardEvent';

/**
 * Export useful utils
 */
export { FocusableHelper } from './utils/focusableHelper';
export { matches } from './utils/matches';

/**
 * Export focused key.
 * Used to observe `focused` attribute changes
 */
export { FocusedPropertyKey } from './registries/FocusRegistry';

import { CustomStyleRegistry } from './registries/CustomStyleRegistry';
import { NativeStyleRegistry } from './registries/NativeStyleRegistry';
import { global } from './utils/global';

global.elf = global.Elf = global.ELF = {
  customStyles: CustomStyleRegistry,
  nativeStyles: NativeStyleRegistry,
  version: 'PUBLISH_VERSION'
};

Object.freeze(global.elf);
