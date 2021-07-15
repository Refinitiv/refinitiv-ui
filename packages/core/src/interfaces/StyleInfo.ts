import { CSSValue } from '../types/base';

/**
 * Used to add and remove CSS properties
 */
export interface StyleInfo {
  [key: string]: CSSValue | null | undefined;
}
