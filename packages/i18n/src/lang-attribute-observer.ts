/**
 * MutationObserver configuration
 */
const OBSERVER_CONFIG = {
  attributes: true,
  attributeFilter: ['lang']
};

type LangObserverCallback = () => void;

/**
 * An abstract class to observe `lang` attribute changes
 * on element and document element
 */
abstract class LangAttributeObserver {
  private static documentObserver: MutationObserver | null = null;
  private static elements = new WeakMap<HTMLElement, MutationObserver>();
  private static callbacks = new Map<HTMLElement, LangObserverCallback>();

  private static startObserving (element: HTMLElement, callback: LangObserverCallback): MutationObserver {
    const observer = new MutationObserver(() => callback());
    observer.observe(element, OBSERVER_CONFIG);
    return observer;
  }

  private static stopObserving (observer: MutationObserver): void {
    observer.disconnect();
  }

  private static onDocumentLang (): void {
    this.callbacks.forEach(this.documentChangeCallback);
  }

  private static documentChangeCallback (callback: LangObserverCallback, element: HTMLElement): void {
    if (!element.lang) {
      callback();
    }
  }

  /**
   * Start observing `lang` changes on element
   * @param element An element
   * @param callback A callback to run when `lang` has changed
   * @returns {void}
   */
  public static observe (element: HTMLElement, callback: LangObserverCallback): void {
    if (!this.documentObserver) {
      this.documentObserver = this.startObserving(document.documentElement, this.onDocumentLang.bind(this));
    }

    this.callbacks.set(element, callback);

    if (this.elements.has(element)) {
      this.stopObserving(this.elements.get(element) as MutationObserver);
    }

    this.elements.set(element, this.startObserving(element, callback));
  }

  /**
   * Disconnect `lang` element observer from element
   * @param element An element
   * @returns {void}
   */
  public static disconnect (element: HTMLElement): void {
    this.callbacks.delete(element);
    if (!this.callbacks.size && this.documentObserver) {
      this.stopObserving(this.documentObserver);
      this.documentObserver = null;
    }
  }

  /**
   * Get document element lang
   * @returns lang
   */
  public static get documentLang (): string {
    return document.documentElement.lang;
  }
}

export {
  LangObserverCallback,
  LangAttributeObserver
};
