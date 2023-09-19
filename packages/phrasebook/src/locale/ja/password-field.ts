import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD_ON: 'パスワード表示オン, パスワードが表れています',
  SHOW_PASSWORD_OFF: 'パスワード表示オッフ, パスワードが隠れています'
};

Phrasebook.define('ja', 'ef-password-field', translations);

export default translations;
