import { CdnLoader, Deferred } from '@refinitiv-ui/utils/loader.js';
const isUrl = (str: string): boolean => (/^https?:\/\//i).test(str);

/**
 * Caches and provides flag SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
class FlagLoader extends CdnLoader {
  private cdnPrefix = new Deferred<string>();

  private _isPrefixSet = false;

  /**
   * @returns {boolean} clarify whether prefix has been set or not.
   */
  public get isPrefixSet (): boolean {
    return this._isPrefixSet;
  }

  /**
   * Sets clarify whether prefix has been set or not
   * @param value - new value that is going to set.
   */
  public set isPrefixSet (value: boolean) {
    if (this._isPrefixSet !== value) {
      this._isPrefixSet = value;
    }
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
      this.isPrefixSet = true;
    }
  }

  /**
   * Creates complete source using CDN prefix and src.
   * Waits for CDN prefix to be set.
   * @param flagName - resource path for download
   * @returns Promise, which will be resolved with complete source.
   */
  public async getSrc (flagName: string): Promise<string> {
    return flagName ? `${await this.getCdnPrefix()}${flagName}.svg` : '';
  }

  public async loadSVG (flag: string): Promise<string | undefined> {
    if (flag) {
      if (!isUrl(flag)) {
        flag = await this.getSrc(flag);
      }
      const response = await this.load(flag);
      if (response && response.status === 200 && response.getResponseHeader('content-type') === 'image/svg+xml') {
        const container = document.createElement('svg');
        container.innerHTML = response.responseText;
        this.stripUnsafeNodes(...container.children);
        const svgRoot = container.firstElementChild as SVGElement | null;
        if (svgRoot) {
          svgRoot.setAttribute('focusable', 'false'); /* disable IE11 focus on SVG root element */
        }
        return Promise.resolve(container.innerHTML);
      }
      return Promise.resolve('');
    }
  }
}

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
