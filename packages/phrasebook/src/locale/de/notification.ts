import { Phrasebook } from '../../translation.js';
import shareTranslate from './shared.js';

const translations = {
  ...shareTranslate
};

Phrasebook.define('de', 'ef-notification', translations);

export default translations;
