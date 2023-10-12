import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: 'Kennwort anzeigen',
  SHOW_PASSWORD_ON: 'Passwort anzeigen ein, Passwort wird angezeigt',
  SHOW_PASSWORD_OFF: 'Passwort anzeigen aus, Passwort wird ausgeblendet'
};

Phrasebook.define('de', 'ef-password-field', translations);

export default translations;
