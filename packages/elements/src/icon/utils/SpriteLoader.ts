import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
const spriteUrl = 'https://cdn.ppe.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/sprites/icons.svg';
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

  private async getIconFragment (spritePromise: Promise<Document> | undefined, iconName: string): Promise<string | undefined> {
    const sprite = await spritePromise;
    const icon = sprite?.getElementById(iconName);
    return icon ? icon.outerHTML : undefined;
  }

  public async loadSpriteSVG (iconName: string): Promise<string | undefined> {
    if (!iconName) {
      return;
    }
    if (!spriteCache) {
      spriteCache = this.loadSprite();
    }
    return this.getIconFragment(spriteCache, iconName);
  }
}

const instance = new SvgSpriteLoader();
export { instance as SvgSpriteLoader };
