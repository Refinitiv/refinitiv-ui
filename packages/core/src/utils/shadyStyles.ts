import type { StyleInfo } from '../interfaces/StyleInfo';

/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace window.ShadyCSS {
  const nativeCss: boolean;
  function getComputedStyleValue(el: HTMLElement, key: string): string;
  function styleSubtree(el: HTMLElement, styles: StyleInfo): void;
  function styleDocument(styles?: StyleInfo): void;
  const CustomStyleInterface: {
    addCustomStyle(style: HTMLStyleElement): void;
  };
}

const _ShadyCSS = window.ShadyCSS;
export const ShadyCSS = _ShadyCSS && !_ShadyCSS.nativeCss ? _ShadyCSS : undefined;
