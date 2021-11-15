// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '第 {page}/{pageTotal} 页'
};

Phrasebook.define('zh', 'ef-pagination', translations);

export default translations;
