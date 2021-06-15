import { BasicElement, customElement, html, PropertyValues, TemplateResult } from '@refinitiv-ui/core';

/**
 * Global cache for loader template parts
 */
let cachedParts: readonly string[];

/**
 *  An animated graphical component,
 *  used to show that an app is performing an action
 *  in the background such as downloading content.
 */
@customElement('ef-loader', {
  alias: 'amber-loader'
})
export class Loader extends BasicElement {
  /**
   * Collection of template part names,
   * used to create and theme different loader styles
   */
  protected get templateParts (): readonly string[] {
    const parts = cachedParts || this.getComputedVariable('--parts')
      .split(',').map(part => part.trim()).filter(part => part);
    if (cachedParts !== parts && parts.length) {
      cachedParts = parts;
    }
    return parts;
  }

  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    !cachedParts && this.requestUpdate(); // polyfilled browsers require a second update
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   *
   * @return TemplateResult
   */
  protected render (): TemplateResult {
    const dots: TemplateResult[] = [];
    for (const part of this.templateParts) {
      dots.push(html`
        <i part="${part}"></i>
      `);
    }
    return html`
      <div part="wrapper">${dots}</div>
    `;
  }


}
