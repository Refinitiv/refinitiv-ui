// eslint-disable-next-line import/extensions
import { Chart } from 'chart.js/auto';
import doughnutCenterPlugin from './plugins/doughnut-center-label.js';

Chart.register(doughnutCenterPlugin);

export * from './bare.js';
