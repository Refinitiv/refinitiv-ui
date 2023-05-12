import {
  BasicElement,
  svg,
  css,
  CSSResultGroup,
  TemplateResult,
  SVGTemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { unsafeSVG } from '@refinitiv-ui/core/directives/unsafe-svg.js';
import { VERSION } from '../version.js';
import { IconLoader } from './utils/IconLoader.js';
export { preload } from './utils/IconLoader.js';

const EmptyTemplate = svg``;

/**
 * Cache for reusing SVG template results across multiple icons.
 * Reusing these templates increases performance dramatically when many icons are rendered.
 * As the cache key is an absolute URL, we can assume no clashes will occur.
 */
const iconTemplateCache = new Map<string, Promise<SVGTemplateResult>>();

@customElement('ef-icon')
export class Icon extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        line-height: 1;
        width: 1em;
        height: 1em;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `;
  }

  private _icon: string | null = null;

  /**
   * Name of a known icon to render or URL of SVG icon.
   * @example heart | https://cdn.io/icons/heart.svg
   * @default null
   */
  @property({ type: String, reflect: true })
  public get icon (): string | null {
    return this._icon;
  }
  public set icon (value: string | null) {
    const oldValue = this._icon;
    if (oldValue !== value) {
      void this.enqueueIconReady();
      this._icon = value;
      void this.setIconSrc();
      this.requestUpdate('icon', oldValue);
    }
  }

  private _src: string | null = null;

  /**
   * Src location of an svg icon.
   * @example https://cdn.io/icons/heart.svg
   * @deprecated Use `icon` instead
   * @default null
   */
  @property({ type: String })
  public get src (): string | null {
    return this._src;
  }
  public set src (value: string | null) {
    if (this.src !== value) {
      void this.enqueueIconReady();
      this._src = value;
      if (value) {
        void this.loadAndRenderIcon(value);
      }
      else {
        this.clearIcon();
      }
    }
  }

  private _template: TemplateResult = EmptyTemplate;

  /**
   * The icon template to render
   */
  private get template (): TemplateResult {
    return this._template;
  }
  private set template (value: TemplateResult) {
    if (this._template !== value) {
      this._template = value;
      this.requestUpdate();
    }
  }

  private iconPending = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  private resolveIconReady (_requestedUpdate: boolean) { }
  private iconReady: Promise<boolean> = Promise.resolve(true);

  /**
   * Registers the connection to the DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    this.setPrefix();
  }

  override async getUpdateComplete (): Promise<boolean> {
    const result = await super.getUpdateComplete();
    await this.iconReady;
    return result;
  }


  private enqueueIconReady () {
    if (this.iconPending) {
      return;
    }
    this.iconReady = new Promise(resolve => {
      this.resolveIconReady = resolve;
    });
    this.iconPending = true;
  }

  /**
   * Helper method, used to set the icon src.
   * @returns {void}
   */
  private async setIconSrc (): Promise<void> {
    // updating from/to empty string and null should result in empty template
    this.src = this.icon ? await IconLoader.getSrc(this.icon) : this.icon;
  }

  /**
   * Tries to load an icon from the url provided
   * and the renders this into the icon template.
   * @param src Source location of the svg icon.
   * @returns {void}
   */
  private async loadAndRenderIcon (src: string): Promise<void> {
    const iconTemplateCacheItem = iconTemplateCache.get(src);
    if (!iconTemplateCacheItem) {
      iconTemplateCache.set(
        src,
        IconLoader.loadSVG(src)
        .then(body => svg`${unsafeSVG(body)}`)
      );
      return this.loadAndRenderIcon(src); // Load again and await cache result
    }
    this.template = await iconTemplateCacheItem;
    this.iconPending = false;
    this.resolveIconReady(true);
  }

  /**
   * Get and cache CDN prefix
   * This is a private URL which is set in the theme
   * and should not be configured again via the variable.
   * @returns {void}
   */
  private setPrefix (): void {
    if (!IconLoader.isPrefixSet) {
      const CDNPrefix = this.getComputedVariable('--cdn-prefix')
        .replace(/^('|")|('|")$/g, '');

      IconLoader.setCdnPrefix(CDNPrefix);
    }
  }

  /**
   * Clears SVG body from the icon template
   * @returns {void}
   */
  private clearIcon (): void {
    this.template = EmptyTemplate;
    this.iconPending = false;
    this.resolveIconReady(true);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return this.template;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-icon': Icon;
  }
}
