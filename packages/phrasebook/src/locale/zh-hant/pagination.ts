// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '第 {page}頁/共{pageTotal} 頁',
  /*
   * totalCount: total number of items
   * pageSize: Number of items per page
   * ** To translate
   * No items
   * of = eg page 1 of 2
   * item
   * items
   */
  ITEM_INFO: '{totalCount, plural, =0 {無項目} other {{ totalCount, plural, other { {pageSize, plural, =1 {#} other {{from} - {to}}} 項，共 {totalCount} {totalCount, plural, =1 {項} other {項}}} }} }'
};

Phrasebook.define('zh-Hant', 'ef-pagination', translations);

export default translations;
