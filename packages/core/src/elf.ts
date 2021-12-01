export {
  html,
  svg,
  css,
  unsafeCSS
} from 'lit';

export type {
  TemplateResult,
  SVGTemplateResult,
  CSSResult,
  CSSResultGroup,
  PropertyValues,
  ReactiveElement
} from 'lit';

/**
 * Export element base classes
 */
import { BasicElement } from './elements/BasicElement.js';
export { BasicElement };
export { ControlElement } from './elements/ControlElement.js';
export { FormFieldElement } from './elements/FormFieldElement.js';
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
 * Export events
 */
export { TapEvent } from './events/TapEvent.js';
export type { FocusedChangedEvent } from './types/events';

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
