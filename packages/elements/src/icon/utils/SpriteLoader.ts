import { SVGLoader } from '@refinitiv-ui/utils/loader.js';

class SvgSpriteLoader extends SVGLoader {
  public async getSrc (name: string) {
    return name ? `${await this.getCdnPrefix()}sprite/icons.svg#${name}` : '';
  }

  public async use (src: string) {
    const sprite = await this.loadSVG('sprite/icons');

    if (!sprite) {
      throw new Error("SvgSpriteLoader: couldn't load SVG sprite source");
    }

    const iconName = new URL(src).hash.replace('#', '');

    if (!iconName) {
      throw new Error("SvgSpriteLoader: couldn't detect SVG icon name");
    }

    return new DOMParser()
      .parseFromString(sprite, 'text/xml')
      .getElementById(iconName)?.outerHTML;
  }
}

const instance = new SvgSpriteLoader();

const preload = () => instance.loadSVG('sprite/icons');

export { instance as SvgSpriteLoader, preload };
