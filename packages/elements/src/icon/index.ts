import {
  BasicElement,
  svg,
  css,
  CSSResultGroup,
  TemplateResult,
  SVGTemplateResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { unsafeSVG } from '@refinitiv-ui/core/directives/unsafe-svg.js';
import { Deferred, isUrl, isBase64svg } from '@refinitiv-ui/utils/loader.js';
import { VERSION } from '../version.js';
import { IconLoader } from './utils/IconLoader.js';
import { consume } from '@lit-labs/context';
import { efConfig, type Config } from '../configuration/index.js';
import { SpriteLoader } from './utils/SpriteLoader.js';

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
   * Icon map from ef-configuration
   * @ignore
   */
  @consume({ context: efConfig, subscribe: true })
  public config?: Config;

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
      this.deferIconReady();
      this._icon = value;
      requestAnimationFrame(() => this.updateRenderer());
      this.requestUpdate('icon', oldValue);
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
    this.iconReady.resolve();
  }

  /**
   * A deferred promise representing icon ready.
   * It would be resolved when the icon svg has been fetched and parsed, or
   * when the icon svg is unavailable/invalid.
   */
  private iconReady!: Deferred<void>;

  constructor () {
    super();
    this.iconReady = new Deferred<void>();
    // `iconReady` resolves at this stage so that `updateComplete` would be resolvable
    // even in the case that both `icon` and `src` attribute are missing.
    this.iconReady.resolve();
  }

  /**
   * Check if the icon map configuration has content
   * @returns icon map if exists
   */
  private get iconMap (): string | null {
    return this.icon && this.config?.icon.map[this.icon] || null;
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.setPrefix();
  }

  protected async getUpdateComplete (): Promise<boolean> {
    const result = await super.getUpdateComplete();
    await this.iconReady.promise;
    return result;
  }

  /**
   * instantiate a new deferred promise for icon ready if it's not pending already
   * @returns {void}
   */
  private deferIconReady (): void {
    if (this.iconReady.isPending()) {
      return;
    }
    this.iconReady = new Deferred<void>();
  }

  private isIconValid (): boolean {
    if (!this._icon) {
      return false;
    }
    if (this.iconMap && (!isBase64svg(this.iconMap) && !isUrl(this.iconMap))) {
      return false;
    }
    return true;
  }

  private updateRenderer () {
    if (!this.isIconValid()) {
      return this.clearIcon();
    }
    const iconProperty = this._icon!;
    if (this.iconMap) {
      void this.loadAndRenderIcon(this.iconMap);
    }
    else if (isUrl(iconProperty) || IconLoader.isPrefixSet) {
      void this.loadAndRenderIcon(iconProperty);
    }
    else {
      void this.loadAndRenderSpriteIcon(iconProperty);
    }
  }

  /**
   * Tries to load an icon from the url provided
   * and the renders this into the icon template.
   * @param src Source location of the svg icon.
   * @param isSprite is the sprite icon
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
  }

  /**
   * Tries to load an sprite icon from the url provided
   * and the renders this into the icon template.
   * @param src Source location of the svg icon.
   * @returns {void}
   */
  private async loadAndRenderSpriteIcon (src: string): Promise<void> {
    const iconTemplateCacheItem = iconTemplateCache.get(src);
    if (!iconTemplateCacheItem) {
      iconTemplateCache.set(
        src,
        SpriteLoader.loadSpriteSVG(src)
        .then(body => svg`${unsafeSVG(body)}`)
      );
      return this.loadAndRenderIcon(src); // Load again and await cache result
    }
    this.template = await iconTemplateCacheItem;
  }

  /**
   * Get and cache CDN prefix
   * This is a private URL which is set in the theme
   * and should not be configured again via the variable.
   * @returns {void}
   */
  private setPrefix (): void {
    if (!IconLoader.isPrefixSet) {
      const CDNPrefix = this.getComputedVariable('--cdn-prefix');
      IconLoader.setCdnPrefix(CDNPrefix);
    }
    if (!SpriteLoader.isPrefixSet) {
      const CDNSpritePrefix = this.getComputedVariable('--cdn-sprite-prefix');
      SpriteLoader.setCdnPrefix(CDNSpritePrefix);
    }
  }

  /**
   * Clears SVG body from the icon template
   * @returns {void}
   */
  private clearIcon (): void {
    this.template = EmptyTemplate;
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
