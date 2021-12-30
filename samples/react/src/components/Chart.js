import React, { useRef, useEffect } from 'react'
import { data } from '../chartData';

const Chart = ({ chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if(chartRef.current) {
      const chartConfig = {
        options: {
          timeScale: {
            timeVisible: true,
            secondsVisible: true
          }
        },
        series: [{
          symbol: 'Price',
          type: chartType,
          data: data,
        }]
      };
      chartRef.current.config = chartConfig;
    }
  }, [chartRef, chartType]);

  return (
    <div className='chart-container'>
      <ef-interactive-chart ref={chartRef}></ef-interactive-chart>
    </div>
  )
}

export default Chart;
