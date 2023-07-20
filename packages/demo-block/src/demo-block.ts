/* eslint-disable no-console */
import { BasicElement, CSSResultGroup, TemplateResult, css, html } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

const Themes = ['halo/light', 'halo/dark', 'solar/pearl', 'solar/charcoal'];

const url = new URL(window.location as unknown as string);

const getCurrentTheme = (): string => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${url.searchParams.get('theme')}/${url.searchParams.get('variant')}` || Themes[0];
};

const getNextTheme = (): string => {
  return Themes[(Themes.indexOf(getCurrentTheme()) + 1) % Themes.length];
};

const getPrevTheme = (): string => {
  return Themes[(Themes.indexOf(getCurrentTheme()) + Themes.length - 1) % Themes.length];
};

/* c8 ignore start */
const changeTheme = (theme: string): void => {
  const searchParams = theme.split('/');
  url.searchParams.set('theme', searchParams[0]);
  url.searchParams.set('variant', searchParams[1]);
  window.location.search = url.searchParams.toString();
};
/* c8 ignore stop */

const removePrefixName = (name: string): string => {
  return name.replace('elf-theme-', '');
};

const currentTheme = getCurrentTheme();

// Next Theme
const nextBtn = document.createElement('span');
nextBtn.id = 'change-theme';
nextBtn.setAttribute('title', getNextTheme());
nextBtn.style.backgroundColor = '#f5f5f6';
nextBtn.style.lineHeight = 'normal';
nextBtn.style.position = 'fixed';
nextBtn.style.right = '10px';
nextBtn.style.top = '10px';
nextBtn.style.fontSize = '0';
nextBtn.style.cursor = 'pointer';
nextBtn.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>';
nextBtn.addEventListener('click', () => {
  changeTheme(getNextTheme());
});

// Prev Theme
const prevBtn = nextBtn.cloneNode(true) as HTMLElement;
prevBtn.id = 'prev_theme_btn';
prevBtn.setAttribute('title', getPrevTheme());
prevBtn.style.right = '40px';
prevBtn.style.transform = 'rotate(180deg)';
prevBtn.addEventListener('click', () => {
  changeTheme(getPrevTheme());
});

// Label Theme
const themeLabel = document.createElement('span');
themeLabel.id = 'current_theme_btn';
themeLabel.setAttribute('title', currentTheme);
themeLabel.style.backgroundColor = '#f5f5f6';
themeLabel.style.color = '#3e444f';
themeLabel.style.position = 'fixed';
themeLabel.style.fontSize = '15px';
themeLabel.style.lineHeight = 'normal';
themeLabel.style.left = '10px';
themeLabel.style.top = '10px';
themeLabel.style.padding = '2px 4px';
themeLabel.style.fontWeight = '600';
themeLabel.style.textTransform = 'uppercase';
themeLabel.innerHTML = removePrefixName(currentTheme);

document.body.appendChild(nextBtn);
document.body.appendChild(prevBtn);
document.body.appendChild(themeLabel);

@customElement('demo-block', { theme: false })
export class DemoBlock extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return 'PUBLISH_VERSION';
  }

  static override get styles(): CSSResultGroup {
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

      [part='header'] {
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

      [part='header-label'],
      [part='tag'] {
        flex-grow: 1;
        font-size: 18px;
      }

      [part='tags'] {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

      [part='tag'] {
        background: #b4b4b4;
        color: #000;
        height: 20px;
        font-size: 11px;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 3px;
        margin-left: 3px;
      }

      [part='body'] {
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

      :host([layout='normal']) [part='body'] {
        display: block;
      }
    `;
  }

  @property({ type: String }) tags = '';
  @property({ type: String }) height? = '';
  @property({ type: String }) header = '';

  protected override shouldUpdate(changedProperties: Map<PropertyKey, unknown>): boolean {
    if (changedProperties.has('height')) {
      this.updateVariable('--canvas-height', this.height);
    }

    return changedProperties.has('tags') || changedProperties.has('header');
  }

  private get _tags(): TemplateResult[] {
    return this.tags ? this.tags.split(',').map((v) => html`<div part="tag">${v.trim()}</div>`) : [];
  }

  private renderHeader(): TemplateResult | null {
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

  public override render(): TemplateResult {
    return html`
      ${this.renderHeader()}
      <div part="body">
        <slot></slot>
      </div>
    `;
  }
}
