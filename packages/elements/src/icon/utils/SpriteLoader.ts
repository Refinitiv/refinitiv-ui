import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
const spriteCache = new Map<string, Promise<Document>>();
class SvgSpriteLoader extends SVGLoader {

  // eslint-disable-next-line
  public async getSrc (name: string): Promise<string> {
    return name ? `https://cdn.ppe.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/sprites/icons.svg#${name}` : '';
    // return name ? `${await this.getCdnPrefix()}#${name}` : '';
  }

  async loadSprite (): Promise<Document> {
    const sprite = await this.loadSVG('sprite/icons');
    if (!sprite) {
      throw new Error("SvgSpriteLoader: couldn't load SVG sprite source");
    }
    return new DOMParser().parseFromString(sprite, 'image/svg+xml');
  }

  private async getIconFragment (spritePromise: Promise<Document> | undefined, iconName: string): Promise<string> {
    const sprite = await spritePromise;
    const icon = sprite?.getElementById(iconName);
    if (!icon) {
      throw new Error("SvgSpriteLoader: couldn't detect icon");
    }
    else {
      return icon.outerHTML;
    }
  }

  public async use (src: string): Promise<string> {
    const { hash, href } = new URL(src);
    const iconName = hash.replace('#', '');
    const cacheKey = href.replace(hash, '');
    if (!iconName) {
      throw new Error("SvgSpriteLoader: couldn't detect SVG icon name");
    }
    if (!spriteCache.has(cacheKey)) {
      spriteCache.set(cacheKey, this.loadSprite());
    }
    return this.getIconFragment(spriteCache.get(cacheKey), iconName);
  }
}
const instance = new SvgSpriteLoader();
const preload = () => instance.loadSVG('sprite/icons');
export { instance as SvgSpriteLoader, preload };
