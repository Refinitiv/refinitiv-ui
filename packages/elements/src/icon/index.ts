import {
  BasicElement,
  svg,
  css,
  customElement,
  property,
  CSSResult,
  unsafeHTML,
  TemplateResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { IconLoader } from './utils/IconLoader';
export { preload } from './utils/IconLoader';

const EmptyTemplate = svg``;

@customElement('ef-icon')
export class Icon extends BasicElement {
  private _src: string | null = null;
  private _icon: string | null = null;
  private _template: TemplateResult = EmptyTemplate;

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
    return css`
      :host {
        display: inline-block;
        width: 1em;
        height: 1em;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `;
  }

  /**
   * Name of a known icon to render.
   * @example heart
   */
  @property({ type: String, reflect: true })
  public get icon (): string | null {
    return this._icon;
  }
  public set icon (value: string | null) {
    const oldValue = this._icon;
    if (oldValue !== value) {
      this._icon = value;
      void this.setIconSrc();
      void this.requestUpdate('icon', oldValue);
    }
  }

  /**
   * Src location of an svg icon.
   * @example https://cdn.io/icons/heart.svg
   */
  @property({ type: String })
  public get src (): string | null {
    return this._src;
  }
  public set src (value: string | null) {
    if (this.src !== value) {
      this._src = value;
      this.clearIcon();
      if (value) {
        void this.loadAndRenderIcon(value);
      }
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    /**
     * We have to call this here because
     * polyfilled browsers only get variables at this point.
     */
    this.setPrefix();
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return this.template;
  }

  /**
   * The icon template to render
   */
  private get template (): TemplateResult {
    return this._template;
  }
  private set template (value: TemplateResult) {
    if (this._template !== value) {
      this._template = value;
      void this.requestUpdate();
    }
  }

  /**
   * Helper method, used to set the icon src.
   * @returns {void}
   */
  private async setIconSrc (): Promise<void> {
    this.src = this.icon ? await IconLoader.getSrc(this.icon) : null;
  }

  /**
   * Tries to load an icon from the url provided
   * and the renders this into the icon template.
   * @param src Source location of the svg icon.
   * @returns {void}
   */
  private async loadAndRenderIcon (src: string): Promise<void> {
    const svgBody = await IconLoader.loadSVG(src);
    if (svgBody) {
      this.template = svg`${unsafeHTML(svgBody)}`;
    }
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
  }
}

