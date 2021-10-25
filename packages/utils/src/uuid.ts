const lengths = [8, 4, 4, 4, 12];

const hex = () => {
  const n = Math.round(Math.random() * 255);
  const h = n.toString(16);
  return h.length === 1 ? '0' + h : h;
};

/**
 * Creates an insecure v4 uuid.
 * @returns v4 uuid string
 */
const uuid = (): string => {
  const chunks: string[] = [];
  for (let i = 0; i < lengths.length; i++) {
    let chunk = '';
    while (chunk.length < lengths[i]) {
      chunk += hex();
    }
    chunks.push(chunk);
  }
  return chunks.join('-');
};

export {
  uuid
};
