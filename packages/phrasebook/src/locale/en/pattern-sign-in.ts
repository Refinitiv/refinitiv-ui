// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  LANGUAGE: 'Language',
  USER_ID: 'User ID',
  PASSWORD: 'Password',
  FORGOTTEN_PASSWORD: 'Forgotten your password?',
  AUTO_SIGN_IN: 'Sign me in automatically',
  SIGN_IN: 'Sign In',
  CONTACT_US: 'Contact Us',
  PRIVACY: 'Privacy'
};

Phrasebook.define('en', 'ui-pattern-sign-in', translations);

export default translations;
