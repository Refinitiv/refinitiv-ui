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
 * @param oldGroupName Radio button to add
 * @returns {void}
 */
const applyRegistry = (radio: RadioButton, oldGroupName = ''): void => {
  const idx = registry.indexOf(radio);
  if (radio.name && idx === -1) {
    registry.push(radio);

    if (registry.length < 1) {
      return;
    }
    // Set tabIndex = -1 for the rest of button in group if one of button in group is checked.
    // This will allow checked button of group to be focusable and navigable.
    const radioGroup = getRadioGroup(radio);
    if (radioGroup.length > 1) {
      const checkedRadio = radioGroup.filter(radio => radio.checked);
      if (checkedRadio.length) {
        radioGroup.forEach(radio => {
          if (!radio.checked) {
            radio.tabIndex = -1;
          }
        });
      }
    }
  }
  else if (!radio.name && idx !== -1) {
    removeFromRegistry(radio);
    radio.tabIndex = 0; // Reset tabIndex to be focusable for individual button

    // Set tabIndex = 0 for the rest of button in group if checked button in the group was removed.
    // This will allow first button of group to be focusable and navigable.
    if (!radio.checked) {
      return;
    }
    const radioGroup = registry.filter(radio => radio.name === oldGroupName);
    if (radioGroup.length) {
      radioGroup.forEach(radio => {
        radio.tabIndex = 0;
      });
    }
  }
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
