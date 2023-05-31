import {
  BasicElement,
  svg,
  css,
  CSSResultGroup,
  TemplateResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { unsafeHTML } from '@refinitiv-ui/core/directives/unsafe-html.js';
import { Deferred } from '@refinitiv-ui/utils/loader.js';
import { VERSION } from '../version.js';
import { FlagLoader } from './utils/FlagLoader.js';
export { preload } from './utils/FlagLoader.js';

const EmptyTemplate = svg``;


@customElement('ef-flag')
export class Flag extends BasicElement {

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
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
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

  private _flag: string | null = null;

  /**
   * Code of a known flag to render or URL of flag SVG file.
   * @example gb | https://cdn.io/flags/gb.svg
   * @default null
   */
  @property({ type: String })
  public get flag (): string | null {
    return this._flag;
  }
  public set flag (value: string | null) {
    if (this.flag !== value) {
      this.deferFlagReady();
      this._flag = value;
      void this.setFlagSrc();
    }
  }

  private _src: string | null = null;

  /**
   * Src location of an svg flag.
   * @ignore
   * @example https://cdn.io/flags/gb.svg
   * @deprecated Use `flag` instead
   * @default null
   */
  @property({ type: String })
  public get src (): string | null {
    return this._src;
  }
  /**
    * @ignore
    * @param value Location of an svg
    */
  public set src (value: string | null) {
    if (this.src !== value) {
      this.deferFlagReady();
      this._src = value;
      if (value) {
        void this.loadAndRenderFlag(value);
      }
      else {
        this.clearFlag();
      }
    }
  }

  private _template: TemplateResult = EmptyTemplate;

  /**
   * The flag template to render
   */
  private get template (): TemplateResult {
    return this._template;
  }
  private set template (value: TemplateResult) {
    if (this._template !== value) {
      this._template = value;
      this.requestUpdate();
    }
    this.flagReady.resolve();
  }

  /**
   * A deferred promise representing flag ready.
   * It would be resolved when the flag svg has been fetched and parsed, or
   * when the flag svg is unavailable/invalid.
   */
  private flagReady!:Deferred<void>;

  constructor () {
    super();
    this.flagReady = new Deferred<void>();
    // `flagReady` resolves at this stage so that `updateComplete` would be resolvable
    // even in the case that both `flag` and `src` attribute are missing.
    this.flagReady.resolve();
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
    await this.flagReady.promise;
    return result;
  }

  /**
   * instantiate a new deferred promise for flag ready if it's not pending already
   * @returns {void}
   */
  private deferFlagReady (): void {
    if (this.flagReady.isPending()) {
      return;
    }
    this.flagReady = new Deferred<void>();
  }

  /**
   * Helper method, used to set the flag src.
   * @returns {void}
   */
  private async setFlagSrc (): Promise<void> {
  // keep `src` in-sync with `flag` so that flag svg would be resolved after every `flag` update
    this.src = this.flag ? await FlagLoader.getSrc(this.flag) : this.flag;
  }

  /**
   * Tries to load an flag from the url provided
   * and the renders this into the flag template.
   * @param src Source location of the svg flag.
   * @returns {void}
   */
  private async loadAndRenderFlag (src: string): Promise<void> {
    const svgBody = await FlagLoader.loadSVG(src);
    this.template = svgBody ? svg`${unsafeHTML(svgBody)}` : EmptyTemplate;
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

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    return this.template;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-flag': Flag;
  }
}
