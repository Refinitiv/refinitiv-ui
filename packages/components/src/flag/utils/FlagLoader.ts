import { SVGLoader } from '@refinitiv-ui/utils/loader.js';

/**
 * Caches and provides flag SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
class FlagLoader extends SVGLoader {}

const flagLoaderInstance = new FlagLoader();

export { flagLoaderInstance as FlagLoader };

/**
 * Helper function to preload set of flags.
 * It could help to reduce flag loading delay when flag has a known set of flags that it can use.
 * @param attrs - list of arguments, representing flags.
 * Could be flag names, complete flag URLs or mix of both.
 * @returns Array of promises, which will be resolved with SVG bodies.
 */
export const preload = (...attrs: string[]): Promise<string | undefined>[] => {
  return attrs.map(flag => flagLoaderInstance.loadSVG(flag));
};
