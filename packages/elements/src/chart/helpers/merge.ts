type UnknownObject = {
  [key: string]: unknown
};

/**
 * Merge objects recursively
 *
 * @param {TObject} object The destination object.
 * @param {TObject} sources The source object.
 * @param {boolean} force Force merge if a key of destination object is already exists and a value is not object
 * @param {TObject[]} record The record object which record merged objects recursively
 * @returns voids
 */
const merge = <TObject extends object>(object: TObject, sources: TObject, force = false, record: Array<unknown> = []): void => {
  let value: unknown;
  let isObject: boolean;
  Object.keys(sources).forEach((key, i) => {
    // Get value and info from merging object
    value = Array.isArray(sources) ? sources[i] : sources[key as keyof typeof sources];
    isObject = (value && typeof value === 'object' && value.toString() === '[object Object]') as boolean;

    // Merge if found a new key from source or has a force command
    if (!(key in object) || (force && !isObject)) {
      (object as UnknownObject)[key] = value;
    }

    // Deep merge objects
    if (isObject && !record.includes(value)) {
      record.push(value);
      merge((object as UnknownObject)[key] as TObject, value as TObject, force, record);
    }
  });
};

export { merge };
