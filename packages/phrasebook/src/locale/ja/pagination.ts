// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../';
import './shared';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: '{pageTotal} ページ中 {page} ページ目 ',
  /*
   * totalCount: total number of items
   * pageSize: Number of items per page
   * ** To translate
   * No items
   * of = eg page 1 of 2
   * item
   * items
   */
  ITEM_INFO: '{totalCount, plural, =0 {該当なし} other {{ totalCount, plural, other { {totalCount} {totalCount, plural, =1 { 件} other { 件}}中 {pageSize, plural, =1 {#} other {{from} - {to}}} 件目 } }} }'
};

Phrasebook.define('ja', 'ef-pagination', translations);

export default translations;
