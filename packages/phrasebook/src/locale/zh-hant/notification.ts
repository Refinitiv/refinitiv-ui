import { Phrasebook } from '../../translation.js';
import shareTranslate from './shared.js';

const translations = {
  ...shareTranslate
};

Phrasebook.define('zh-Hant', 'ef-notification', translations);

export default translations;
