// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues: false | (<T extends Uint8Array | Int8Array | Int16Array | Int32Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T) => T);
const rnds8 = new Uint8Array(16);

declare global {
  interface Window {
    msCrypto: Crypto;
  }
}

const rng = (): Uint8Array => {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof window.msCrypto !== 'undefined' && typeof window.msCrypto.getRandomValues === 'function' && window.msCrypto.getRandomValues.bind(window.msCrypto);
  }

  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported.');
  }

  return getRandomValues(rnds8);
};

export {
  rng
};
