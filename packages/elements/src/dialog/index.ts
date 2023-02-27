import { css, CSSResultGroup, html, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
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
 * @fires opened-changed - Fired when the user changes open state of the dialog e.g. when the user presses escape key or uses close button to close the dialog. The event is not triggered if `opened` property is changed programmatically.
 * @fires confirm - Fired when dialog is closed by user clicked a default OK button. Prevent default to stop default action
 * @fires cancel - Fired when dialog is closed by user clicked a default Cancel button, clicked outside to close dialog or press ESC to close the dialog. Prevent default to stop default action
 *
 * @slot footer - Hide default OK and Cancel button and replace dialog's footer with your custom content.
 */
@customElement('ef-dialog')
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
      [part=default-buttons] {
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
   * Flag to say whether the dialog has been confirmed and closed.
   */
  protected confirmed = false;

  /**
   * Close dialog when user clicked outside the dialog
   */
  public noCancelOnOutsideClick = true;

  /**
   * @ignore
   * Hiding from document to avoid property overridden
   */
  @property({ type: Boolean, attribute: false })
  public withBackdrop = true;

  /**
   * @ignore
   * Hiding from document to avoid property overridden
   */
  @property({ type: Boolean, reflect: true, attribute: 'with-shadow' })
  public withShadow = true;

  public disconnectedCallback (): void {
    super.disconnectedCallback();
    draggableDeregister(this);
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
  protected willUpdate (changedProperties: PropertyValues): void {
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
  }

  /**
   * Default handler for confirm click
   * @returns {void}
   */
  protected defaultConfirm (): void {
    this.confirmed = true;
    this.setOpened(false);
  }

  /**
   * Default handler for cancel click
   * @returns {void}
   */
  protected defaultCancel (): void {
    this.confirmed = false;
    this.setOpened(false);
  }

  /**
   * Make sure that confirm/cancel events are fired appropriately
   * All internal opened set events can be stoppable externally
   * Use this instead of setting opened directly
   * @param opened True if opened
   * @returns {void}
   */
  protected override setOpened (opened: boolean): void {
    if (!opened) {
      // if default is prevented, do not proceed to closed
      if (!this.fireCancelOrConfirmEvent(this.confirmed)) {
        return;
      }
    }

    super.setOpened(opened);
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
   * Get the default content template
   * @return {TemplateResult} Render template
   */
  protected get contentTemplate (): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * Get the default footer template
   * @return {TemplateResult} Render template
   */
  protected get footerTemplate (): TemplateResult {
    return html`<slot name="footer">
      <div part="default-buttons">
        <ef-button part="default-button" cta @tap="${this.defaultConfirm}">${this.t('OK')}</ef-button>
        <ef-button part="default-button" @tap="${this.defaultCancel}">${this.t('CANCEL')}</ef-button>
      </div>
    </slot>`;
  }

  /**
   * Get the default header template
   * @return {TemplateResult} Render template
   */
  protected get headerTemplate (): TemplateResult {
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
      <ef-header drag-handle part="header">
        ${this.headerTemplate}
      </ef-header>
      <ef-panel part="content" spacing transparent>
        ${this.contentTemplate}
      </ef-panel>
      <div part="footer">
        ${this.footerTemplate}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-dialog': Dialog;
  }
}
