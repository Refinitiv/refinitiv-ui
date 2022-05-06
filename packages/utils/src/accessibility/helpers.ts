/**
 * When multiple ids provided, separate by SPACE
 */
const SEPARATOR = ' ';

/**
 * Get innerText from element ids
 * @param rootNode Root node
 * @param ids Space separated string of ids, e.g. id1 id2 id3
 * @returns combined text
 */
const textFromElementIds = (rootNode: Document | DocumentFragment, ids: string): string => {
  const labels = [];
  const elementIds = ids.split(SEPARATOR);
  for (let i = 0; i < elementIds.length; i += 1) {
    const element = rootNode.getElementById(elementIds[i]);
    if (element) {
      // Get text from aria-label if available
      if (element.hasAttribute('aria-label')) {
        labels.push(element.getAttribute('aria-label') || '');
        continue;
      }

      labels.push(element.textContent || '');
    }
  }

  return labels.join(SEPARATOR);
};

export {
  textFromElementIds
};
