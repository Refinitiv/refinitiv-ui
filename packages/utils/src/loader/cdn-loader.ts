import { Deferred } from './deferred';

/**
 * Caches and provides any load results, Loaded either by name from CDN or directly by URL.
 */
export class CDNLoader {

  private _isPrefixSet = false;

  /**
   * Internal response cache
   */
  private responseCache = new Map<string, Promise<XMLHttpRequest>>();

  /**
   * CDN prefix to prepend to src
   */
  private cdnPrefix = new Deferred<string>();

  /**
   * @returns {boolean} clarify whether prefix has been set or not.
   */
  public get isPrefixSet (): boolean {
    return this._isPrefixSet;
  }

  /**
   * @returns promise, which will be resolved with CDN prefix, once set.
   */
  public getCdnPrefix (): Promise<string> {
    return this.cdnPrefix.promise;
  }

  /**
   * Sets CDN prefix to load source.
   * Resolves deferred promise with CDN prefix and sets src used to check whether prefix is already set or not.
   * @param prefix - CDN prefix.
   * @returns {void}
   */
  public setCdnPrefix (prefix: string): void {
    if (prefix) {
      this.cdnPrefix.resolve(prefix);
      this._isPrefixSet = true;
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
