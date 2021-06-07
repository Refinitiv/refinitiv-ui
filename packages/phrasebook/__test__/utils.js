import {
  Phrasebook
} from '../lib';

/**
 * Phrasebook is a singleton. Just clear private maps for testing purposes
 */
const clearPhrasebook = () => {
  Phrasebook.localeMap = {};
  Phrasebook.observables = new Map();
};

export {
  clearPhrasebook
};
