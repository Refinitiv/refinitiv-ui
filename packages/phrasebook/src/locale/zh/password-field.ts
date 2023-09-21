import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: '显示密码',
  SHOW_PASSWORD_ON: '显示密码开启，密码可见', // machine translated
  SHOW_PASSWORD_OFF: '显示密码关闭，密码被隐藏' // machine translated
};

Phrasebook.define('zh', 'ef-password-field', translations);

export default translations;
