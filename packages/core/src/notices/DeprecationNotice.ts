import { WarningNotice } from './WarningNotice.js';

/**
 * **Deprecation Notice**\
 * Used to show deprecation warnings in the console.
 */
export class DeprecationNotice extends WarningNotice {
  constructor (message: string, supportURL?: string) {
    super(message, supportURL, 'Deprecation');
  }
}
