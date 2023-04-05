// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  LANGUAGE: '言語',
  USER_ID: 'ユーザーID',
  PASSWORD: 'パスワード',
  FORGOTTEN_PASSWORD: 'パスワードをお忘れの場合',
  AUTO_SIGN_IN: 'サインインを自動にする',
  SIGN_IN: 'サインイン',
  CONTACT_US: 'お問い合わせ',
  PRIVACY: 'プライバシー'
};

Phrasebook.define('ja', 'ui-pattern-sign-in', translations);

export default translations;
