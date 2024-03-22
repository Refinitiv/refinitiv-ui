export const getIconPart = (element) => element.shadowRoot.querySelector('[part="label-icon"]');

export const getLabelContent = (element) => {
  const labelPart = element.shadowRoot.querySelector('[part="label"]');
  return labelPart.children[0].textContent;
};

export const sortTreeNode = (previousNode, currentNode) =>
  previousNode.value.localeCompare(currentNode.value);
