import { CollectionItem } from './collection-item';

class FlatResult<T> {
  items: T[] = [];
  depths: number[] = [];
}

const RETURN_ZERO = (): 0 => 0;

const isNested = <T extends CollectionItem>(items: T[]): boolean => {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i]?.items?.length) {
      return true;
    }
  }
  return false;
};

const processFlat = <T extends CollectionItem>(items: T[]): FlatResult<T> => {
  const result = new FlatResult<T>();
  result.items = items.slice();
  result.depths = 'fill' in Array.prototype ? Array(result.items.length).fill(0) as number[] : result.items.map(RETURN_ZERO);
  return result;
};

const processNested = <T extends CollectionItem>(items: T[], result = new FlatResult<T>(), depth = 0): FlatResult<T> => {
  // !IMPORTANT: The flattening order should not be modified.
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    result.items.push(item);
    result.depths.push(depth);
    item.items && processNested(item.items, result, depth + 1);
  }
  return result;
};

/**
 * Quickly flattens a deeply nested `CollectionItem` array.
 * @param items Collection of nested items to flatten
 * @return Flattened array of Collection Items
 */
export const flatten = <T extends CollectionItem = CollectionItem>(items: T[]): FlatResult<T> => {
  // Running `isDataNested` on nested data is near instant in most cases.
  // It's also faster to run this check on a large flat structure than it is to process nested by default.
  return isNested(items) ? processNested(items) : processFlat(items);
};
