import React from 'react'

const Sidebar = ({ chartType, setChartType }) => {
  return (
    <ef-tab-bar vertical>
      <ef-tab
        icon="chart-chartline"
        label="Line Chart"
        active={chartType === 'line' || undefined}
        onClick={() => setChartType('line')}
      >
      </ef-tab>
      <ef-tab
        icon="chart-area"
        label="Area Chart"
        active={chartType === 'area' || undefined}
        onClick={() => setChartType('area')}
      >
      </ef-tab>
      <ef-tab
        icon="chart-bar"
        label="Bar Chart"
        active={chartType === 'bar' || undefined}
        onClick={() => setChartType('bar')}
      >
      </ef-tab>
      <ef-tab
        icon="chart-candles"
        label="Candlestick Chart"
        active={chartType === 'candlestick' || undefined}
        onClick={() => setChartType('candlestick')}
      >
      </ef-tab>
      <ef-tab
        icon="chart-line-bar"
        label="Volume Chart"
        active={chartType === 'volume' || undefined}
        onClick={() => setChartType('volume')}
      >
      </ef-tab>
    </ef-tab-bar>
  )
}

export default Sidebar;
