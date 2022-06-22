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
   * Type of notice
   */
  protected type = 'Information';

  /**
   * The message to be used for the
   * warning notice.
   */
  protected value: string;

  /**
   * Support URL for more information
   */
  protected supportURL: string | undefined;

  /**
   * Full message combines type, message and supportURL
   */
  protected get message (): string {
    return generateMessage(this.type, this.message, this.supportURL);
  }

  /**
   * Create a warning notice to show in the console.
   * @param value Warning message to show in the console
   * @param supportURL Support URL to show additional information
   */
  constructor (value: string, supportURL?: string) {
    this.value = value;
    this.supportURL = supportURL;
  }

  /**
   * Shows the warning notice in the console
   * @returns {void}
   */
  public show (): void {
    /* eslint-disable-next-line no-console */
    console.info(this.message);
    this.shown = true;
  }
  
  /**
   * Shows the warning notice only once
   * @returns {void}
   */
  public once (): void {
    if (!this.shown) {
      this.show();
    }
  }
}
