import {
  Condition,
  Renderer
} from './types';
import {
  addTooltipCondition
} from './tooltip-element';

const registry = new WeakMap<HTMLElement, Renderer>();
const overflowCondition: Condition = (target) => registry.has(target) && (target.scrollWidth - target.offsetWidth) > 1;
const overflowRenderer: Renderer = (target) => target.textContent;

const tooltipRenderer: Renderer = (target) => {
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
const register = (target: HTMLElement, render: Renderer = overflowRenderer): void => {
  registry.set(target, render);
};

export {
  register
};
