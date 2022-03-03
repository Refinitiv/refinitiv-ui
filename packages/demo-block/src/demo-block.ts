/* eslint-disable no-console */
import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  StyleInfo
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

const Themes = [
  'elemental-theme/light',
  'elemental-theme/dark',
  'halo-theme/light',
  'halo-theme/dark',
  'solar-theme/pearl',
  'solar-theme/charcoal'
];

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace ShadyCSS {
  const nativeCss: boolean;
  function styleDocument(styles: StyleInfo): void;
}

/* istanbul ignore next */
const useShadyCSS = (): boolean => 'ShadyCSS' in window && !ShadyCSS.nativeCss;

const getCurrentTheme = (): string => {
  return sessionStorage.getItem('elf-demo-theme') || Themes[0];
};

const getNextTheme = (): string => {
  return Themes[(Themes.indexOf(getCurrentTheme()) + 1) % Themes.length];
};

const getPrevTheme = (): string => {
  return Themes[(Themes.indexOf(getCurrentTheme()) + Themes.length - 1) % Themes.length];
};

/* istanbul ignore next */
const changeTheme = (theme: string): void => {
  sessionStorage.setItem('elf-demo-theme', theme);
  location.reload();
};

const removePrefixName = (name: string): string => {
  return name.replace('elf-theme-', '');
};

const currentTheme = getCurrentTheme();
const themeLoader = document.createElement('script');
themeLoader.src = `/node_modules/@refinitiv-ui/${currentTheme}/es5/all-elements.js`;
document.head.appendChild(themeLoader);
console.info('Theme:', currentTheme);

/* istanbul ignore next */
themeLoader.onload = (): void => {
  const body = document.body;
  const bgColor = getComputedStyle(body).getPropertyValue('background-color');
  const bgStyle = document.createElement('style');
  bgStyle.textContent = `body { background-color: transparent !important; --demo-block-background: ${bgColor}; visibility: visible; }`;
  document.head.appendChild(bgStyle);

  if (useShadyCSS()) {
    ShadyCSS.styleDocument({ '--demo-block-background': bgColor });
  }
};

// Next Theme
const nextBtn = document.createElement('span');
nextBtn.id = 'change-theme';
nextBtn.setAttribute('title', getNextTheme());
nextBtn.style.backgroundColor = '#f5f5f6';
nextBtn.style.position = 'fixed';
nextBtn.style.right = '10px';
nextBtn.style.top = '10px';
nextBtn.style.fontSize = '0';
nextBtn.style.cursor = 'pointer';
nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>';
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
themeLabel.style.left = '10px';
themeLabel.style.top = '10px';
themeLabel.style.padding = '2px 4px';
themeLabel.style.fontWeight = 'bold';
themeLabel.style.textTransform = 'uppercase';
themeLabel.innerHTML = removePrefixName(currentTheme);

const versionTag = document.createElement('span');
versionTag.innerHTML = 'V5';
versionTag.style.marginLeft = '8px';
versionTag.style.color = '#334BFF';
themeLabel.appendChild(versionTag);

document.body.appendChild(nextBtn);
document.body.appendChild(prevBtn);
document.body.appendChild(themeLabel);

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
        background: #0080f0;
        color: #fff;
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
