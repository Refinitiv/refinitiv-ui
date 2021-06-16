import { matches } from '@refinitiv-ui/core';
import { addTooltipCondition } from './tooltip-element';
import { tooltipRenderer } from '../helpers/renderer';

// Support title attribute
Object.defineProperty(HTMLElement.prototype, 'title', {
  get: function () {
    const title = this.getAttribute('title');
    if (title) {
      this.title = title;
    }
    return this.getAttribute('tooltip');
  },
  set: function (value) {
    this.setAttribute('title', '');
    this.setAttribute('tooltip', value);
  }
});

addTooltipCondition(element => matches(element, '[title]'), tooltipRenderer);
