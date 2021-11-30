/**
 * A directive used to map template attributes, properties and events to element
 */
import { Directive, directive, PartType, PartInfo, ElementPart, DirectiveResult } from 'lit/directive.js';
import { noChange } from 'lit';

type TemplateMap = { [key: string]: unknown };
type VariableElement<T> = Element & { [name: string]: T };
type ValueMap = { [key: string]: { value: unknown, scopedValue: unknown } };
enum MAP_TYPE { ATTRIBUTE, PROPERTY, LISTENER }

/**
 * Get map type as follows
 * - starts from '.' is a property
 * - starts from '@' is an event listener
 * - otherwise it is an attribute
 * @param key The key to check
 * @returns 0 for `attribute`; 1 for `property`; 2 for `listener`
 */
const getMapType = (key: string): number => {
  const startsWith = key[0];

  if (startsWith === '.') {
    return MAP_TYPE.PROPERTY;
  }

  if (startsWith === '@') {
    return MAP_TYPE.LISTENER;
  }

  return MAP_TYPE.ATTRIBUTE;
};

/**
 * Get the name of map property that excludes '.' and '@' from the name
 * @param key The key to get map name for
 * @returns name Map name
 */
const getMapName = (key: string): string => {
  const type = getMapType(key);
  if (type === MAP_TYPE.PROPERTY || type === MAP_TYPE.LISTENER) {
    return key.substring(1);
  }

  return key;
};

/**
 * Apply attribute, property or event listener to an element
 * @param element Element
 * @param name Name of attribute, property (starts with `.`) or event listener (starts with `@`)
 * @param value New Value
 * @param oldValue Old value
 * @returns {void}
 */
const setMapped = (element: Element, name: string, value: unknown, oldValue: unknown): void => {
  const type = getMapType(name);
  name = getMapName(name);
  switch (type) {
    case MAP_TYPE.LISTENER:
      if (typeof oldValue === 'function') {
        element.removeEventListener(name, oldValue as EventListener);
      }
      if (typeof value === 'function') {
        element.addEventListener(name, value as EventListener);
      }
      break;
    case MAP_TYPE.PROPERTY:
      if (value === undefined) {
        delete (element as VariableElement<unknown>)[name];
      }
      else {
        (element as VariableElement<unknown>)[name] = value;
      }
      break;
    case MAP_TYPE.ATTRIBUTE:
    default:
      if (value === null || value === undefined || value === false) { // remove with undefined to comply with property
        element.removeAttribute(name);
      }
      else if (value === true) {
        element.setAttribute(name, '');
      }
      else {
        element.setAttribute(name, String(value));
      }
      break;
  }
};

class TemplateMapDirective extends Directive {
  private valueMap: ValueMap = {}; // used to cache values

  constructor (partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('The `TemplateMap` directive must be used with element');
    }
  }

  /**
   * @inheritDoc
   * @param part Element part
   * @param attributeMap Attribute map
   * @returns noChange
   */
  public update (part: ElementPart, [attributeMap]: [TemplateMap]): typeof noChange {
    const newValueMap: ValueMap = {};
    const element = part.element;

    for (const name in attributeMap) {
      const value = attributeMap[name];
      let scopedValue = value;
      let oldValue;
      let oldScopedValue;

      if (this.valueMap[name]) {
        oldValue = this.valueMap[name].value;
        oldScopedValue = scopedValue = this.valueMap[name].scopedValue;
      }

      if (oldValue !== value) {
        // always assume that if `function` is passed it is an event listener
        scopedValue = typeof value === 'function' ? value.bind(part.options?.host || element) : value;
        setMapped(element, name, scopedValue, oldScopedValue);
      }

      newValueMap[name] = { value, scopedValue };
      delete this.valueMap[name];
    }

    // Delete old cached values
    for (const name in this.valueMap) {
      setMapped(element, name, undefined, this.valueMap[name].scopedValue);
    }

    this.valueMap = newValueMap;

    return this.render();
  }

  /**
   * @inheritDoc
   * @returns noChange
   */
  public render (): typeof noChange {
    return noChange;
  }
}

/**
 * A directive to apply attributes to template element
 * @param template Template map with the following syntax:
 * {
 *   'label': 'value', // set attribute with attribute value, e.g. `<input label="value">`
 *   'required': true, // set empty attribute, e.g. `<input required>`
 *   'error': null | undefined | false, // remove attribute `error`
 *   '.prop': 'value', // set property `.prop='value'`
 *   '.warning': undefined, // remove property `warning`
 *   '@listener': this.eventListener, // set event listener via element.addEventListener('listener', this.eventListener.bind(this)),
 *   '@changed': undefined // remove event listener `changed`
 * }
 * @returns noChange directive result
 */
const templateMap: (template: TemplateMap) => DirectiveResult<typeof TemplateMapDirective> = directive(TemplateMapDirective);

export {
  templateMap
};

export type {
  TemplateMapDirective,
  TemplateMap
};
