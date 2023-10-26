import type { BasicElement } from '../elements/BasicElement';
import { isBasicElement } from './helpers.js';
import { matches } from './matches.js';

type DelegatedList = {
  element: BasicElement;
  children: HTMLElement[];
}[];

/**
 * An improved copy of IronFocusablesHelper
 */

export abstract class FocusableHelper {
  /**
   * Returns the normalized element tabindex. If not focusable, returns -1.
   * It checks for the attribute "tabindex" instead of the element property
   * `tabIndex` since browsers assign different values to it.
   * e.g. in Firefox `<div contenteditable>` has `tabIndex = -1`
   * @param element Element
   * @returns normalizedTabIndex
   */
  private static normalizedTabIndex(element: HTMLElement): number {
    if (this.isFocusable(element)) {
      const tabIndex = element.getAttribute('tabindex') || 0;
      return Number(tabIndex);
    }
    return -1;
  }

  /**
   * Searches for nodes that are tabbable and adds them to the `result` array.
   * Returns if the `result` array needs to be sorted by tabindex.
   * @param node The starting point for the search; added to `result` if tabbable.
   * @param result Result
   * @param delegatedList A collection of nodes, which cannot follow DOM order
   * @returns needsSort
   */
  private static collectTabbableNodes(
    node: Node,
    result: HTMLElement[],
    delegatedList: DelegatedList
  ): boolean {
    // If not an element or not visible, no need to explore children.
    const element = node as HTMLElement;

    if (node.nodeType !== Node.ELEMENT_NODE || !this.isVisible(element)) {
      return false;
    }

    const tabIndex = this.normalizedTabIndex(element);
    let needsSort = tabIndex > 0;
    if (tabIndex >= 0) {
      result.push(element);
    }

    let children;
    if (element.localName === 'content' || element.localName === 'slot') {
      children = (element as HTMLSlotElement).assignedNodes({ flatten: true });
    } else if (element.shadowRoot) {
      // Use shadow root if possible, will check for distributed nodes.
      children = element.shadowRoot.children;
    } else {
      children = element.children || []; // in IE11 for SVG elements can be undefined
    }

    let childrenNeedSort = false;
    let tabbableChildren: HTMLElement[] = [];

    for (let i = 0; i < children.length; i += 1) {
      // Ensure method is always invoked to collect tabbable children.
      childrenNeedSort =
        this.collectTabbableNodes(children[i], tabbableChildren, delegatedList) || childrenNeedSort;
    }

    // If element delegates focus, but does not have any children, the element still can be focused.
    if (
      isBasicElement(element) &&
      element.delegatesFocus &&
      tabIndex >= 0 &&
      tabbableChildren.length &&
      element.hasAttribute('tabindex')
    ) {
      // Sort collection immediately as the order is dictated by delegated element
      if (childrenNeedSort) {
        tabbableChildren = this.sortByTabIndex(tabbableChildren);
      }

      delegatedList.unshift({
        element,
        children: tabbableChildren
      });
    } else {
      needsSort = childrenNeedSort || needsSort;
      result.push(...tabbableChildren);
    }

    return needsSort;
  }

  /**
   * Sorts an array of tabbable elements by tabindex. Returns a new array.
   * @param tabbables Tabbables
   * @returns sortedList
   */
  private static sortByTabIndex(tabbables: HTMLElement[]): HTMLElement[] {
    // Implement a merge sort as Array.prototype.sort does a non-stable sort
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const len = tabbables.length;
    if (len < 2) {
      return tabbables;
    }
    const pivot = Math.ceil(len / 2);
    const left = this.sortByTabIndex(tabbables.slice(0, pivot));
    const right = this.sortByTabIndex(tabbables.slice(pivot));
    return FocusableHelper.mergeSortByTabIndex(left, right);
  }

  /**
   * Process remaining nodes to compose the list of tabbable nodes taking into account that
   * some elements are delegated
   * @param result Result
   * @param delegatedList A collection of nodes, which cannot follow natural DOM order
   * @returns {void}
   */
  private static composeDelegated(result: HTMLElement[], delegatedList: DelegatedList): void {
    for (let i = 0; i < delegatedList.length; i += 1) {
      const { element, children } = delegatedList[i];
      const index = result.indexOf(element);
      if (index !== -1) {
        // If element delegates focus and has focusable children, it cannot be focused itself.
        // Strip this element and keep the order.
        result.splice(index, 1, ...children);
      }
    }
  }

  /**
   * Merge sort iterator, merges the two arrays into one, sorted by tab index.
   * @param left Left list
   * @param right Right list
   * @returns sorted list
   */
  private static mergeSortByTabIndex(left: HTMLElement[], right: HTMLElement[]): HTMLElement[] {
    const result: HTMLElement[] = [];
    while (left.length > 0 && right.length > 0) {
      if (FocusableHelper.hasLowerTabOrder(left[0], right[0])) {
        result.push(right.shift() as HTMLElement);
      } else {
        result.push(left.shift() as HTMLElement);
      }
    }

    return result.concat(left, right);
  }

  /**
   * Returns if element `a` has lower tab order compared to element `b`
   * (both elements are assumed to be focusable and tabbable).
   * Elements with tabindex = 0 have lower tab order compared to elements
   * with tabindex > 0.
   * If both have same tabindex, it returns false.
   * @param a Left-side element
   * @param b Right-side element
   * @returns isLower
   */
  private static hasLowerTabOrder(a: HTMLElement, b: HTMLElement): boolean {
    // Normalize tabIndexes
    // e.g. in Firefox `<div contenteditable>` has `tabIndex = -1`
    const ati = Math.max(a.tabIndex, 0);
    const bti = Math.max(b.tabIndex, 0);
    return ati === 0 || bti === 0 ? bti > ati : ati > bti;
  }

  /**
   * Returns false if the element has `visibility: hidden` or `display: none`
   * @param element Element
   * @returns visible
   */
  private static isVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return style.visibility !== 'hidden' && style.display !== 'none';
  }

  /**
   * Returns a sorted array of tabbable nodes, including the root node.
   * It searches the tabbable nodes in the light and shadow dom of the children,
   * sorting the result by tabindex.
   * @param node Node
   * @returns tabbableNodes
   */
  public static getTabbableNodes(node: Node): HTMLElement[] {
    let result: HTMLElement[] = [];
    const delegatedList: DelegatedList = [];

    // If there is at least one element with tabindex > 0, we need to sort
    // the final array by tabindex.
    const needsSortByTabIndex = this.collectTabbableNodes(node, result, delegatedList);
    if (needsSortByTabIndex) {
      result = this.sortByTabIndex(result);
    }

    this.composeDelegated(result, delegatedList);

    return result;
  }

  /**
   * Returns if a element is focusable.
   * @param element Element
   * @returns focusable
   */
  public static isFocusable(element: HTMLElement): boolean {
    // From http://stackoverflow.com/a/1600194/4228703:
    // There isn't a definite list, it's up to the browser. The only
    // standard we have is DOM Level 2 HTML
    // https://www.w3.org/TR/DOM-Level-2-HTML/html.html, according to which the
    // only elements that have a focus() method are HTMLInputElement,
    // HTMLSelectElement, HTMLTextAreaElement and HTMLAnchorElement. This
    // notably omits HTMLButtonElement and HTMLAreaElement. Referring to these
    // tests with tabbables in different browsers
    // http://allyjs.io/data-tables/focusable.html

    // Elements that cannot be focused if they have [disabled] attribute.
    if (matches(element, 'input, select, textarea, button, object')) {
      return matches(element, ':not([disabled])');
    }
    // Elements that can be focused even if they have [disabled] attribute.
    return matches(element, 'a[href], area[href], iframe, [tabindex], [contentEditable]');
  }

  /**
   * Returns if a element is tabbable. To be tabbable, a element must be
   * focusable, visible, and with a tabindex !== -1.
   * @param element Element
   * @returns tabbable
   */
  public static isTabbable(element: HTMLElement): boolean {
    return this.isFocusable(element) && element.tabIndex >= 0 && this.isVisible(element);
  }
}
