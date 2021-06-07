import { Phrasebook } from '../../';
import './shared';

const translations = {
  MULTIPLE_ITEMS: '複数項目',
  NO_OPTIONS: '結果がありません'
};

Phrasebook.define('ja', 'ef-combo-box', translations);

export default translations;
