import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: '顯示密碼',
  SHOW_PASSWORD_ON: '密碼顯示開啟，密碼可見',
  SHOW_PASSWORD_OFF: '密碼顯示關閉，密碼被隱藏'
};

Phrasebook.define('zh-Hant', 'ef-password-field', translations);

export default translations;
