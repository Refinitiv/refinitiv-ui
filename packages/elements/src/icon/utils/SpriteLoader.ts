import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
const spriteUrl = 'https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/sprites/icons.svg';
let spriteCache: Promise<Document> | undefined;
class SvgSpriteLoader extends SVGLoader {
  // eslint-disable-next-line
  public async getSrc (name: string): Promise<string> {
    return name ? `${spriteUrl}#${name}` : '';
  }

  private async loadSprite (): Promise<Document> {
    const sprite = await this.loadSVG('sprite/icons');
    if (!sprite) {
      throw new Error("SvgSpriteLoader: couldn't load SVG sprite source");
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

const instance = new SvgSpriteLoader();
export { instance as SvgSpriteLoader };
