import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: 'Kennwort anzeigen',
  SHOW_PASSWORD_ON: 'Kennwort anzeigen am, Kennwort ist sichtbar', // machine translated
  SHOW_PASSWORD_OFF: 'Kennwort anzeigen aus, Kennwort ist ausgeblendet' // machine translated
};

Phrasebook.define('de', 'ef-password-field', translations);

export default translations;
