import {
  ResponsiveElement,
  ElementSize,
  html,
  TemplateResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import { TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';
import type { Notification } from './notification';
import type { Task, TaskOptions } from '../helpers/types';

@customElement('ef-notification-tray', {
  alias: 'amber-notification-tray'
})
export class NotificationTray extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private queue: Array<Task> = [];
  private showing: Array<Task> = [];
  private resizeTask = new TimeoutTaskRunner();
  private nextToDismiss: Task | null = null;
  private defaultTimeout = 10000;

  /**
   * Maximum number to show notification limit
   */
  @property({ type: Number })
  public max = 1;

  /**
   * Attach point for notification top|bottom
   */
  @property({ type: String, reflect: true })
  public attach = '';

  /**
   * Does the tray has room to show another notification?
   * @returns true if tray is ready to show
   */
  private get canShow (): boolean {
    return this.showing.length < this.max;
  }

  /**
   * Gets the next dismissable notification.
   * @returns notification task
   */
  private get nextDismissable (): Task {
    return this.showing.filter(item => item.options.duration !== Infinity)[0];
  }

  /**
   * On first updated lifecycle
   * @param changedProperties changed property
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('collapsed', (event) => this.removeChild(event.target as Node), true);
    this.max = parseInt(this.getComputedVariable('--max'), 10) || 1;
    this.defaultTimeout = parseInt(this.getComputedVariable('--default-timeout'), 10) || 10000;
  }

  /**
   * Validate attach value
   * @param attach attach value
   * @returns results
   */
  private isValidAttatchPoint (attach: string): boolean {
    return (/^(top|bottom)$/).test(attach);
  }

  /**
   * Get the amount of padding to be applied to the document.
   * @param size element dimensions
   * @returns padding size
   */
  private getSizeFromAttachPoint (size: ElementSize): number {
    // Only push the app if the tray is top or bottom.
    if (this.isValidAttatchPoint(this.attach)) {
      return size.height;
    }
    return 0;
  }

  /**
   * Called when the element resizes
   * @ignore
   * @param size element dimensions
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    // Defer the root padding to prevent a resize loop error
    // when this causes other elements to resize.
    this.resizeTask.schedule(() => {
      const root = document.documentElement;
      const padding = this.getSizeFromAttachPoint(size);
      const paddingPoint = `padding-${this.isValidAttatchPoint(this.attach) ? this.attach : 'top'}`;
      if (padding) {
        root.style.setProperty('box-sizing', 'border-box');
        root.style.setProperty(paddingPoint, `${padding}px`);
      }
      else {
        root.style.removeProperty('border-sizing');
        root.style.removeProperty(paddingPoint);
      }
    });
  }

  /**
   * Schedules the dismissal of the current dismissable notification.
   * @returns {void}
   */
  private dismissNext (): void {
    const next = this.nextDismissable;
    if (next && next !== this.nextToDismiss) {
      const duration = next.options.duration;
      this.nextToDismiss = next;

      const timeout = setTimeout(() => {
        next.el.dismiss();
      }, typeof duration === 'number' ? duration : this.defaultTimeout);
      next.el.addEventListener('dismiss', () => {
        clearTimeout(timeout);
      }, { once: true });
    }
  }

  /**
   * Process notifications
   * @returns {void}
   */
  private tick (): void {
    if (this.canShow) {
      const showing = this.showing;
      const item = this.queue.shift();

      if (item) {
        showing.push(item);
        this.appendChild(item.el);
        item.el.addEventListener('dismiss', () => {
          showing.splice(showing.indexOf(item), 1);
          this.dismissNext();
          this.tick();
        }, { once: true });
        this.dismissNext();
      }
    }
  }

  /**
   * Pushes a new notification into the tray.
   * It will be shown when available to do so.
   * @param el notification element to append.
   * @param options notification options
   * @returns {void}
   */
  public push (el: Notification, options: TaskOptions): void {
    this.queue.push({ el, options });
    this.tick();
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`<slot></slot>`;
  }
}
