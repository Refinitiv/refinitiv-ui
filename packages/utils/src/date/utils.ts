/**
 * Pad a number with 0
 * @param number Number to pad
 * @param size Size of end string
 * @returns padded string
 */
const pad = (number: number, size: number): string => {
  let s = `${Math.abs(number)}`;
  while (s.length < size) {
    s = '0' + s;
  }
  return `${number < 0 ? '-' : ''}${s}`;
};

export {
  pad
};
