// Component docs https://ui.refinitiv.com/elements/pagination
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  PAGE: '第 {page}頁',
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '第 {page}頁/共{pageTotal} 頁'
};

Phrasebook.define('zh-Hant', 'ef-pagination', translations);

export default translations;
