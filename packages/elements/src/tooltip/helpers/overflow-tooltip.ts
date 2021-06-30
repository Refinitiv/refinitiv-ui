import { TooltipCondition, TooltipRenderer } from './types';
import { addTooltipCondition } from '../elements/tooltip-element';

const registry = new WeakMap<HTMLElement, TooltipRenderer>();
const overflowCondition: TooltipCondition = (target) => registry.has(target) && (target.scrollWidth - target.offsetWidth) > 1;
const overflowRenderer: TooltipRenderer = (target) => target.textContent;

const tooltipRenderer: TooltipRenderer = (target) => {
  const renderer = registry.get(target);
  return renderer ? renderer(target) : undefined;
};

addTooltipCondition(overflowCondition, tooltipRenderer);

/**
 * Register the element to show a tooltip for overflow content
 * @param target Target element
 * @param [render] Optional renderer. By default target `textContent` is returned
 * @returns {void}
 */
const register = (target: HTMLElement, render: TooltipRenderer = overflowRenderer): void => {
  registry.set(target, render);
};

export {
  register
};
