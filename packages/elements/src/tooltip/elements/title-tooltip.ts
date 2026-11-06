import { tooltipRenderer } from '../helpers/renderer.js';
import { addTooltipCondition } from './tooltip-element.js';

addTooltipCondition((element) => element.matches('[tooltip]'), tooltipRenderer);
