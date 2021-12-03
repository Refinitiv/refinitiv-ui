import { getElementScope } from '../element.js';
import { textFromElementIds } from './helpers.js';

/**
 * Get element description based on `aria-description` or `aria-describedby`
 * @param element Element to get description for
 * @returns description
 */
const description = (element: HTMLElement): string | null => {
  if (element.hasAttribute('aria-description')) {
    return element.getAttribute('aria-description') || '';
  }

  const rootNode = getElementScope(element);
  if (!rootNode) {
    return null;
  }

  if (element.hasAttribute('aria-describedby')) {
    const ids = element.getAttribute('aria-describedby');
    if (!ids) {
      return null;
    }
    return textFromElementIds(rootNode, ids);
  }

  return null;
};

export {
  description
};
