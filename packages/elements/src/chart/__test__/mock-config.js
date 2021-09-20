/* eslint-disable */
// line
let line = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Price',
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09]
    }]
  },
  options: {
    title: {
      text: 'Line Chart - Price of TRI.N in 2016'
    },
    legend: {
      display: false // not display legend
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price ($)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.yLabel + ' $';
        }
      }
    }
  }
};

// multilines
let multilines = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: '.DJI',
      data: [16466, 16517, 17685, 17774, 17787, 17930, 18432],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: '.N225',
      data: [17518, 16027, 16759, 16666, 17235, 15576, 16569],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: '.FTMIB',
      data: [18657, 17623, 18117, 18601, 18025, 16198, 16847],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: '.HSI',
      data: [19683, 19112, 20777, 21067, 20815, 20794, 21891],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }]
  },
  options: {
    title: {
      text: 'Multiple Lines Chart - Top Equity Indices 2016 Review'
    },
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1000,
          callback: function(label, index) {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          return data.datasets[tooltipItems[0].datasetIndex].label;
        },
        label: function(tooltipItem, data) {
          let month = tooltipItem.xLabel;
          let value = tooltipItem.yLabel;
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return month + ': ' + value;
        }
      }
    }
  }
};

// bar
let bar = {
  type: 'bar',
  data: {
    labels: ['2010', '2011', '2012', '2013'],
    datasets: [{
      label: 'GOOGL.O',
      data: [29321, 37905, 50175, 59825]
    }, {
      label: 'AAPL.O',
      data: [65225, 108249, 156508, 170910]
    }, {
      label: 'MSFT.O',
      data: [62484, 69943, 73723, 77849]
    }]
  },
  options: {
    title: {
      text: 'Bar Chart - Revenue of GOOGL.O, AAPL.O and MSFT.O'
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 180000,
          stepSize: 30000,
          callback: function(label, index) {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Revenue (in millions $)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          return 'Revenue';
        },
        label: function(tooltipItem, data) {
          let year = tooltipItem.xLabel;
          let rev = tooltipItem.yLabel;
          rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return year + ': ' + rev;
        }
      }
    }
  }
};

let singlesetbar = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Bounce Rate',
      data: [65, 59, 80, 81, 56, 55, 40]
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};

// stackbar
let stackbar = {
  type: 'bar',
  data: {
    labels: ['2010', '2011', '2012', '2013'],
    datasets: [{
      label: 'GOOGL.O',
      data: [29321, 37905, 50175, 59825]
    }, {
      label: 'AAPL.O',
      data: [65225, 108249, 156508, 170910]
    }, {
      label: 'MSFT.O',
      data: [62484, 69943, 73723, 77849]
    }]
  },
  options: {
    title: {
      text: 'Stacked Bar Chart - Revenue of GOOGL.O, AAPL.O and MSFT.O'
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          min: 0,
          stepSize: 50000,
          callback: function(label, index) {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Revenue (in millions $)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          return data.datasets[tooltipItems[0].datasetIndex].label;
        },
        label: function(tooltipItem, data) {
          let year = tooltipItem.xLabel;
          let rev = tooltipItem.yLabel;
          rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return year + ': ' + rev;
        }
      }
    }
  }
};

// combo (bar & line)
let combo = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      type: 'line',
      label: 'Price',
      data: [37.40, 36.60, 40.48, 41.13, 42.05, 40.42],
      yAxisID: 'y-axis-1',
      fill: true // not fill the area under the line
    }, {
      type: 'bar',
      label: 'Volume',
      data: [8.09, 8.79, 7.77, 6.77, 6.52, 6.77],
      yAxisID: 'y-axis-2'
    }]
  },
  options: {
    title: {
      text: 'Combo Bar and Line Chart - Price & Volume of TRI.N in 2016'
    },
    scales: {
      yAxes: [{
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          min: 36,
          max: 43,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: 'Price ($)'
        }
      }, {
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        ticks: {
          min: 6.0,
          max: 9.5,
          stepSize: 0.5,
          callback: function(label, index) {
            let val = label.toString();
            if (val.indexOf('.') === -1) {
              val += '.0';
            }
            return val + 'M';
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Volume'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          return 'TRI.N';
        },
        label: function(tooltipItem, data) {
          let yLabel = tooltipItem.yLabel;
          if (tooltipItem.datasetIndex === 0) {
            return 'Price: ' + yLabel;
          } else {
            return 'Volume: ' + yLabel + 'M';
          }
        }
      }
    }
  }
};

// pie
let pie = {
  type: 'pie',
  data: {
    labels: ['Americas', 'Europe', 'Greater china', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: [{
      data: [36, 22, 16, 8.2, 5.7, 12]
    }]
  },
  options: {
    title: {
      text: 'Pie Chart - Operating Segments of AAPL.O in 2014'
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let title = data.labels[tooltipItem.index];
          let result = data.datasets[0].data[tooltipItem.index];
          return title + ': ' + result + '%';
        }
      }
    }
  }
};

// doughnut
let doughnut = {
  type: 'doughnut',
  data: {
    labels: ['Americas', 'Europe', 'Greater China', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: [{
      data: [36, 22, 16, 8.2, 5.7, 12]
    }]
  },
  options: {
    title: {
      text: 'Doughnut Chart - Operating Segments of AAPL.O in 2014'
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let title = data.labels[tooltipItem.index];
          let result = data.datasets[0].data[tooltipItem.index];
          return title + ': ' + result + '%';
        }
      }
    }
  }
};

// timescale
let timescale = {
  type: 'line',
  data: {
    labels: [
      new Date(2016, 8, 7, 10, 0, 0),
      new Date(2016, 8, 7, 11, 0, 0),
      new Date(2016, 8, 7, 12, 0, 0),
      new Date(2016, 8, 7, 13, 0, 0),
      new Date(2016, 8, 7, 14, 0, 0),
      new Date(2016, 8, 7, 15, 0, 0),
      new Date(2016, 8, 7, 16, 0, 0),
      new Date(2016, 8, 7, 17, 0, 0)
    ],
    datasets: [{
      label: 'Price',
      data: [107.53, 107.32, 107.35, 107.41, 107.56, 107.23, 108.37, 108.36]
    }]
  },
  options: {
    title: {
      text: 'Time Scale - Hourly Price of AAPL.O on 7 Sep 2016 (iPhone 7 release date)'
    },
    legend: {
      display: false // Not display legend
    },
    scales: {
      xAxes: [{
        type: 'time', // Set type of scale as time
        time: {
          displayFormats: {
            hour: 'hA' // Set custom format for hour unit
          },
          unit: 'hour',
          tooltipFormat: 'D MMM YYYY - hA'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price ($)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let result = data.datasets[0].data[tooltipItem.index];
          return 'Price: $' + result;
        }
      }
    }
  }
};

// multilineTimescale
let multilineTimescale = {
  type: 'line',
  data: {
    labels: [
      new Date(2005, 12, 31),
      new Date(2006, 12, 31),
      new Date(2007, 12, 31),
      new Date(2008, 12, 31),
      new Date(2009, 12, 31),
      new Date(2010, 12, 31),
      new Date(2011, 12, 31),
      new Date(2012, 12, 31),
      new Date(2013, 12, 31),
      new Date(2014, 12, 31),
      new Date(2015, 12, 31)
    ],
    datasets: [{
      label: 'GOOGL.O',
      data: [0, 11, 66.68, -25.84, 49.44, 43.17, 55.69, 70.51, 170.14, 155.58, 274.71],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: 'MSFT.O',
      data: [0, 14.19, 36.14, -25.66, 16.56, 6.73, -0.73, 2.14, 43.06, 77.63, 112.16],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: 'IBM.N',
      data: [0, 18.19, 31.51, 2.38, 59.25, 78.54, 123.7, 133.03, 128.19, 95.18, 67.42],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: 'CSCO.O',
      data: [0, 59.64, 58.12, -4.79, 39.84, 18.17, 5.61, 14.77, 31.02, 62.47, 58.62],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: 'MSI.N',
      data: [0, -8.99, -29, -80.39, -65.65, -59.85, -49.97, -39.82, -27.04, -27.49, -26.01],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }, {
      label: 'BB.TO',
      data: [0, 94.14, 339.97, 93.49, 177.64, 126.98, -42.15, -53.88, -69.12, -50.20, -49.81],
      fill: false,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'
    }]
  },
  options: {
    title: {
      text: 'Multiple Lines Chart With Time Scale'
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            year: '\'YY' // Set custom format for hour unit
          },
          unit: 'year',
          round: 'year', // Set round as year for starting of this unit
          tooltipFormat: 'YYYY'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price Changes'
        },
        ticks: {
          stepSize: 50,
          callback: function(label, index) {
            return label + '%';
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          let item = tooltipItem[0];
          let year = item.xLabel;
          let datasets = data.datasets[item.datasetIndex];
          let label = datasets.label;
          return year + ' - ' + label;
        },
        label: function(tooltipItem, data) {
          let result = data.datasets[0].data[tooltipItem.index];
          return 'Change: ' + result + '%';
        }
      }
    }
  }
};

// scatter
let scatter = {
  type: 'line',
  data: {
    datasets: [{
      data: [
        { x: 37.04, y: 72.88 },
        { x: 33.16, y: 74.59 },
        { x: 29.42, y: 77.75 },
        { x: 32.19, y: 78.10 },
        { x: 33.62, y: 75.46 },
        { x: 30.89, y: 77.51 },
        { x: 29.44, y: 78.34 },
        { x: 29.64, y: 77.02 },
        { x: 32.78, y: 76.13 },
        { x: 35.92, y: 71.92 },
        { x: 38.50, y: 69.86 },
        { x: 39.44, y: 68.50 },
        { x: 39.46, y: 68.31 },
        { x: 36.79, y: 67.64 },
        { x: 39.72, y: 67.13 },
        { x: 40.36, y: 66.41 },
        { x: 43.73, y: 66.37 },
        { x: 45.92, y: 64.69 },
        { x: 44.66, y: 65.85 },
        { x: 46.21, y: 65.53 },
        { x: 47.75, y: 66.73 },
        { x: 49.33, y: 65.82 },
        { x: 48.62, y: 65.61 },
        { x: 49.07, y: 65.23 },
        { x: 47.98, y: 64.75 },
        { x: 47.64, y: 64.74 }
      ],
      pointRadius: 1
    }]
  },
  options: {
    showLines: false,
    legend: {
      display: false // not display legend
    },
    title: {
      text: 'Scatter Plot - Price of Oil vs Russian Ruble'
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Price of Oil ($)'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Russian ruble (per $)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function() {
          return '';
        },
        label: function(tooltipItem, data) {
          let x = tooltipItem.xLabel;
          return 'Oil\'s price : ' + x + ' $';
        },
        afterLabel: function(tooltipItem, data) {
          let y = tooltipItem.yLabel;
          return 'Ruble : ' + y;
        }
      }
    }
  }
};

//bubble
let bubble = {
  type: 'bubble',
  data: {
    datasets: [{
        label: 'Zimbabwe',
        data: [{ x: 450, y: 46, r: 3 }]
      },
      {
        label: 'Ethiopia',
        data: [{ x: 950, y: 56, r: 8 }]
      },
      {
        label: 'India',
        data: [{ x: 3000, y: 64, r: 18 }]
      },
      {
        label: 'China',
        data: [{ x: 6500, y: 73, r: 26 }]
      },
      {
        label: 'Russia',
        data: [{ x: 16000, y: 67, r: 8 }]
      },
      {
        label: 'UK',
        data: [{ x: 35000, y: 79, r: 6 }]
      },
      {
        label: 'USA',
        data: [{ x: 45000, y: 78, r: 12 }]
      }
    ]
  },
  options: {
    title: {
      text: 'GDP vs. Life Expectancy (Size = Popuation)'
    },
    scales: {
      xAxes: [{
        type: 'logarithmic',
        position: 'bottom',
        ticks: {
          min: 450,
          max: 50000,
          maxRotation: 10,
          callback: function(label, index) {
            let xLabels = ['500', '1000', '2000', '5000', '10,000', '20000', '50000'];
            return xLabels.indexOf(label.toString()) > -1 ? label : '';
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'GDP per person in US dollars (log scale)'
        }
      }],
      yAxes: [{
        ticks: {
          min: 45,
          max: 85,
          stepSize: 5
        },
        scaleLabel: {
          display: true,
          labelString: 'Life expectancy at birth (years)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          let item = tooltipItem[0];
          let dataset = data.datasets[item.datasetIndex];
          return dataset.label;
        },
        label: function(tooltipItem, data) {
          let x = tooltipItem.xLabel;
          return 'GDP per Capita : ' + x + '$';
        },
        afterLabel: function(tooltipItem, data) {
          let y = tooltipItem.yLabel;
          return 'Life expectancy : ' + y + ' Yrs';
        }
      }
    }
  }
};

// radar
let radar = {
  type: 'radar',
  data: {
    labels: [
      ['Eating', 'Dinner'],
      ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'
    ],
    datasets: [{
        label: 'Humanoid A',
        data: [
          13,
          10,
          9,
          14,
          9,
          5,
          10
        ]
      },
      {
        label: 'Humanoid B',
        data: [
          8,
          5,
          9,
          7,
          17,
          11,
          4
        ]
      }
    ]
  },
  options: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Radar Chart - Humanoid Profile Comparison'
    }
  }
};

// polar area
let polarArea = {
  type: 'polarArea',
  data: {
    labels: [
      ['Eating', 'Dinner'],
      ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'
    ],
    datasets: [{
        label: 'Humanoid A',
        data: [
          13,
          10,
          9,
          14,
          9,
          5,
          10
        ]
      },
      {
        label: 'Humanoid B',
        data: [
          8,
          5,
          9,
          7,
          17,
          11,
          4
        ]
      }
    ]
  },
  options: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Radar Chart - Humanoid Profile Comparison'
    }
  }
};

// user use case
let uc1 = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Price',
        data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09],
        pointBorderColor: 'white',
        pointBackgroundColor: 'blue',
        borderColor: 'orange',
        fill: false
        // backgroundColor: 'rgba(255, 153, 51, 0.2)'
      },
      {
        label: 'Another Price',
        data: [10.5, 15.9, 56.7, 52.1, 30.0, 35.1, 36.0],
        pointBorderColor: 'red',
        pointBackgroundColor: 'black',
        borderColor: 'orange',
        fill: false
        // backgroundColor: 'rgba(255, 153, 51, 0.2)'
      }
    ]
  },

  options: {
    maintainAspectRatio: true,
    title: {
      display: true,
      text: 'Trades / Amount (USt) for GBP.USD'
    },
    legend: {
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Trades'
        }
      }],
      xAxes: [{
        id: 'x-axis-1',
      }]
    },
  },
  annotation: {
    annotations: [{
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-1',
        value: '0',
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 6,
        borderDash: [6, 2],
        topBound: '2',
        bottomBound: '-2'
      },
      {
        id: 'a-line-2', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-1',
        value: '1',
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 2,
        borderDash: [6, 2],
        topBound: '1',
        bottomBound: '-1'
      },
      {
        id: 'a-line-3', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-1',
        value: '2',
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 2,
        borderDash: [6, 2],
        topBound: '3',
        bottomBound: '-2'
      },
      {
        id: 'a-line-4', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-1',
        value: '3',
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 2,
        borderDash: [6, 2],
        topBound: '1',
        bottomBound: '-0'
      }
    ]
  }
};

// user use case
let uc2 = {
  type: 'bar',
  options: {
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {

      }
    },
    legend: {
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [{
        id: 'xAxis',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Hour of Day (London time)'
        },
        ticks: {
          display: true
        }
      }],
      yAxes: [{
          id: 'yAxis1',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Percentage from Minimum'
          },
          ticks: {
            display: true,
            callback: (label, index) => {
              let newNumber = label * 100.0;
              return newNumber.toLocaleString('en-GB', {
                useGrouping: true,
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
              }) + '%';
            }
          }
        },
        {
          id: 'yAxis2',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Number of Trades'
          },
          ticks: {
            display: true
          },
          gridLines: {
            drawBorder: true,
            drawOnChartArea: false
          }
        }
      ]
    }
  },
  data: {
    labels: ['5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '0',
      '1',
      '2',
      '3',
      '4'
    ],
    datasets: [{
        data: [0.5121,
          0.6121,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0.0121,
          0.1121,
          0.2121,
          0.3121,
          0.4121
        ],
        yAxisID: 'yAxis1',
        label: 'Average Spread USD 0 to 5m',
        fill: false,
        pointStyle: 'rectRot',
        pointRadius: 4,
        type: 'line'
      },
      {
        data: [0.5122,
          0.6122,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0.0122,
          0.1122,
          0.2122,
          0.3122,
          0.4122
        ],
        yAxisID: 'yAxis1',
        label: 'Average Spread USD 5 to 25m',
        fill: false,
        pointStyle: 'triangle',
        pointRadius: 4,
        type: 'line'
      },
      {
        data: [5123,
          6123,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          123,
          1123,
          2123,
          3123,
          4123
        ],
        yAxisID: 'yAxis2',
        label: 'Number of Trades USD 0 to 5m',
        fill: true
      },
      {
        data: [5124,
          6124,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          124,
          1124,
          2124,
          3124,
          4124
        ],
        yAxisID: 'yAxis2',
        label: 'Number of Trades USD 5 to 25m',
        fill: true
      }
    ]
  }
};

let centerLabelPlugins = {
  type: 'doughnut',
  data: {
    labels: ['Americas', 'Europe', 'Greater China', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: [{
      data: [36, 22, 16, 8.2, 5.7, 12]
    }]
  },
  options: {
    plugins: {
      centerLabel: {
        defaultText: [
          {
            label: 'Operating Segments of AAPL.O in 2014',
            bold: true
          }
        ],
        onRenderLabel: function (chart, chartItems) {
          if (chartItems.length) {
            const chartItem = chartItems[0];
            const data = chart.data;
            const title = data.labels[chartItem._index];
            const value = data.datasets[0].data[chartItem._index];
            const total = data.datasets[0].data.reduce((total, num) => total + num);
            const percent = parseFloat(parseFloat(value) / parseFloat(total)).toFixed(2);

            return [{
              label: title,
              bold: true
            },
            {
              label: value
            }, {
              label: percent + ' %'
            }];
          }
        }
      }
    },
    title: {
      text: 'Operating Segments of AAPL.O in 2014'
    },
    tooltips: {
      enabled: false
    }
  }
};

export {
  line,
  multilines,
  bar,
  singlesetbar,
  stackbar,
  combo,
  pie,
  doughnut,
  timescale,
  multilineTimescale,
  scatter,
  bubble,
  radar,
  polarArea,
  uc1,
  uc2,
  centerLabelPlugins
};
