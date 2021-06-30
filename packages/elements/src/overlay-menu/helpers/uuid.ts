import { uuid } from '@refinitiv-ui/utils';

const id = uuid();
let counter = 0;

/**
 * Get a semi-unique id
 * This is probably the fastest way to do it
 * @returns an id
 */
const getId = (): string => {
  counter += 1;
  return `${id}${counter}`;
};

export {
  getId
};
