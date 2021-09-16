/**
 * Get simplified HTML content of a node.
 * This function is here to avoid issues when
 * lit HTML create comment tags and add scope classes in IE
 * @param {HTMLElement} el Element to get content of
 * @returns {string} html content
 */
const getHTMLContent = (el) => {
  let res = '';

  // exclude unnecessary parts for testing
  for (let i = 0; i < el.childNodes.length; i += 1) {
    const node = el.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE) {
      res += node.textContent;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      res += `<${node.localName}>${getHTMLContent(node)}</${node.localName}>`;
    }
  }

  return res;
};

export {
  getHTMLContent
};
