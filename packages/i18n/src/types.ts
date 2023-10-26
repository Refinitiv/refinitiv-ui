import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
import { Formats, Options } from 'intl-messageformat';

type TranslateOptions = {
  [key: string]: unknown;
};

type TranslateMessage = string | MessageFormatElement[]; //
type MessageFormats = Partial<Formats>;
type MessageOptions = Options;

/**
 * BCP 47 unicode extensions.
 * Check http://unicode.org/reports/tr35/ for full list of extensions
 */
type UnicodeExtensions = {
  /**
   * Numbering system
   * For instance: 'thai', 'roman', 'latn'
   */
  nu?: string;
  /**
   * Calendar
   * For instance: 'iso8601', 'gregory', 'persian'
   */
  ca?: string;
  /**
   * Hour cycle
   * For instance: 'h11', 'h12', 'h23', 'h24'
   */
  hc?: string;

  /**
   * Custom extensions, like:
   * cf - currency format
   * cu - currency type
   * em - emoji style
   * and many others
   */
  [key: string]: string | undefined;
};

/**
 * Translate parameters
 */
type TranslateParams = {
  /**
   * BCP 47 unicode extensions
   */
  unicodeExtensions?: UnicodeExtensions;
  /**
   * Intl.IntlMessageFormat optional object with user defined options for format styles.
   * e.g. to define custom date formatter, to be used with {{ date, date, calendar }}
   * date: { calendar: { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC', calendar: 'gregory' } }
   *
   * See more: https://formatjs.io/docs/intl-messageformat
   */
  formats?: MessageFormats;
  /**
   * Intl.IntlMessageFormat optional options.
   * - formatters: Map containing memoized formatters for performance.
   * - ignoreTag: Whether to treat HTML/XML tags as string literal instead of parsing them as tag token.
   * When this is false we only allow simple tags without any attributes
   *
   * See more: https://formatjs.io/docs/intl-messageformat
   */
  options?: MessageOptions;
};

export {
  TranslateOptions,
  TranslateParams,
  TranslateMessage,
  UnicodeExtensions,
  MessageFormats,
  MessageOptions
};
