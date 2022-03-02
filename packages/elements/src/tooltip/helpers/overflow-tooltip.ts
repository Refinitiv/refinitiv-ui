import type { TooltipCondition, TooltipRenderer } from './types';
import { addTooltipCondition } from '../elements/tooltip-element.js';

const registry = new WeakMap<HTMLElement, TooltipRenderer>();
const overflowRegistry = new WeakMap<HTMLElement, HTMLElement>();
const overflowCondition: TooltipCondition = (target) => {
  const overflowTarget = overflowRegistry.get(target);
  return !!overflowTarget && (overflowTarget.scrollWidth - overflowTarget.offsetWidth) > 1;
};
const overflowRenderer: TooltipRenderer = (target) => {
  const overflowTarget = overflowRegistry.get(target);
  return overflowTarget ? overflowTarget.textContent : '';
};

const tooltipRenderer: TooltipRenderer = (target) => {
  const renderer = registry.get(target);
  return renderer ? renderer(target) : undefined;
};

addTooltipCondition(overflowCondition, tooltipRenderer);

/**
 * Register the element to show a tooltip for overflow content
 * @param target Target element
 * @param [render] Optional renderer. By default target `textContent` is returned
 * @param [overflowTarget=target] Optional overflow target. By default is the same as `target`
 * @returns {void}
 */
const register = (target: HTMLElement, render: TooltipRenderer = overflowRenderer, overflowTarget = target): void => {
  overflowRegistry.set(target, overflowTarget);
  registry.set(target, render);
};

export {
  register
};
