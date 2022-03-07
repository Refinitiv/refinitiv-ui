import { css, CSSResultGroup, html, TemplateResult, ElementSize, PropertyValues } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { isIE } from '@refinitiv-ui/utils/browser.js';
import { deregister as draggableDeregister, register as draggableRegister } from './draggable-element.js';
import { Overlay } from '../overlay/index.js';
import '../icon/index.js';
import '../panel/index.js';
import '../header/index.js';
import '../button/index.js';
import { translate, Translate, TranslatePropertyKey } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/locale/en/dialog.js';

/**
 * Popup window, designed to contain and show any HTML content.
 * It provides modal and dragging functionality,
 * and also allows custom footers and control buttons to be used.
 *
 * @prop {boolean} noCancelOnOutsideClick - Prevents dialog to close when user clicks outside the dialog.
 *
 * @attr {boolean} [opened=false] - Set dialog to open
 * @prop {boolean} [opened=false] - Set dialog to open
 *
 * @attr {boolean} [no-cancel-on-esc-key=false] - Prevents dialog to close when user presses ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Prevents dialog to close when user presses ESC key
 *
 * @attr {string | undefined} x - Set a specific x coordinate of dialog
 * @prop {string | undefined} x - Set a specific x coordinate of dialog
 *
 * @attr {string | undefined} y - Set a specific y coordinate of dialog
 * @prop {string | undefined} y - Set a specific y coordinate of dialog
 *
 * @attr {boolean} full-screen - Set dialog to full screen
 * @prop {boolean} [fullScreen=false] - Set dialog to full screen
 *
 * @attr {string | undefined} position-target - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 * @prop {string | undefined} positionTarget - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 *
 * @fires opened-changed - Fired when value of `opened` property is changed. Prevent default to stop default action
 * @fires confirm - Fired when dialog is closed by user clicked a default OK button. Prevent default to stop default action
 * @fires cancel - Fired when dialog is closed by user clicked a default Cancel button, clicked outside to close dialog or press ESC to close the dialog. Prevent default to stop default action
 *
 * @slot footer - Hide default OK and Cancel button and replace dialog's footer with your custom content.
 */
@customElement('ef-dialog', {
  alias: 'coral-dialog'
})
export class Dialog extends Overlay {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Default role of the element
   */
  protected readonly defaultRole: string | null = 'dialog';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  public static get styles (): CSSResultGroup {
    return [
      super.styles,
      css`
      :host {
        width: 400px;
        display: flex;
        flex-flow: column nowrap;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
      }

      [part=content] {
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="default-buttons"] {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      [part=header],
      [part=footer] {
        flex: none;
      }

      [part=close] {
        flex: none;
        cursor: pointer;
      }
    `];
  }

  /**
   * Set Header/Title of the dialog
   */
  @property({ type: String })
  public header: string | null = null;

  /**
   * Should the dialog be draggable
   */
  @property({ type: Boolean, reflect: true })
  public draggable = false;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  /**
   * Element for capture dragging
   */
  @query('[drag-handle]')
  private handle!: HTMLElement;

  /**
   * Content element
   */
  @query('[part=content]')
  private contentElement!: HTMLElement;

  /**
   * Header element
   */
  @query('[part=header]')
  private headerElement!: HTMLElement;

  /**
   * Footer Element
   */
  @query('[part=footer]')
  private footerElement!: HTMLElement;

  public noCancelOnOutsideClick = true;

  /**
  * @ignore
  */
  public withBackdrop = true;

  /**
  * @ignore
  */
  public withShadow = true;

  public disconnectedCallback (): void {
    super.disconnectedCallback();
    draggableDeregister(this);
  }

  /**
   * Clear all cached values and fit the popup.
   * Use this function only if maxWidth, maxHeight, minWidth, minHeight, height, width are changed
   * @returns {void}
   */
  public refit (): void {
    super.refit();
    this.restrictContentMaxHeight();
  }

  /**
   * Called when the element's dimensions have changed
   * @ignore
   * @param size dimension details
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    super.resizedCallback(size);
    this.calculateContentMaxHeight(size);
  }

  /**
   * Check if component should be updated
   * @param changedProperties properties changed on shouldUpdate lifecycle callback
   * @returns boolean should component update
   */
  protected shouldUpdate (changedProperties: PropertyValues): boolean {
    const shouldUpdate = super.shouldUpdate(changedProperties);
    return shouldUpdate
      || ((changedProperties.has('draggable') || changedProperties.has('header') || changedProperties.has('noInteractionLock') || changedProperties.has(TranslatePropertyKey)) && this.opened);
  }

  /**
   * Compute property values that depend on other properties
   * and are used in the rest of the update process.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  public willUpdate (changedProperties: PropertyValues): void {
    // dialog only update when it is opened, so also checking `opened` change.
    if (changedProperties.has('opened') || changedProperties.has('noInteractionLock')) {
      this.setAttribute('aria-modal', String(!this.noInteractionLock));
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.setAttribute('aria-modal', String(!this.noInteractionLock));
  }

  /**
   * Called after the element’s properties has been updated
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.isDraggableBehaviourNeedToBeChanged(changedProperties)) {
      this.updateDraggableBehavior();
    }
  }

  /**
   * Run when the popup has closed, managers are de-registered
   * and closing transition has finished
   * @returns {void}
   */
  protected onClosed (): void {
    super.onClosed();
    this.restrictContentMaxHeight();
  }

  /**
   * IE11 only: Restrict maximum height of content element
   * @param [maxHeight] Maximum height of content element
   * @returns {void}
   */
  /* istanbul ignore next */
  private restrictContentMaxHeight (maxHeight?: number): void {
    if (!isIE) {
      return;
    }

    if (maxHeight) {
      this.contentElement.style.setProperty('max-height', `${maxHeight}px`);
    }
    else {
      this.contentElement.style.removeProperty('max-height');
    }
  }

  /**
   * IE11 only: Calculate the maxHeight of content element
   * @param size Size of the dialog
   * @returns {void}
   */
  /* istanbul ignore next */
  private calculateContentMaxHeight (size: ElementSize): void {
    if (!isIE) {
      return;
    }

    const headerRect = this.headerElement.getBoundingClientRect();
    const footerRect = this.footerElement.getBoundingClientRect();
    const contentRect = this.contentElement.getBoundingClientRect();

    const dialogHeight = size.height;
    const headerHeight = headerRect ? headerRect.height : 0;
    const footerHeight = footerRect ? footerRect.height : 0;
    const contentHeight = contentRect ? contentRect.height : 0;

    if (headerHeight + footerHeight + contentHeight > dialogHeight) {
      this.restrictContentMaxHeight(dialogHeight - footerHeight - headerHeight);
    }
  }

  /**
   * Default handler for confirm click
   * @returns {void}
   */
  protected defaultConfirm (): void {
    if (this.fireCancelOrConfirmEvent(true)) {
      this.setOpened(false);
    }
  }

  /**
   * Default handler for cancel click
   * @returns {void}
   */
  protected defaultCancel (): void {
    if (this.fireCancelOrConfirmEvent(false)) {
      this.setOpened(false);
    }
  }

  /**
   * Update draggable behavior looking to properties draggable and opened
   * @returns {void}
   */
  private updateDraggableBehavior (): void {
    if (this.draggable && this.opened) {
      const handle = this.handle;

      handle && draggableRegister(this, handle);
    }
    else {
      draggableDeregister(this);
    }
  }

  /**
   * @param changedProperties - updated properties map
   * @returns true if needs to update draggable behavior
   */
  private isDraggableBehaviourNeedToBeChanged (changedProperties: PropertyValues): boolean {
    return changedProperties.has('draggable') || changedProperties.has('opened');
  }

  /**
   * fire `cancel` or `confirm` event looking to `confirm` property
   * @param isConfirm true to fire `confirm` event. false to fire `cancel` event
   * @returns true if event is successful, false if event is prevented
   */
  private fireCancelOrConfirmEvent (isConfirm: boolean): boolean {
    const event = new CustomEvent(isConfirm ? 'confirm' : 'cancel', {
      cancelable: true
    });
    this.dispatchEvent(event);

    return !event.defaultPrevented;
  }

  /**
   * Get the default content region
   * @return {TemplateResult} Render template
   */
  protected get contentRegion (): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * Get the default footer region
   * @return {TemplateResult} Render template
   */
  protected get footerRegion (): TemplateResult {
    return html`<slot name="footer">
      <div part="default-buttons">
        <ef-button part="default-button" cta @tap="${this.defaultConfirm}">${this.t('OK')}</ef-button>
        <ef-button part="default-button" @tap="${this.defaultCancel}">${this.t('CANCEL')}</ef-button>
      </div>
    </slot>`;
  }

  /**
   * Get the default header region
   * @return {TemplateResult} Render template
   */
  protected get headerRegion (): TemplateResult {
    return html`
      ${this.header === null ? this.t('HEADER') : this.header}
      <ef-icon aria-hidden="true" part="close" icon="cross" slot="right" @tap="${this.defaultCancel}"></ef-icon>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-header drag-handle part="header">${this.headerRegion}</ef-header>
      <ef-panel part="content" spacing transparent>${this.contentRegion}</ef-panel>
      <div part="footer">${this.footerRegion}</div>
    `;
  }
}
