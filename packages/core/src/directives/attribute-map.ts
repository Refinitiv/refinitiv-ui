/**
 * An internal directive used to map attributes to element
 */
import { Directive, directive, PartType, PartInfo, ElementPart, DirectiveResult } from 'lit/directive.js';
import { noChange } from 'lit';

type AttributeMap = {
  [key: string]: boolean | string | null
};

class AttributeMapDirective extends Directive {
  private attributeMapCache: AttributeMap = {};

  constructor (partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('The `AttributeMap` directive must be used with the element');
    }
  }

  private setAttribute (element: Element, name: string, value: boolean | string | null) {
    if (value === null || value === false) {
      element.removeAttribute(name);
    }
    else {
      element.setAttribute(name, value === true ? '' : value);
    }
  }

  public update (part: ElementPart, [attributeMap]: [AttributeMap]): typeof noChange {
    const newAttributeMap: AttributeMap = {};

    for (const name in attributeMap) {
      const oldValue = this.attributeMapCache[name];
      const value = attributeMap[name];
      if (oldValue !== value) {
        this.setAttribute(part.element, name, value);
      }

      newAttributeMap[name] = value;
      delete this.attributeMapCache[name];
    }

    // Delete old cached values
    for (const name in this.attributeMapCache) {
      this.setAttribute(part.element, name, null);
    }

    this.attributeMapCache = newAttributeMap;

    return noChange;
  }

  public render (): typeof noChange {
    return noChange;
  }
}

type AttributeMapDirectiveResult = DirectiveResult<typeof AttributeMapDirective>;

/**
 * A directive to apply attributes to template element
 * @param attributeMap attribute map, e.g. { "aria-label": "Label", required: true, "aria-invalid": null }
 * @returns directive result
 */
const attributeMap: (attributeMap: AttributeMap) => AttributeMapDirectiveResult = directive(AttributeMapDirective);

export {
  attributeMap,
  AttributeMapDirectiveResult,
  AttributeMap
};
