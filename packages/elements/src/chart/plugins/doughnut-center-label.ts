import { Chart as ChartJS } from 'chart.js';
// eslint-disable-next-line import/extensions
import { getHoverColor } from 'chart.js/helpers';

import type {
  ActiveElement,
  ArcElement,
  ArcOptions,
  ChartEvent,
  ChartType,
  DoughnutController,
  Plugin
} from 'chart.js';

interface Selectable {
  _select: ActiveElement[];
  selected: ActiveElement[];
  active: ActiveElement[];
}

export interface CenterLabel {
  label: string;
  bold?: boolean;
}

export interface Selected {
  datasetIndex?: number;
  index: number;
}

export interface CenterLabelConfig {
  defaultText: CenterLabel[];
  selected: Selected;
  onRenderLabel(chart: ChartJS, chartItems: ActiveElement[]): CenterLabel[] | undefined;
}

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType = ChartType> {
    centerLabel?: CenterLabelConfig;
  }
}

const getPluginConfig = (chart: ChartJS): CenterLabelConfig => {
  return chart.config.options?.plugins?.centerLabel as CenterLabelConfig;
};

/**
 * Draw line
 * @param {DoughnutChart} chart doughnut chart
 * @param {MetaData[]} active active data
 * @returns {void}
 */
// Note: use logic from chart.js - chart.js/src/elements/element.arc.js :draw()
const drawItemBorder = function (chart: ChartJS, active: ActiveElement[]): void {
  if (!chart.data.datasets) {
    return;
  }

  if (!active?.length) {
    return;
  }

  const ctx = chart.ctx;
  const chartItem = active[0];
  const element = chartItem.element as ArcElement;
  const arcOptions = chartItem.element.options as ArcOptions;
  const datasets = chart.data.datasets[chartItem.datasetIndex];

  // Need to make color bolder
  if (Array.isArray(datasets.backgroundColor)) {
    arcOptions.backgroundColor = datasets.backgroundColor[chartItem.index] as string;
    arcOptions.backgroundColor = getHoverColor(arcOptions.backgroundColor);
  }

  arcOptions.borderWidth =
    arcOptions.borderWidth ||
    ((datasets.borderWidth || chart.config.options?.elements?.arc?.borderWidth) as number);
  arcOptions.borderColor = (getComputedStyle(chart.canvas).getPropertyValue('--doughnut-border-color') ||
    ChartJS.defaults.color) as string;

  const sA = element.startAngle;
  const eA = element.endAngle;

  if (ctx) {
    ctx.beginPath();

    ctx.arc(element.x, element.y, element.outerRadius, sA, eA);
    ctx.arc(element.x, element.y, element.innerRadius, eA, sA, true);

    ctx.closePath();

    ctx.strokeStyle = arcOptions.borderColor;
    ctx.lineWidth = arcOptions.borderWidth;
    ctx.fillStyle = arcOptions.backgroundColor;

    ctx.fill();

    ctx.lineJoin = 'bevel';
    if (arcOptions.borderWidth) {
      ctx.stroke();
    }
  }
};

const plugins: Plugin = {
  id: 'centerLabel',
  beforeEvent: function (chart: ChartJS & Selectable, args: { event: ChartEvent }): void {
    if (!getPluginConfig(chart)) {
      return;
    }
    switch (args.event?.type) {
      case 'click':
        // chart._select stores a segment that is clicked
        if (!chart._select) {
          chart._select = [];
        }

        if (chart.getActiveElements().length) {
          if (
            chart._select.length &&
            chart._select[0].datasetIndex === chart.getActiveElements()[0].datasetIndex &&
            chart._select[0].index === chart.getActiveElements()[0].index
          ) {
            // reset value if user clicked on selected segment
            chart._select = [];
          } else {
            // set segment that user clicked
            chart._select = chart.getActiveElements().slice(0);
          }
        } else {
          chart._select = [];
        }
        // Trigger update to re render the chart
        // Cannot use draw() because the chart doesn't redraw border of unselected datasets
        chart.update();
        break;
      default:
        break;
    }
  },
  beforeDraw: function (chart: ChartJS & Selectable): void {
    const config = getPluginConfig(chart);

    if (!config) {
      return;
    }

    // Set render hook function
    let active: ActiveElement[] = [];
    if (chart._select) {
      active = chart._select;
    }
    const activeElements = chart.getActiveElements();
    if (activeElements.length > 0) {
      active = activeElements;
    }

    const labels = config.onRenderLabel(chart, active);

    // Get Texts
    const texts = labels || config.defaultText;

    if (!texts) {
      return;
    }

    // Get ctx from param
    const ctx = chart.ctx;

    // Get options from config
    const canvas = chart.canvas;
    const style = getComputedStyle(canvas);
    const globalConfig = ChartJS.defaults;
    const defaultFontStyle = globalConfig.font.family;

    const defaultColor = style.getPropertyValue('--doughnut-center-text-color') || globalConfig.color;
    const backgroundColor = style.getPropertyValue('--doughnut-center-background-color');
    const customFontSizePercent = parseInt(style.getPropertyValue('--doughnut-center-font-size'), 10) / 100; // font size in percentage

    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    // Radius of circular hole in the middle of the chart
    const innerRadius = (
      chart.getDatasetMeta(chart.data.datasets.length - 1).data[0] as unknown as DoughnutController
    ).innerRadius;

    // Render center background color
    if (backgroundColor) {
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = backgroundColor;
      ctx.fill();
    }

    // Base font size is 30% and minus 4% per text lines ( if text has multiple lines ) of text area
    const baseFontSize = innerRadius * (0.3 - 0.04 * (texts.length - 1));
    // Keep minimum font size equal 5% of text area
    const computedFontSize = Math.max(innerRadius * 0.05, baseFontSize);
    // Use font size ratio from user if --doughnut-center-font-size CSS variable is provided
    const fontRatio = customFontSizePercent || computedFontSize / innerRadius;
    const fontSizeToUse = innerRadius * fontRatio;

    // Set font settings to draw it correctly.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = defaultColor as string;

    // Render texts
    const fontLineHeight = fontSizeToUse * 1.5;
    const fontSizeHeaderRatio = 1.15;

    // Move Y position of text up according to text length
    const offsetY = centerY - (texts.length - 1) * 0.5 * fontLineHeight;
    const containerWidth = innerRadius * 2;
    const circlePadding = containerWidth * (texts.length <= 1 ? 0.4 : 0.5);

    for (let i = 0; i < texts.length; i++) {
      let targetFont;
      if (texts[i].bold) {
        targetFont = `bold ${fontSizeToUse * fontSizeHeaderRatio}px ${defaultFontStyle || ''}`;
      } else {
        targetFont = `${fontSizeToUse}px ${defaultFontStyle || ''}`;
      }

      ctx.font = targetFont;
      let targetText = texts[i].label;

      if (ctx.measureText(targetText).width > containerWidth - circlePadding) {
        const numText = targetText.length;
        const numRatio = targetText.length / ctx.measureText(targetText).width;
        const difSize = ctx.measureText(targetText).width - containerWidth + circlePadding;
        let numCharacter = numText - Math.ceil(difSize * numRatio);
        numCharacter = Math.max(1, numCharacter);
        if (numCharacter) {
          targetText = targetText.slice(0, numCharacter);
          targetText += '...';
        }
      }
      ctx.fillText(targetText, centerX, offsetY + i * fontLineHeight);
    }
  },
  afterDatasetUpdate: function (chart: ChartJS & Selectable): void {
    // Check chart already init selected.
    if (chart.selected !== undefined) {
      return;
    }

    // Check configs are ready to init selected
    const config = getPluginConfig(chart);
    if (!config || !config.selected || !chart.data.datasets) {
      return;
    }

    const selectedIndex = Number(config.selected?.index);
    const datasetIndex = Number(config.selected.datasetIndex || 0);
    const visibleIndex = chart.getVisibleDatasetCount() - 1;

    // Validate index and datasetIndex
    if (isNaN(selectedIndex) || isNaN(datasetIndex) || datasetIndex < 0 || datasetIndex > visibleIndex) {
      return;
    }

    // Set selected item to the chart
    const items = chart.getDatasetMeta(datasetIndex).data[selectedIndex];
    chart.selected = items ? [{ element: items as ArcElement, datasetIndex, index: selectedIndex }] : [];
  },
  afterDatasetsDraw: function (chart: ChartJS & Selectable): void {
    if (getPluginConfig(chart)) {
      // Draw active element

      // hover
      drawItemBorder(chart, chart.getActiveElements());

      // selected
      if (chart.selected?.length) {
        chart._select = chart.selected;
        chart.selected = [];
      }

      // active
      drawItemBorder(chart, chart._select);
    }
  }
};

export { plugins as doughnutCenterLabelPlugin };
