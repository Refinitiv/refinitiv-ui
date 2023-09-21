import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: '顯示密碼',
  SHOW_PASSWORD_ON: '顯示密碼開啟，密碼可見', // machine translated
  SHOW_PASSWORD_OFF: '顯示密碼關閉，密碼被隱藏' // machine translated
};

Phrasebook.define('zh-Hant', 'ef-password-field', translations);

export default translations;
