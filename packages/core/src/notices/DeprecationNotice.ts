import { WarningNotice } from './WarningNotice';

/**
 * **Deprecation Notice**\
 * Used to show deprecation warnings in the console.
 */
export class DeprecationNotice extends WarningNotice {
  protected type = 'Deprecation';
}
