import escapeStringRegexp from 'escape-string-regexp';

import { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';

import type { ItemData } from '../../item';
import type { ComboBox } from '../index';
import type { ComboBoxFilter } from './types';

/**
 * Default filter used by combo box
 * @param el ComboBox instance to filter
 * @returns Filter accepting an item
 */
export const createDefaultFilter = <T extends DataItem = ItemData>(el: ComboBox<T>): ComboBoxFilter<T> => {
  // reference query string for validating queryRegExp cache state
  let query = '';
  // cache RegExp
  let queryRegExp: RegExp | undefined;

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = (): RegExp => {
    if (el.query !== query || !queryRegExp) {
      query = el.query ?? '';
      queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item, context?): boolean => {
    let label: string;
    if (context) {
      const composer = context instanceof CollectionComposer ? context : context.composer;
      label = composer.getItemPropertyValue(item, 'label') as string;
    } else {
      label = item.label as string;
    }

    const regex = getRegularExpressionOfQuery();
    const result = regex.test(label);
    // this example uses global scope, so the index needs resetting
    regex.lastIndex = 0;
    return result;
  };
};
