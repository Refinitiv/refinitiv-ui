import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: 'パスワード表示',
  SHOW_PASSWORD_ON: 'パスワード表示オン、パスワードが表示されています',
  SHOW_PASSWORD_OFF: 'パスワード表示オフ、パスワードは表示されていません'
};

Phrasebook.define('ja', 'ef-password-field', translations);

export default translations;
