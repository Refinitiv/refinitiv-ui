/**
 * Check if slot has no content
 * @param slot Slot element to check
 * @returns true if slot is empty
 */
const isSlotEmpty = (slot: HTMLSlotElement): boolean => {
  const nodes = slot.assignedNodes() || [];

  // Space characters (e.g. space, tab, EOL) don't count as having content
  return nodes.some(({ nodeType, textContent }) => nodeType === Node.ELEMENT_NODE || textContent && textContent.search(/\S/) >= 0);
};

export {
  isSlotEmpty
};
