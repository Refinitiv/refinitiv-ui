import { MESSAGE_TYPE } from './constants.js';

const generateMessage = (type: string, message: string, supportURL?: string): string =>
  `${type} notice:\n${!supportURL ? message : `${message}\n\n${supportURL}\n`}`;

/**
 * **Notice**\
 * Used to show notices in the console.
 */
export class Notice {
  /**
   * Flag used to check whether the notice has
   * already been shown in the console.
   */
  public shown = false;

  /**
   * The message to be used for the
   * warning notice.
   */
  protected message: string;

  /**
   * Create a warning notice to show in the console.
   * @param message Warning message to show in the console
   * @param supportURL Support URL to show additional information
   * @param type Type of Notice to show at top of message
   */
  constructor(message: string, supportURL?: string, type = MESSAGE_TYPE.NOTICE) {
    this.message = generateMessage(type, message, supportURL);
  }

  /**
   * Shows the warning notice in the console
   * @returns {void}
   */
  public show(): void {
    /* eslint-disable-next-line no-console */
    console.info(this.message);
    this.shown = true;
  }

  /**
   * Shows the warning notice only once
   * @returns {void}
   */
  public once(): void {
    if (!this.shown) {
      this.show();
    }
  }
}
