import { Phrasebook } from '../../translation.js';
import shareTranslate from './shared.js';

const translations = {
  ...shareTranslate
};

Phrasebook.define('ja', 'ef-notification', translations);

export default translations;
