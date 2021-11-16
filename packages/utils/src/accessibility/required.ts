/**
 * Get element required state based on `required` or `aria-required`
 * @param element Element to get required state for
 * @returns required
 */
const required = (element: HTMLElement): boolean => {
  if (element.hasAttribute('required')) {
    return true;
  }

  if (element.hasAttribute('aria-required')) {
    return element.getAttribute('aria-required') === 'true';
  }

  return false;
};

export {
  required
};
