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
import { FlagLoader } from './utils/FlagLoader';
export { preload } from './utils/FlagLoader';

const EmptyTemplate = svg``;

/**
 * Provides a collection of flags.
 *
 * @attr {string | null} src - Src location of a svg flag.
 * @prop {string | null} src - Src location of a svg flag
 *
 */
@customElement('ef-flag', {
  alias: 'coral-flag'
})
export class Flag extends BasicElement {
  private _src: string | null = null;
  private _flag: string | null = null;
  private _template: TemplateResult = EmptyTemplate;

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        width: 1.33em;
        height: 1em;
      }
      svg {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
    `;
  }

  /**
   * Name of a known flag to render.
   * @example gb
   */
  @property({ type: String })
  public get flag (): string | null {
    return this._flag;
  }
  public set flag (value: string | null) {
    if (this.flag !== value) {
      this._flag = value;
      this.setFlagSrc();
    }
  }

  /**
   * Src location of an svg flag.
   * @example https://cdn.io/flags/gb.svg
   */
  @property({ type: String })
  public get src (): string | null {
    return this._src;
  }
  public set src (value: string | null) {
    if (this.src !== value) {
      this._src = value;
      this.clearFlag();
      if (value) {
        this.loadAndRenderFlag(value);
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
   * The flag template to render
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
   * Helper method, used to set the flag src.
   * @returns {void}
   */
  private async setFlagSrc (): Promise<void> {
    this.src = this.flag ? await FlagLoader.getSrc(this.flag) : null;
  }

  /**
   * Tries to load an flag from the url provided
   * and the renders this into the flag template.
   * @param src Source location of the svg flag.
   * @returns {void}
   */
  private async loadAndRenderFlag (src: string): Promise<void> {

    const svgBody = await FlagLoader.loadSVG(src);
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

    if (!FlagLoader.isPrefixSet) {
      const CDNPrefix = this.getComputedVariable('--cdn-prefix')
        .replace(/^('|")|('|")$/g, '');

      FlagLoader.setCdnPrefix(CDNPrefix);
    }
  }

  /**
   * Clears SVG body from the flag template
   * @returns {void}
   */
  private clearFlag (): void {
    this.template = EmptyTemplate;
  }
}

