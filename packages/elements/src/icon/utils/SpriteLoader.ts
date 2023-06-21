import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
let spriteCache: Promise<Document> | undefined;

/**
 * Caches and provides sprite icon SVG
 * Uses singleton pattern
 */
class SpriteLoader extends SVGLoader {

  public async getSrc (): Promise<string> {
    return await this.getCdnPrefix();
  }

  /**
   * Load and Create DOM sprite SVG
   * @returns returns the DOM sprite SVG
   */
  private async loadSprite (): Promise<Document> {
    const sprite = await this.loadSVG('sprite/icons');
    if (!sprite) {
      throw new Error("SpriteLoader: couldn't load SVG sprite source");
    }
    return new DOMParser().parseFromString(sprite, 'image/svg+xml');
  }

  /**
   * Load and cache the DOM sprite svg
   * Get an svg fragment of DOM sprite svg
   * @param iconName Name of svg to load
   * @returns returns the svg fragment body
   */
  public async loadSpriteSVG (iconName: string): Promise<string | undefined> {
    if (!spriteCache) {
      spriteCache = this.loadSprite();
    }
    const sprite = await spriteCache;
    const icon = sprite.getElementById(iconName);
    return icon ? icon.outerHTML : undefined;
  }
}

const instance = new SpriteLoader();
export { instance as SpriteLoader };
