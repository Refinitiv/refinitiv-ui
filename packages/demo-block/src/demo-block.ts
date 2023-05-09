/* eslint-disable no-console */
import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

@customElement('demo-block', { theme: false })
export class DemoBlock extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return 'PUBLISH_VERSION';
  }

  static get styles (): CSSResultGroup {
    return css`
      :host {
        box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.2);
        background: #fff;
        width: 800px;
        max-width: calc(100% - 80px);
        margin: 40px;
        position: relative;
        cursor: default;
        display: block;
      }

      [part=header] {
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        display: flex;
        flex-flow: row wrap;
        color: #fff;
        white-space: nowrap;
      }

      [part=header-label], [part=tag] {
        flex-grow: 1;
        font-size: 18px;
      }

      [part=tags] {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

      [part=tag] {
        background: #b4b4b4;
        color: #000;
        height: 20px;
        font-size: 11px;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 3px;
        margin-left: 3px;
      }

      [part=body] {
        padding: 20px;
        min-height: 60px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-around;
        background: var(--demo-block-background, transparent);
        position: relative;
        height: var(--canvas-height, auto);
        min-height: 200px;
      }

      :host([layout=normal]) [part=body] {
        display: block;
      }
    `;
  }

  @property({ type: String }) tags = '';
  @property({ type: String }) height? = '';
  @property({ type: String }) header = '';

  protected shouldUpdate (changedProperties: Map<PropertyKey, unknown>): boolean {
    if (changedProperties.has('height')) {
      this.updateVariable('--canvas-height', this.height);
    }

    return changedProperties.has('tags') || changedProperties.has('header');
  }

  private get _tags (): TemplateResult[] {
    return this.tags ? this.tags.split(',').map(v => html`<div part="tag">${ v.trim() }</div>`) : [];
  }

  private renderHeader (): TemplateResult | null {
    if (!this.header && !this._tags.length) {
      return null;
    }

    return html`
      <div part="header">
        ${this.header ? html`<div part="header-label">${this.header}</div>` : null}
        ${this._tags.length ? html`<div part="tags">${this._tags}</div>` : null}
      </div>
    `;
  }

  public render (): TemplateResult {
    return html`
      ${this.renderHeader()}
      <div part="body">
        <slot></slot>
      </div>
    `;
  }
}
