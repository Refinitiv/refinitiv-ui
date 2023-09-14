import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  PAGE: '第 {page} 页',
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '第 {page}/{pageTotal} 页'
};

Phrasebook.define('zh', 'ef-pagination', translations);

export default translations;
