import { Phrasebook } from '../../translation.js';
import sharedTranslation from './shared.js';

const translations = {
  ...sharedTranslation
};

Phrasebook.define('en', 'ef-pill', translations);

export default translations;
