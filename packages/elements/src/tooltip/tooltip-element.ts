import './index';
import { Tooltip } from './index';
import { Condition, Renderer } from './types';

const defaultTooltipMap = new Map<Condition, Renderer>();
const rendererElementMap = new WeakMap<HTMLElement, Renderer>();

/**
 * Add the new condition to the default tooltip
 * @param condition Condition to add
 * @param renderer Renderer for condition
 * @returns {void}
 */
const addTooltipCondition = (condition: Condition, renderer: Renderer): void => {
  defaultTooltipMap.set(condition, renderer);
};

/**
 * Remove the existing condition from default tooltip
 * @param condition Condition to remove
 * @returns {void}
 */
const removeTooltipCondition = (condition: Condition): void => {
  defaultTooltipMap.delete(condition);
};

const condition: Condition = (target, paths) => {
  let res = false;
  for (const [condition, renderer] of defaultTooltipMap.entries()) {
    res = condition(target, paths);
    if (res) {
      // first by order condition only. It must not be possible to show multiple tooltips
      rendererElementMap.set(target, renderer);
      break;
    }
  }

  return res;
};

const renderer: Renderer = (target) => {
  const render = rendererElementMap.get(target);
  return render ? render(target) : undefined;
};

/**
 * The default tooltip, which is used to replicate `title` attribute
 * and to show tooltips for EF elements
 */
const tooltipElement = document.createElement('ef-tooltip') as Tooltip;
tooltipElement.setAttribute('ref', 'title-override');
tooltipElement.condition = condition;
tooltipElement.renderer = renderer;

const appendTitleTooltip = (): void => {
  document.body.appendChild(tooltipElement);
};

if (document.body) {
  appendTitleTooltip();
}
else {
  /* istanbul ignore next */
  document.addEventListener('DOMContentLoaded', appendTitleTooltip, { once: true });
}

export {
  tooltipElement,
  addTooltipCondition,
  removeTooltipCondition
};
