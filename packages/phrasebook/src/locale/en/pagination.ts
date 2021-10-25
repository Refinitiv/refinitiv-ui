// Component docs https://elf.int.refinitiv.com/elements/pagination.html
import { Phrasebook } from '../../translation.js';
import './shared.js';

const translations = {
  // page: current page #
  // pageTotal: total number of pages
  PAGE_OF: 'Page {page} of {pageTotal}',
  /*
   * totalCount: total number of items
   * pageSize: Number of items per page
   * ** To translate
   * No items
   * of = eg page 1 of 2
   * item
   * items
   */
  ITEM_INFO: '{totalCount, plural, =0 {No Items} other {{ totalCount, plural, other { {pageSize, plural, =1 {#} other {{from} - {to}}} of {totalCount} {totalCount, plural, =1 {item} other {items}}} }} }'
};

Phrasebook.define('en', 'ef-pagination', translations);

export default translations;
