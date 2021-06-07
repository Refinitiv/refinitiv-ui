import {
  html,
  css,
  customElement,
  property,
  PropertyValues,
  TemplateResult,
  CSSResult
} from '@refinitiv-ui/core';
import { Collapse } from '../collapse';

/**
 * Finds closest accordion parent of element.
 * Created, because IE11 doesn't support closest() method.
 * @param element - potential child of accordion
 * @returns found accordion parent or null, if not found
 */
const getClosestAccordion = (element: Element | null): Accordion | null => {
  while (element) {
    if (element.localName === 'ef-accordion') {
      return element as Accordion;
    }
    else {
      element = element.parentElement;
    }
  }
  return null;
};

/**
 * checks if specified element is a direct child of current accordion.
 * @param element - child that checked
 * @param accordion - parent accordion
 * @returns is current accordion has child accordion that wraps checked element
 */
const isDirectAccordionChild = (element: Element, accordion: Accordion): boolean => {
  return getClosestAccordion(element) === accordion;
};

/**
 * Used to display a group of `Collapse` control.
 * Only one item will be able to expand by default but you can customize its behavior.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 *
 */
@customElement('ef-accordion')
export class Accordion extends Collapse {
  /**
   * @returns A `CSSResult` that will be used to style the host,
   * slotted children and the internal template of the element.
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: block;
      }
    `;
  }

  /**
   * Allow multiple sections expand at the same time
   */
  @property({ type: Boolean, attribute: 'auto-collapse-disabled' }) autoCollapseDisabled = false;

  /**
   * Add spacing to content section in all collapse items
   */
  @property({ type: Boolean, reflect: true }) spacing = false;

  /**
   * Allow the collapse animation to be disabled
   */
  @property({ type: Boolean, attribute: 'collapse-animation-disabled' }) collapseAnimationDisabled = false;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  /**
   * @param changedProperties map of properties that was changed first time
   * @return {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('expanded-changed', this.handleClick, true);
  }


  /**
   * handle bubbled clicks from items
   * @param e the click event object
   * @return void
   */
  private handleClick = (e: Event): void => {
    if (!this.autoCollapseDisabled && isDirectAccordionChild(e.target as Element, this)) {
      this.processChildrenOnClick(e.target);
      e.stopPropagation();
    }
  };

  /**
   * get a list of items
   * @returns array of accordion items
   */
  private getChildItems (): Collapse[] {
    return [...this.querySelectorAll<Collapse>('ef-collapse')]
      .filter((el) => isDirectAccordionChild(el, this));
  }

  /**
   * collapse non selected child items on click
   * @param target currently selected item
   * @return void
   */
  private processChildrenOnClick (target: EventTarget | null): void {
    const children = this.getChildItems();

    for (let i = 0, len = children.length; i < len; ++i) {
      if (children[i] !== target) {
        children[i].expanded = false;
      }
    }
  }

}
