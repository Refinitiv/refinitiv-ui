// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../';
import './shared';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '第 {page}/{pageTotal} 页',
  /*
   * totalCount: total number of items
   * pageSize: Number of items per page
   * ** To translate
   * No items
   * of = eg page 1 of 2
   * item
   * items
   */
  ITEM_INFO: '{totalCount, plural, =0 {无项目。} other {{ totalCount, plural, other { {pageSize, plural, =1 {#} other {{from} - {to}}} 项，共 {totalCount} {totalCount, plural, =1 {项} other {项}}} }} }'
};

Phrasebook.define('zh', 'ef-pagination', translations);

export default translations;
