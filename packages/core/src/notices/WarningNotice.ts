import { Notice } from './Notice.js';
import { MESSAGE_TYPE } from './constants.js';

/**
 * **Warning Notice**\
 * Used to show warning notices in the console.
 */
export class WarningNotice extends Notice {

  constructor (message: string, supportURL?: string, type = MESSAGE_TYPE.WARNING) {
    super(message, supportURL, type);
  }

  public show (): void {
    /* eslint-disable-next-line no-console */
    console.warn(this.message);
    this.shown = true;
  }

}
