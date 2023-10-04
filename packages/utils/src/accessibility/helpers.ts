import { css as litCSS } from 'lit';

/**
 * When multiple ids provided, separate by SPACE
 */
const SEPARATOR = ' ';

/**
 * get a style hiding elements visually with `.visually-hidden` selector.
 * These elements would be available to screen readers only.
 *
 * @param css lit's css literal template tag
 * @returns CSSResult
 */
const visuallyHiddenStyle = (css: typeof litCSS) => {
  return css`
    .visually-hidden {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      margin: -1px;
      border: 0;
      padding: 0;
    }
  `;
};

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

export { textFromElementIds, visuallyHiddenStyle };
