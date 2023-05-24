import { addTooltipCondition } from './tooltip-element.js';
import { tooltipRenderer } from '../helpers/renderer.js';

// Support title attribute
Object.defineProperty(HTMLElement.prototype, 'title', {
  get: function (this: HTMLElement) {
    const title = this.getAttribute('title');
    if (title) {
      this.title = title;
    }
    return this.getAttribute('tooltip');
  },
  set: function (this: HTMLElement, value: string) {
    this.setAttribute('title', '');
    this.setAttribute('tooltip', value);
  }
});

addTooltipCondition(element => element.matches('[title]'), tooltipRenderer);
