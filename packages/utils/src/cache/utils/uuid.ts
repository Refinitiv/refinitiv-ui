const dividerIndexes = [4, 7, 10, 13];

const pad = (n: string) => {
  return n.length === 1 ? `0${n}` : `${n}`;
};

const rawtoken = (length = 1024, radix = 16) => {
  const buffer = new Uint8Array(length / 2);
  const numbers = crypto.getRandomValues(buffer);
  return [...numbers].map(n => pad(n.toString(radix)));
};

export const token = (length = 1024) => rawtoken(length).join('');

export const uuid = () => {
  const t = rawtoken(32);
  for (const index of dividerIndexes) {
    t.splice(index, 0, '-');
  }
  return t.join('');
};

export const sid = () => token(4).toUpperCase();

export const sortkey = () => {
  const buffer = new Uint16Array(1);
  const keys = crypto.getRandomValues(buffer);
  let key = keys[0].toString();
  while (key.length < 5) {
    key += 0;
  }
  return `${Date.now()}${key}`;
};
