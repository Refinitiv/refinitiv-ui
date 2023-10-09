import { Phrasebook } from '../../translation.js';

const translations = {
  SHOW_PASSWORD: '显示密码',
  SHOW_PASSWORD_ON: '密码显示开启，密码可见',
  SHOW_PASSWORD_OFF: '密码显示关闭，密码被隐藏'
};

Phrasebook.define('zh', 'ef-password-field', translations);

export default translations;
