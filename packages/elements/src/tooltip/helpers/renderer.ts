import type { TooltipRenderer } from './types';

/**
 * A default renderer that renders `tooltip` or `data-tooltip` attributes
 * @param target Target to check
 * @returns tooltip or null or undefined
 */
const tooltipRenderer: TooltipRenderer = (target: HTMLElement) => {
  if (target.hasAttribute('tooltip') || target.hasAttribute('data-tooltip')) {
    return target.getAttribute('tooltip') || target.getAttribute('data-tooltip');
  }
};

export { tooltipRenderer };
