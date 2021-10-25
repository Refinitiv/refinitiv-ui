// see https://github.com/formatjs/formatjs/tree/main/packages/intl-format-cache
// to understand more why memoiser is required
import IntlMessageFormat from 'intl-messageformat';
import memoizeFormatConstructor from 'intl-format-cache';
import type {
  TranslateOptions,
  TranslateMessage,
  MessageFormats,
  MessageOptions
} from './types';

type MemoiseRecordKey = {
  [key: string]: IntlMessageFormat;
};

type MemoiseRecord = {
  formatter: (...args: ConstructorParameters<typeof IntlMessageFormat>) => IntlMessageFormat;
  keys: MemoiseRecordKey;
  time: number;
};

type MemoiseMap = {
  [key: string]: MemoiseRecord;
}

abstract class Memoiser {
  /**
  * There is no right answer when to delete memoised function
  * To crete a new intl object is expensive, as well as to keep all memoised functions in memory
  * might not be what the developer want
  * Therefore set a timer and delete memoised function if not in use
  */
  private static Timeout: number = 30 * 60 * 1000; // 30 minutes
  private static interval: number | null = null; /* used to run through map to clean it */
  private static memoiseMap: MemoiseMap = {};

  private static getMemoiseKey (scope: string, locale: string): string {
    return `${scope}|${locale}`;
  }

  private static clearRecord (memoiseKey: string): void {
    delete this.memoiseMap[memoiseKey];
  }

  private static setInterval (): void {
    if (this.interval === null) {
      this.interval = window.setInterval(() => this.intervalCallback(), this.Timeout);
    }
  }

  private static intervalCallback (): void {
    const now = Date.now();
    let memoiseKey: string;
    for (memoiseKey in this.memoiseMap) {
      const { time } = this.memoiseMap[memoiseKey];
      if (now - time > this.Timeout) {
        this.clearRecord(memoiseKey);
      }
    }
    if (!this.hasRecords()) {
      this.clearInterval();
    }
  }

  private static clearInterval (): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private static hasRecords (): boolean {
    return Object.keys(this.memoiseMap).length > 0;
  }

  /**
   * Get IntlMessageFormat memoised function
   * @param scope Scope
   * @param locale Locale
   * @param key Key
   * @param message Message
   * @param [formats] Override Formats
   * @param [opts] Options
   * @returns IntlMessageFormat
   */
  private static get (scope: string, locale: string, key: string, message: TranslateMessage, formats?: MessageFormats, opts?: MessageOptions): IntlMessageFormat {
    const memoiseKey = this.getMemoiseKey(scope, locale);
    let memoised = this.memoiseMap[memoiseKey];

    // set the formatter first
    if (!memoised) {
      memoised = {
        formatter: memoizeFormatConstructor(IntlMessageFormat),
        keys: {},
        time: 0
      };

      this.memoiseMap[memoiseKey] = memoised;
    }

    // keys collection stores all memoised keys
    const { keys, formatter } = memoised;
    let format = keys[key];

    if (!format) {
      format = formatter(message, locale, formats, opts);
      keys[key] = format;
    }

    // reset self timeout
    memoised.time = Date.now();
    this.setInterval();

    return format;
  }

  /**
   * Clear all cached records
   * @param scope Scope
   * @param locale Local
   * @returns {void}
   */
  public static clear (): void {
    this.memoiseMap = {};
    this.clearInterval();
  }

  /**
   * Delete cached record
   * @param scope Scope
   * @param locale Local
   * @returns {void}
   */
  public static delete (scope: string, locale: string): void {
    const memoiseKey = this.getMemoiseKey(scope, locale);
    this.clearRecord(memoiseKey);

    if (!this.hasRecords()) {
      this.clearInterval();
    }
  }

  /**
   * Get a formatted localised string
   * @param scope Scope
   * @param locale Locale
   * @param key Key
   * @param message Message
   * @param [options] Additional options to format the string
   * @param [formats] Optional object with user defined options for format styles.
   * @param [opts] Optional options.
   * - formatters: Map containing memoized formatters for performance.
   * - ignoreTag: Whether to treat HTML/XML tags as string literal instead of parsing them as tag token. When this is false we only allow simple tags without any attributes
   * @returns formatted message
   */
  public static format (scope: string, locale: string, key: string, message: TranslateMessage, options?: TranslateOptions, formats?: MessageFormats, opts?: MessageOptions): string {
    const intlMessage = this.get(scope, locale, key, message, formats, opts);
    return String(intlMessage.format(options)); /* need casting as default return is unknown */
  }
}

export {
  Memoiser
};
