import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
let spriteCache: Promise<Document> | undefined;
class SpriteLoader extends SVGLoader {
  
  public async getSrc (name: string): Promise<string> {
    return name ? `${await this.getCdnPrefix()}#${name}` : '';
  }

  private async loadSprite (): Promise<Document> {
    const sprite = await this.loadSVG('sprite/icons');
    if (!sprite) {
      throw new Error("SpriteLoader: couldn't load SVG sprite source");
    }
    return new DOMParser().parseFromString(sprite, 'image/svg+xml');
  }

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
