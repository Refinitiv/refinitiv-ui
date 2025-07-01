export class ErrorThrower {
  /**
   * Static list to track if any error message has been shown
   * across the entire application session
   */
  private static readonly shownErrors = new Set<string>();

  /**
   * Checks if this error has been shown already
   * @param {string} message The error message to check
   * @returns {boolean} True if the error has been shown
   */
  public isShown(message: string): boolean {
    return ErrorThrower.shownErrors.has(message);
  }

  /**
   * Shows the error notice and marks it as shown
   * @param {string} message The error message to throw
   * @returns {void}
   */
  public throw(message: string): void {
    ErrorThrower.shownErrors.add(message);
    throw new Error(message);
  }

  /**
   * Shows the error notice only once per application session
   * @param {string} message The error message to throw
   * @returns {void}
   */
  public once(message: string): void {
    if (!this.isShown(message)) {
      this.throw(message);
    }
  }
}
