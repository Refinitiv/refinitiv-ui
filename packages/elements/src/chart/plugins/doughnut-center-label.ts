import type { ChartJS, ChartHelpers, MetaData } from '../helpers/types';

type DoughnutChart = ChartJS & Chart.DoughnutModel & ChartHelpers;

interface Selectable {
  _select: MetaData[];
  selected: MetaData[];
  active: MetaData[];
}

interface CenterLabel {
  label: string;
  bold?: boolean;
}

interface Selected {
  datasetIndex?: number;
  index: number;
}

interface CenterLabelConfig {
  defaultText: CenterLabel[];
  selected: Selected;
  onRenderLabel(chart: DoughnutChart, chartItems: MetaData[]): CenterLabel[];
}

const CHART = window.Chart as unknown as ChartJS;
const getPluginConfig = (chart: DoughnutChart): CenterLabelConfig => {
  return chart.config.options?.plugins?.centerLabel as CenterLabelConfig;
};

/**
 * Draw line
 * @param {DoughnutChart} chart doughnut chart
 * @param {MetaData[]} active active data
 * @returns {void}
 */
const drawItemBorder = function (chart: DoughnutChart, active: MetaData[]): void {

  if (!chart.data.datasets) {
    return;
  }

  if (active?.length) {
    const ctx = chart.ctx;
    const chartItem = active[0] as unknown as MetaData;
    const vm = chartItem._view;
    const datasets = chart.data.datasets[chartItem._datasetIndex];

    vm.backgroundColor = (datasets.backgroundColor as Chart.ChartColor[])[chartItem._index] as string;
    vm.backgroundColor = CHART.helpers.getHoverColor(vm.backgroundColor); // we need to make color bolder
    vm.borderWidth = (datasets.borderWidth || chart.config.options?.elements?.arc?.borderWidth) as number;
    vm.borderColor = (getComputedStyle(chart.canvas as HTMLCanvasElement).getPropertyValue('--doughnut-border-color') || CHART.defaults.global.defaultFontColor) as string;

    const sA = vm.startAngle;
    const eA = vm.endAngle;

    if (ctx) {
      ctx.beginPath();

      ctx.arc(vm.x, vm.y, vm.outerRadius as number, sA as number, eA as number);
      ctx.arc(vm.x, vm.y, vm.innerRadius as number, eA as number, sA as number, true);

      ctx.closePath();

      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = vm.borderWidth;
      ctx.fillStyle = vm.backgroundColor;

      ctx.fill();

      ctx.lineJoin = 'bevel';
      if (vm.borderWidth) {
        ctx.stroke();
      }
    }
  }
};

const plugins: Chart.PluginServiceRegistrationOptions = {
  beforeEvent: function (chart: DoughnutChart & Selectable, event: Event): void {
    if (!getPluginConfig(chart)) {
      return;
    }
    switch (event.type) {
      case 'click':
        // chart._select stores a segment that is clicked
        if (!chart._select) {
          chart._select = [];
        }

        if (chart.active.length) {
          if (chart._select.length && chart._select[0]._datasetIndex === chart.active[0]._datasetIndex
            && chart._select[0]._index === chart.active[0]._index
          ) {
            // reset value if user clicked on selected segment
            chart._select = [];
          }
          else {
            // set segment that user clicked
            chart._select = chart.active.slice(0);
          }
        }
        else {
          chart._select = [];
        }
        chart.draw();
        break;
      default:
        break;
    }
  },
  beforeDraw: function (chart: DoughnutChart & Selectable): void {

    const config = getPluginConfig(chart);

    if (!config) {
      return;
    }

    // Set render hook function
    let active: MetaData[] = [];
    if (chart._select) {
      active = chart._select;
    }
    if (chart.active?.length) {
      active = chart.active;
    }
    const renderText = config.onRenderLabel(chart, active);

    // Get Texts
    const centerConfig = config;
    const texts = renderText || centerConfig.defaultText;

    if (!texts) {
      return;
    }

    // Get ctx from param
    const ctx = chart.ctx as CanvasRenderingContext2D;

    // Get options from config
    const canvas = chart.canvas as HTMLCanvasElement;
    const style = window.getComputedStyle(canvas);
    const globalConfig = CHART.defaults.global;
    const defaultFontStyle = globalConfig.defaultFontFamily;

    const defaultColor = style.getPropertyValue('--doughnut-center-text-color') || globalConfig.defaultFontColor;
    const backgroundColor = style.getPropertyValue('--doughnut-center-background-color');
    const customFontSizePercent = parseInt(style.getPropertyValue('--doughnut-center-font-size'), 10) / 100; // font size in percentage

    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    // Render center background color
    if(backgroundColor) {
      ctx.arc(centerX, centerY, chart.innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = backgroundColor;
      ctx.fill();
    }

    const textAreaWidth = chart.innerRadius;
    // Base font size is 30% and minus 4% per text lines ( if text has multiple lines ) of text area
    const baseFontSize = textAreaWidth * (0.3 - (0.04 * (texts.length - 1)));
    // Keep minimum font size equal 5% of text area
    const computedFontSize = Math.max(textAreaWidth * 0.05, baseFontSize);
    // Use font size ratio from user if --doughnut-center-font-size CSS variable is provided
    const fontRatio = customFontSizePercent || computedFontSize / textAreaWidth;
    const fontSizeToUse = textAreaWidth * fontRatio;

    // Set font settings to draw it correctly.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = defaultColor as string;

    // Render texts
    const fontLineHeight = fontSizeToUse * 1.5;
    const fontSizeHeaderRatio = 1.15;

    // Move Y position of text up according to text length
    const offsetY = centerY - (texts.length - 1) * 0.5 * fontLineHeight;
    const containerWidth = chart.innerRadius * 2;
    const circlePadding = containerWidth * (texts.length <= 1 ? 0.4 : 0.5);

    for (let i = 0; i < texts.length; i++) {
      let targetFont;
      if (texts[i].bold) {
        targetFont = `bold ${fontSizeToUse * fontSizeHeaderRatio}px ${defaultFontStyle || ''}`;
      }
      else {
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
        if(numCharacter) {
          targetText = targetText.slice(0, numCharacter);
          targetText += '...';
        }
      }
      ctx.fillText(targetText, centerX, offsetY + (i * fontLineHeight));
    }
  },
  afterDatasetUpdate: function (chart: DoughnutChart & Selectable): void {

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
    const visibleIndexes = chart.getVisibleDatasetCount() - 1;

    // Validate index and datasetIndex
    if (isNaN(selectedIndex) || (isNaN(datasetIndex) || datasetIndex < 0 || datasetIndex > visibleIndexes)) {
      return;
    }

    // Set selected item to the chart
    const items = chart.getDatasetMeta(datasetIndex).data[selectedIndex];
    chart.selected = items ? [items] : [];
  },
  afterDraw: function (chart: DoughnutChart & Selectable): void {
    if (getPluginConfig(chart)) {
      // Draw active element
      // Note: use logic from chart.js - chart.js/src/elements/element.arc.js :draw()

      // hover
      drawItemBorder(chart, chart.active);

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

export default plugins;
