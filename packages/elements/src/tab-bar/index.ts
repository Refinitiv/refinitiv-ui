import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  ResponsiveElement,
  ElementSize
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { tweenAnimate } from './helpers/animate.js';
import { Tab } from '../tab/index.js';
import type { Button } from '../button';
import '../button/index.js';

const BAR_TRAVEL_DISTANCE = 150; // scroll distance

/**
 * Container for tabs
 *
 * @fires value-changed - Fired when the `value` changes.
 */
@customElement('ef-tab-bar', {
  alias: 'coral-tab-bar'
})
export class TabBar extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole = 'tablist';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
      }
      :host([alignment=center]) {
        justify-content: center;
      }
      :host([alignment=right]) {
        justify-content: flex-end;
      }
    `;
  }

  /**
   * Specify tab's horizontal alignment
   */
  @property({ type: String, reflect: true })
  public alignment: 'left' | 'center' | 'right' = 'left';

  /**
   * Use level styling from theme
   */
  @property({ type: String, reflect: true })
  public level: '1' | '2' | '3' = '1';

  /**
   * Use to switch from horizontal to vertical layout.
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * Internal value of tab bar.
   * Controlled by public setter and getter
   */
  private _value = '';

  /**
   * Value of tab-bar, derived from value of an active tab.
   * @param value Element value
   * @default -
   */
  @property({ type: String, attribute: false })
  public set value (value: string) {
    value = typeof value === 'string' ? value : String(value);
    const oldValue = this._value;
    if (value !== oldValue && this.isValidValue(value)) {
      this._value = value;
      this.activateTab(value);
      this.requestUpdate('value', oldValue);
    }
  }
  public get value (): string {
    return this._value;
  }

  @query('[part="content"')
  private content!: HTMLElement;

  @query('[part="left-btn"]')
  private leftBtn!: Button;

  @query('[part="right-btn"]')
  private rightBtn!: Button;

  private isScrolling!: number; // timer id

  /**
   * Called after the element’s DOM has been updated the first time.
   * register scroll event on content element to toggle scroll button
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.content.addEventListener('scroll', () => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(this.isScrolling);
      // Set a timeout to run after scrolling ends
      this.isScrolling = window.setTimeout(() => {
        this.toggleScrollButton(this.content.clientWidth);
      }, 66); // equal 15 fps for compatibility
    });
    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    if (changedProperties.has('level')) {
      this.setLevel();
    }
    super.updated(changedProperties);
  }

  /**
   * private method but can't override
   * access modifiers in typescript.
   * @ignore
   * @param size element dimensions
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    if (!this.vertical) {
      this.toggleScrollButton(size.width);
    }
  }

  /**
   * Return true if incoming value matches one of the existing tabs
   * @param value Value to check
   * @returns true if incoming value matches one of the existing tabs
   */
  private isValidValue (value: string): boolean {
    const tabList = this.getFocusableTabs();
    return tabList.some(tab => this.getTabValue(tab) === value);
  }

  /**
   * When the slot changes, set the level, toggle the scroll button, and set the value
   * @returns {void}
   */
  private onSlotChange (): void {
    const tabList = this.getFocusableTabs();

    if (tabList.length < 1) {
      return;
    }
    this.setLevel();
    // get tab value from active tab
    const activeTab = tabList.find(tab => tab.active) || tabList[0];
    if (activeTab) {
      this.value = this.getTabValue(activeTab);
    }
    this.manageTabIndex();
  }

  /**
   * Mark tab as active
   * @param value value of tab to select
   * @returns {void}
   */
  private activateTab (value: string): void {
    if (!value) {
      return;
    }
    let hasActiveTab = false;
    const tabList = this.getTabElements(); // get all tab elements include disabled tab
    tabList.forEach(tab => {
      const tabValue = this.getTabValue(tab);
      // only mark tab as active once
      if (tabValue === value && !hasActiveTab && !tab.disabled) {
        tab.active = true;
        hasActiveTab = true;
      }
      else {
        tab.active = false;
      }
    });
  }

  /**
   * Set tab value and fires `tab-changed` event
   * @param event - Event
   * @returns {void}
   */
  private onTap (event: Event): void {
    if (event.defaultPrevented) {
      return;
    }
    const element = event.target;
    if (element instanceof Tab) {
      const tabValue = this.getTabValue(element);
      if (tabValue !== this.value) {
        this.value = this.getTabValue(element);
        this.notifyPropertyChange('value', tabValue);
      }
    }
  }

  /**
   * Get the value of a tab
   * @param tab - The tab element.
   * @returns The value of the tab.
   */
  private getTabValue (tab: Tab): string {
    return tab.value || (tab.hasAttribute('value') ? '' : this.getTabLabel(tab));
  }

  /**
   * Return the tab's label, or its textContent, or an empty string
   * @param tab - The tab element.
   * @returns The tab label.
   */
  private getTabLabel (tab: Tab): string {
    return tab.label || tab.textContent || '';
  }

  /**
   * Get Tab elements from slot
   * @returns the array of Tab
   */
  private getTabElements (): Tab[] {
    const tabs = [];
    for (const child of this.children) {
      if (child instanceof Tab) {
        tabs.push(child);
      }
    }
    return tabs;
  }

  /**
   * Get focusable tab elements
   * @returns the array of focusable tab
   */
  private getFocusableTabs (): Tab[] {
    return this.getTabElements().filter(tab => !tab.disabled);
  }

  /**
   * Set tab level attribute accordingly
   * @returns {void}
   */
  private setLevel (): void {
    const tabList = this.getTabElements(); // get all tab elements include disabled tab
    tabList?.forEach((tab: Tab) => {
      tab.level = this.level;
    });
  }

  /**
   * Hide/Show scroll button when element is overflow.
   * @param elementWidth width of element
   * @returns {void}
   */
  private toggleScrollButton (elementWidth: number): void {
    if (this.vertical) {
      return;
    }

    const { scrollLeft, scrollWidth } = this.content;

    const leftBtnStyle = scrollLeft > 0 ? 'flex' : 'none';
    const rightBtnStyle = scrollWidth - scrollLeft - elementWidth > 1 ? 'flex' : 'none';

    this.leftBtn.style.setProperty('display', leftBtnStyle);
    this.rightBtn.style.setProperty('display', rightBtnStyle);
  }

  /**
   * Update scroll position when clicked on left button
   * @returns {void}
   */
  private handleScrollLeft (): void {
    const { scrollLeft } = this.content;
    const availableScrollLeft = scrollLeft;
    let endPosition = scrollLeft - BAR_TRAVEL_DISTANCE;

    // If the space available is less than one half lots of our desired distance, just move to the leftest
    if (availableScrollLeft < BAR_TRAVEL_DISTANCE * 1.5) {
      endPosition = 0;
    }

    tweenAnimate({ target: this.content, startPosition: scrollLeft, endPosition });
  }

  /**
   * Update scroll position when clicked on right button
   * @returns {void}
   */
  private handleScrollRight (): void {
    const { scrollLeft, scrollWidth, clientWidth } = this.content;
    const availableScrollRight = scrollWidth - (scrollLeft + clientWidth);
    let endPosition = scrollLeft + BAR_TRAVEL_DISTANCE;

    // If the space available is less than one half lots of our desired distance, just move the whole amount
    if (availableScrollRight < BAR_TRAVEL_DISTANCE * 1.5) {
      endPosition = scrollLeft + availableScrollRight;
    }

    tweenAnimate({ target: this.content, startPosition: scrollLeft, endPosition });
  }

  /**
   * Focus and set active to tab
   * @param tab - The element that was clicked.
   * @return {void}
   */
  private focusAndSetActiveTab (tab: Tab): void {
    tab.focus();
    tab.scrollIntoView({ block: 'nearest' });
    this.value = this.getTabValue(tab);
  }

  /**
   * Navigate to first focusable tab of the tab bar
   * @returns {void}
   */
  private first (): void {
    const tabList = this.getFocusableTabs();
    if (tabList.length <= 0) {
      return;
    }
    this.focusAndSetActiveTab(tabList[0]);
    this.rovingTabIndex(tabList[0], tabList);
  }

  /**
   * Navigate to last focusable tab of the tab bar
   * @returns {void}
   */
  private last (): void {
    const tabList = this.getFocusableTabs();
    if (tabList.length <= 0) {
      return;
    }
    const lastTab = tabList[tabList.length - 1];
    this.focusAndSetActiveTab(lastTab);
    this.rovingTabIndex(lastTab, tabList);
  }

  /**
   * Navigate to next or previous focusable tab
   * @param direction up/next; down/previous
   * @returns {void}
   */
  private navigateToSibling (direction: 'next' | 'previous'): void {
    const tabList = this.getFocusableTabs();
    if (tabList.length <= 0) {
      return;
    }

    const focusedTabIndex = tabList.findIndex(tab => tab === document.activeElement);
    const nextTab = direction === 'next'
      ? tabList[focusedTabIndex + 1] || tabList[0]
      : tabList[focusedTabIndex - 1] || tabList[tabList.length - 1];

    this.focusAndSetActiveTab(nextTab);
    this.rovingTabIndex(nextTab, tabList);
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'Right':
      case 'Down':
      case 'ArrowRight':
      case 'ArrowDown':
        this.navigateToSibling('next');
        break;
      case 'Left':
      case 'Up':
      case 'ArrowLeft':
      case 'ArrowUp':
        this.navigateToSibling('previous');
        break;
      case 'Home':
        this.first();
        break;
      case 'End':
        this.last();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  /**
   * Sets the tabindex to -1 for all tabs except the active tab.
   * @param target the tab to be focused
   * @param tabList Array of tabs that contains target
   * @returns {void}
   */
  private rovingTabIndex (target: Tab, tabList: Tab[]): void {
    tabList.forEach((tab) => {
      tab.tabIndex = -1;
    });
    target.tabIndex = 0;
  }

  /**
   * Set tabIndex to all tabs
   * @returns {void}
   */
  private manageTabIndex (): void {
    const tabList = this.getFocusableTabs();
    if (tabList && tabList.length > 0) {
      const focusedTabIndex = tabList.findIndex(tab => tab.active);
      this.rovingTabIndex(tabList[focusedTabIndex], tabList);
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${!this.vertical ? html`<ef-button tabIndex="-1" aria-hidden="true" icon="left" part="left-btn" @tap=${this.handleScrollLeft}></ef-button>` : null }
        <div part="content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      ${!this.vertical ? html`<ef-button tabIndex="-1" aria-hidden="true" icon="right" part="right-btn" @tap=${this.handleScrollRight}></ef-button>` : null }
    `;
  }
}
