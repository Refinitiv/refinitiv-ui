import { isElementOverflown } from '@refinitiv-ui/utils/element.js';
import type { TooltipCondition, TooltipRenderer } from './types';
import { addTooltipCondition } from '../elements/tooltip-element.js';

const registry = new WeakMap<HTMLElement, TooltipRenderer>();
const overflowConditionRegistry = new WeakMap<HTMLElement, TooltipCondition>();

/**
 * Default overflow condition
 * @param target Target element
 * @returns true If target has overflow
 */
const defaultOverflowCondition: TooltipCondition = (target) => isElementOverflown(target);

/**
 * Default overflow renderer
 * @param target Target element
 * @returns text Target text content
 */
const defaultOverflowRenderer: TooltipRenderer = (target) => target.textContent;

const overflowCondition: TooltipCondition = (target, paths) => {
  const condition = overflowConditionRegistry.get(target);
  return condition ? condition(target, paths) : false;
};

const tooltipRenderer: TooltipRenderer = (target) => {
  const renderer = registry.get(target);
  return renderer ? renderer(target) : undefined;
};

// Register overflow tooltip element
addTooltipCondition(overflowCondition, tooltipRenderer);

/**
 * Register the element to show a tooltip for overflow content
 * @param target Target element
 * @param [renderer] Optional renderer. By default target `textContent` is returned
 * @param [condition] Optional overflow condition. By default `scrollWidth` compared to `offsetWidth`
 * @returns {void}
 */
const register = (target: HTMLElement, renderer: TooltipRenderer = defaultOverflowRenderer, condition: TooltipCondition = defaultOverflowCondition): void => {
  overflowConditionRegistry.set(target, condition);
  registry.set(target, renderer);
};

/**
 * Deregister the element to stop showing a tooltip for overflow content
 * @param target Target element
 * @returns {void}
 */
const deregister = (target: HTMLElement): void => {
  overflowConditionRegistry.delete(target);
  registry.delete(target);
};

export {
  register,
  deregister
};
