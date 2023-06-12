import { SVGLoader } from '@refinitiv-ui/utils/loader.js';
const spriteCache = new Map<string, Promise<Document>>();

/**
 * Checks a string to see if it's a valid URL
 * @param str String to test
 * @returns is URL
 */
const isUrl = (str: string): boolean => (/^(https?:\/{2}|\.?\/)/i).test(str);
class SvgSpriteLoader extends SVGLoader {

  // eslint-disable-next-line
  public async getSrc (name: string): Promise<string> {
    if (isUrl(name)) {
      return name;
    }
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

  private async getIconFragment (spritePromise: Promise<Document> | undefined, iconName: string): Promise<string | undefined> {
    const sprite = await spritePromise;
    const icon = sprite?.getElementById(iconName);
    return icon ? icon.outerHTML : undefined;
  }

  public async use (src: string): Promise<string | undefined> {
    const { hash, href } = new URL(await this.getSrc(src));
    const iconName = hash.replace('#', '');
    const cacheKey = href.replace(hash, '');
    if (!iconName) {
      return;
    }
    if (!spriteCache.has(cacheKey)) {
      spriteCache.set(cacheKey, this.loadSprite());
    }
    return this.getIconFragment(spriteCache.get(cacheKey), iconName);
  }
}
const instance = new SvgSpriteLoader();
export { instance as SvgSpriteLoader };
