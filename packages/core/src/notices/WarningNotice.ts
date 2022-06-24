import { Notice } from './Notice.js';

/**
 * **Warning Notice**\
 * Used to show warning notices in the console.
 */
export class WarningNotice extends Notice {

  constructor (message: string, supportURL?: string, type = 'Warning') {
    super(message, supportURL, type);
  }

  public show (): void {
    /* eslint-disable-next-line no-console */
    console.warn(this.message);
    this.shown = true;
  }

}
