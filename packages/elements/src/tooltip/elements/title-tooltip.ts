import { matches } from '@refinitiv-ui/core';
import { addTooltipCondition } from './tooltip-element';
import { tooltipRenderer } from '../helpers/renderer';

// Support title attribute
Object.defineProperty(HTMLElement.prototype, 'title', {
  get: function () {
    const title = (this as HTMLElement).getAttribute('title');
    if (title) {
      (this as HTMLElement).title = title;
    }
    return (this as HTMLElement).getAttribute('tooltip');
  },
  set: function (value) {
    (this as HTMLElement).setAttribute('title', '');
    (this as HTMLElement).setAttribute('tooltip', value);
  }
});

addTooltipCondition(element => matches(element, '[title]'), tooltipRenderer);
