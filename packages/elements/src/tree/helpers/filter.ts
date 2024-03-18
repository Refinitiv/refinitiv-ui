import escapeStringRegexp from 'escape-string-regexp';

import type { Tree, TreeDataItem } from '../index';
import type { TreeFilter } from './types';

/**
 * Default filter used by tree
 * @param el Tree instance to filter
 * @returns Filter accepting an item
 */
export const defaultFilter = <T extends TreeDataItem = TreeDataItem>(el: Tree<T>): TreeFilter<T> => {
  // reference query string for validating queryRegExp cache state
  let query = '';
  // cache RegExp
  let queryRegExp: RegExp;

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = (): RegExp => {
    if (el.query !== query || !queryRegExp) {
      query = el.query || '';
      queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item): boolean => {
    const label = el.manager.composer.getItemPropertyValue(item, 'label');
    if (!label) {
      return false;
    }

    const regex = getRegularExpressionOfQuery();
    const result = regex.test(label);
    // this regex uses global scope, so the index needs resetting
    regex.lastIndex = 0;
    return result;
  };
};
