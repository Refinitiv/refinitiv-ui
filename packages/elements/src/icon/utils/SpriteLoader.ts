import { SVGLoader } from '@refinitiv-ui/utils/loader.js';

class SvgSpriteLoader extends SVGLoader {
  public async use (name: string) {
    const sprite = await this.loadSVG('sprite/icons');

    if (!sprite) {
      throw new Error("SvgSpriteLoader: couldn't load SVG sprite source");
    }

    return new DOMParser()
      .parseFromString(sprite, 'text/xml')
      .getElementById(name)?.outerHTML;
  }
}

export default new SvgSpriteLoader();
