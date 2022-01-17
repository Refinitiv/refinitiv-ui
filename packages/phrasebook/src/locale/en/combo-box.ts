import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  MULTIPLE_ITEMS: 'Multiple items',
  NO_OPTIONS: 'No results found.',
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {One Selected.} other {# Selected.}}'
};

Phrasebook.define('en', 'ef-combo-box', translations);

export default translations;
