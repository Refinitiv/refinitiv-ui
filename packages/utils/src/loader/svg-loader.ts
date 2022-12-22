import { DistributedCache } from '../cache.js';
import { CDNLoader } from './cdn-loader.js';

const cache = new DistributedCache('svg-loader', { storage: 'indexeddb' });

/**
 * Checks a string to see if it's a valid URL
 * @param str String to test
 * @returns is URL
 */
const isUrl = (str: string): boolean => (/^(https?:\/{2}|\.?\/)/i).test(str);

/**
 * Strips any event attributes which could be used to
 * maliciously hijack the application.
 * @param element Element to check
 * @returns {void}
 */
const stripUnsafeAttributes = (element: SVGElement): void => {
  const attributes = element.getAttributeNames();
  for (const attribute of attributes) {
    // Remove event attributes e.g., `onclick`
    if (attribute.startsWith('on')) {
      element.removeAttribute(attribute);
    }
  }
};

/**
 * Strips any unsafe nodes from the response.
 * Prevents any external attacks from malicious scripts
 * and other hijack methods. Only keeps SVGGraphicsElements.
 * @param elements COllection of nodes
 * @returns {void}
 */
const stripUnsafeNodes = (...elements: Node[]): void => {
  for (const el of elements) {
    // Type of SVGGraphicsElement?
    if (el instanceof SVGElement && 'getBBox' in el) {
      stripUnsafeAttributes(el);
      stripUnsafeNodes(...(el as SVGElement).childNodes);
    }
    else {
      el.parentNode?.removeChild(el);
    }
  }
};

/**
 * Checks to see whether the response is a valid SVG response
 * @param response Request response to test
 * @returns Is valid SVG
 */
const isValidResponse = (response: Response | undefined): response is Response => {
  const isSVG = Boolean(response?.headers.get('content-type')?.startsWith('image/svg+xml'));
  return Boolean(response) && Boolean(response?.ok) && response?.status === 200 && isSVG;
};

/**
 * Extracts and sanitizes any valid SVG from response.
 * @param response Response to extract SVG from
 * @returns SVG result or null
 */
const extractSafeSVG = async (response: Response | undefined): Promise<SVGElement | null> => {
  if (isValidResponse(response)) {
    // clone to support preload to prevent locked response
    const responseText = await response.clone().text();
    const svgDocument = new window.DOMParser().parseFromString(responseText, 'image/svg+xml');
    const svg = svgDocument.children[svgDocument.children.length - 1];
    if (svg instanceof SVGElement) {
      stripUnsafeNodes(svg);
      return svg;
    }
  }
  return null;
};

/**
 * Caches and provides SVGs, loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
export class SVGLoader extends CDNLoader {
  /**
   * Creates complete source using CDN prefix and src.
   * Waits for CDN prefix to be set.
   * @param name - resource path for download
   * @returns Promise, which will be resolved with complete source.
   */
  public async getSrc (name: string): Promise<string> {
    if (isUrl(name)) {
      return name;
    }
    return name ? `${await this.getCdnPrefix()}${name}.svg` : '';
  }

  /**
   * Tries to load an SVG icon from CDN
   * @param src name or Source location.
   * @returns Promise which will be resolved with SVG
   */
  public async loader (src: string): Promise<string | undefined> {
    const response = await this.load(src);
    const svg = extractSafeSVG(response);
    return svg?.outerHTML;
  }

  /**
   * Loads icon and returns the body of the SVG
   * @param name Name of SVG to load
   * @returns SVG body of the response
   */
  public async loadSVG (name: string): Promise<string | undefined> {
    if (!name) {
      return;
    }
    const src = await this.getSrc(name);
    // Get data from cache
    const cacheItem = await cache.get(src);
    if (cacheItem) {
      return cacheItem;
    }
    // Get loader promise
    const data = this.loader(src);
    // Set data to cache
    await cache.set(src, data);
    return data;
  }
}
