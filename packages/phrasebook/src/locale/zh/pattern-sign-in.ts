// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  LANGUAGE: '语言',
  USER_ID: '账号',
  PASSWORD: '密码',
  FORGOTTEN_PASSWORD: '忘记密码',
  AUTO_SIGN_IN: '自动登录',
  SIGN_IN: '登录',
  CONTACT_US: '联系我们',
  PRIVACY: '隐私'
};

Phrasebook.define('zh', 'ui-pattern-sign-in', translations);

export default translations;
