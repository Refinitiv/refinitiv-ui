import { WarningNotice } from './WarningNotice.js';
import { MESSAGE_TYPE } from './constants.js';

/**
 * **Deprecation Notice**\
 * Used to show deprecation warnings in the console.
 */
export class DeprecationNotice extends WarningNotice {
  constructor (message: string, supportURL?: string, type = MESSAGE_TYPE.DEPRECATION) {
    super(message, supportURL, type);
  }
}
