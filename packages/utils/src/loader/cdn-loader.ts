import { Deferred } from './deferred.js';

/**
 * Caches and provides any load results, Loaded either by name from CDN or directly by URL.
 */
export class CDNLoader {

  private _isPrefixSet = false;

  /**
   * Internal response cache
   */
  private responseCache = new Map<string, Promise<Response>>();

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
  private async loadContent (href: string): Promise<Response> {
    try {
      return await fetch(href);
    }
    catch (e) {
      // Failed response...
      this.responseCache.delete(href);
      let errorMessage = '';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      else if (e instanceof Response) {
        errorMessage = e.statusText;
      }
      return Promise.resolve({
        status: 0,
        statusText: errorMessage
      } as Response);
    }
  }

  /**
   * Tries to load an src either by src or by provided URL
   * @param src name or Source location.
   * @returns Promise which will be resolved with response body
   */
  public async load (src: string): Promise<Response | undefined> {
    if (src) {
      if (!this.responseCache.has(src)) {
        this.responseCache.set(src, this.loadContent(src));
      }
      return this.responseCache.get(src);
    }
  }

}
