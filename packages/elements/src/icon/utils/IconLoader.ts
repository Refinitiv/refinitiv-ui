import { SVGLoader } from '@refinitiv-ui/utils/loader.js';

/**
 * Caches and provides icon SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
class IconLoader extends SVGLoader {}

const iconLoaderInstance = new IconLoader();

export { iconLoaderInstance as IconLoader };
