import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: 'show password',
  SHOW_PASSWORD_ON: 'show password on, password is visible',
  SHOW_PASSWORD_OFF: 'show password off, password is hidden'
};

Phrasebook.define('en', 'ef-password-field', translations);

export default translations;
