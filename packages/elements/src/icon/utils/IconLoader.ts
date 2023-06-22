import { SVGLoader } from '@refinitiv-ui/utils/loader.js';

/**
 * Caches and provides icon SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
class IconLoader extends SVGLoader {}

const iconLoaderInstance = new IconLoader();

export { iconLoaderInstance as IconLoader };

/**
 * Helper function to preload set of icons.
 * It could help to reduce icon loading delay when ef-icon has a known set of icons that it can use.
 * @param attrs - list of arguments, representing icons.
 * Could be icon names, complete icon URLs or mix of both.
 * @returns Array of promises, which will be resolved with SVG bodies.
 */
export const preload = (...attrs: string[]): Promise<string | undefined>[] => {
  return attrs.map(icon => iconLoaderInstance.loadSVG(icon));
};
