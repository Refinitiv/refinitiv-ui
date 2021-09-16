import { rng } from './rng';
import { stringify } from './stringify';

const uuid = (): string => {
  const rnds = rng();

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return stringify(rnds);
};

export {
  uuid
};
