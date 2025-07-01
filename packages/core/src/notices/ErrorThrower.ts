export class ErrorThrower {
  /**
   * Static list to track if any error message has been shown
   * across the entire application session
   */
  private static shownErrors = new Set<string>();

  /**
   * The message to be used for the error notice.
   */
  protected message: string;

  /**
   * Create an error notice to show in the console.
   * @param message Error message to show in the console
   */
  constructor(message: string) {
    this.message = message;
  }

  /**
   * Checks if this error has been shown already
   * @returns {boolean} True if the error has been shown
   */
  public isShown(): boolean {
    return ErrorThrower.shownErrors.has(this.message);
  }

  /**
   * Shows the error notice and marks it as shown
   * @returns {void}
   */
  public throw(): void {
    ErrorThrower.shownErrors.add(this.message);
    throw new Error(this.message);
  }

  /**
   * Shows the error notice only once per application session
   * @returns {void}
   */
  public once(): void {
    if (!this.isShown()) {
      this.throw();
    }
  }
}
