/**
 * extract ef-icon element displaying the icon from ef-tree-item element
 * @param {TreeItem} treeItemEl ef-tree-item element
 * @returns {Icon} ef-icon element
 */
export const getIconPart = (treeItemEl) => treeItemEl.shadowRoot.querySelector('[part="label-icon"]');

/**
 * extract label text content from ef-tree-item element
 * @param {TreeItem} treeItemEl
 * @returns {string} label content
 */
export const getLabelContent = (treeItemEl) => {
  const labelPart = treeItemEl.shadowRoot.querySelector('[part="label"]');
  return labelPart.children[0].textContent;
};

/**
 * callback sorting TreeDataItems for each element equality check
 * It should be pass into Array.sort()
 *
 * @param {TreeDataItem} previousNode
 * @param {TreeDataItem} currentNode
 * @returns
 */
export const sortTreeNode = (previousNode, currentNode) =>
  previousNode.value.localeCompare(currentNode.value);
