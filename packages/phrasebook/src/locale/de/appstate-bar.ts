import { Phrasebook } from '../../translation.js';
import shareTranslate from './shared.js';

const translations = {
  ...shareTranslate
};

Phrasebook.define('de', 'ef-appstate-bar', translations);

export default translations;
