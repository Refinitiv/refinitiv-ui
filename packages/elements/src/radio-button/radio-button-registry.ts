// Keeps registration records of radio button group per its name
import type { RadioButton } from './index';

const registry: RadioButton[] = [];

/**
 * Remove radio button from registry
 * @param radio Radio button to remove
 * @returns {void}
 */
const removeFromRegistry = (radio: RadioButton): void => {
  const idx = registry.indexOf(radio);
  if (idx !== -1) {
    registry.splice(idx, 1);
  }
};

/**
 * Add radio button to registry group of radio has a name
 * If radio does not have the name, remove from the group
 * @param radio Radio button to add
 * @param oldGroupName group name of radio button before changed
 * @returns {void}
 */
const applyRegistry = (radio: RadioButton, oldGroupName = ''): void => {
  const isNewRadioButton = registry.indexOf(radio) === -1;
  if (radio.name && isNewRadioButton) {
    registry.push(radio);

    if (registry.length === 1) {
      return;
    }

    // Set tabIndex to -1 if radio either uncheck or not the first radio button in the group.
    const radioGroup = getRadioGroup(radio);
    if (!radio.checked && radioGroup.length > 1) {
      radio.tabIndex = -1;
    }
  }
  else if (!radio.name && !isNewRadioButton) {
    removeFromRegistry(radio);
    radio.tabIndex = 0; // Restore tab Index to be focusable for single mode

    // Re-computed tab index for old radio group was removed from group.
    const oldRadioGroup = registry.filter(radio => radio.name === oldGroupName);
    restoreTabIndex(oldRadioGroup);
  }
  else if (radio.name && !isNewRadioButton) {
    // Re-computed tab index for new radio group when name attribute has changed.
    const newRadioGroup = getRadioGroup(radio);
    if (radio.checked) {
      radio.tabIndex = 0;
      newRadioGroup.forEach(newRadio => {
        if (newRadio !== radio) {
          // uncheck and hide the rest of the group members from focusability
          newRadio.checked = false;
          newRadio.tabIndex = -1;
        }
      });
    }
    else {
      radio.tabIndex = -1;
      restoreTabIndex(newRadioGroup);
    }
    
    // Re-computed tab index for old radio group when name attribute has changed.
    const oldRadioGroup = registry.filter(radio => radio.name === oldGroupName);
    restoreTabIndex(oldRadioGroup);
  }
};

/**
 * Re-computed tab index for the radio group
 * Set tabIndex to 0 for first radio button in the group.
 * Set tabIndex to -1 for the rest of button in group.
 * @param radioGroup collection of radio buttons
 * @returns void
 */
const restoreTabIndex = (radioGroup: RadioButton[]): void => {
  if (!radioGroup.length) {
    return;
  }

  const checkedRadio = radioGroup.filter(radio => radio.checked);
  if (checkedRadio.length) {
    return;
  }
  
  radioGroup.forEach((radio, index) => {
    radio.tabIndex = index === 0 ? 0 : -1;
  });
};

/**
 * Get the group of same name radio buttons
 * @param radio A radio to get a group for
 * @returns collection of radio buttons
 */
const getRadioGroup = (radio: RadioButton): RadioButton[] => {
  if (!registry.includes(radio)) {
    return [];
  }

  const groupName = radio.name;
  return registry.filter(radio => radio.name === groupName);
};

export {
  applyRegistry,
  removeFromRegistry,
  getRadioGroup
};
