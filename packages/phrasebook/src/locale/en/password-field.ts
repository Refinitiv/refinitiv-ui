import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: 'Show password',
  SHOW_PASSWORD_ON: 'Show password on, password is visible',
  SHOW_PASSWORD_OFF: 'Show password off, password is hidden'
};

Phrasebook.define('en', 'ef-password-field', translations);

export default translations;
