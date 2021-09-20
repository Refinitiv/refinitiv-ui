declare type ReadyHandler = (() => void) | undefined;

const callbacks = new Map<string, ReadyHandler[]>();

/**
 * Fires a callback when both element and theme are defined.
 * @param name tag name of the element
 * @param callback callback to execute when both element and theme are ready
 * @returns {void}
 */
export const ready = function (name: string, callback?: ReadyHandler): void {
  const callbackCollection = callbacks.get(name) || [];
  callbackCollection.push(callback);
  if (callbackCollection.length === 2) {
    try {
      callbackCollection.forEach(callback => callback && callback());
    }
    catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
    finally {
      callbacks.delete(name);
    }
  }
  else {
    callbacks.set(name, callbackCollection);
  }
};
