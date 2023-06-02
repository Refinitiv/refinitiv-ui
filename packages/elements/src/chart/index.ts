// eslint-disable-next-line import/extensions
import { Chart } from 'chart.js/auto/auto.js';
import { doughnutCenterLabelPlugin } from './plugins/index.js';

Chart.register(doughnutCenterLabelPlugin);

export * from './elements/chart.js';
