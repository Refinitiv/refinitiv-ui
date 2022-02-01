/**
 * Caches and provides any load results, Loaded either by name from CDN or directly by URL.
 */
export class CdnLoader {

  private responseCache = new Map<string, Promise<XMLHttpRequest>>();

  /**
   * Strips any unsafe nodes from the response.
   * Prevents any external attacks from malicious scripts
   * and other hijack methods. Only keeps SVGGraphicsElements.
   * @param elements COllection of nodes
   * @returns {void}
   */
  protected stripUnsafeNodes (...elements: Node[]): void {
    for (const el of elements) {
      // Type of SVGGraphicsElement?
      if (el instanceof SVGElement && 'getBBox' in el) {
        this.stripUnsafeNodes(...(el as SVGElement).childNodes);
      }
      else {
        el.parentNode?.removeChild(el);
      }
    }
  }

  /**
   * Asynchronously tries to load
   * @param href The location of the SVG to load
   * @returns Promise of the SVG body
   */
  private async loadContent (href: string): Promise<XMLHttpRequest> {
    try {
      const response = await this.xmlRequest(href);
      return response;
    }
    catch (e) {
      // Failed response...
      this.responseCache.delete(href);
      return Promise.resolve({
        status: 0, response: 'Failed to make request', responseText: 'Failed to make request'
      } as XMLHttpRequest);
    }
  }

  /**
   * Load and support on IE
   * @param href The source or location
   * @returns XMLHttpRequest objects after to interact servers.
   */
  private async xmlRequest (href: string): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', href);
      xhr.onload = (): void => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr);
        }
        else {
          reject(xhr);
        }
      };
      xhr.onerror = (): void => reject(xhr);
      xhr.send();
    });
  }

  /**
   * Tries to load an src either by src or by provided URL
   * @param src name or Source location.
   * @returns Promise which will be resolved with response body
   */
  public async load (src: string): Promise<XMLHttpRequest | undefined> {
    if (src) {
      if (!this.responseCache.has(src)) {
        this.responseCache.set(src, this.loadContent(src));
      }
      return this.responseCache.get(src);
    }
  }

}
