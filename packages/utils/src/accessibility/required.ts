/**
 * Get element required state based on `aria-required`
 * @param element Element to get required state for
 * @returns required
 */
const required = (element: HTMLElement): boolean => {
  if (element.hasAttribute('aria-required')) {
    return element.getAttribute('aria-required') === 'true';
  }

  return false;
};

export {
  required
};
