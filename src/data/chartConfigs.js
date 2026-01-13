/**
 * Configurações de gráficos ApexCharts para MOVIOCA
 * Convertidos do projeto original para formato React
 */

// Small Charts (mini gráficos de área)
export const smallChartOptions = {
  chart1: {
    series: [{
      name: 'series1',
      data: [20, 50, 27, 100, 30, 80, 100]
    }],
    options: {
      chart: {
        height: 55,
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      colors: ['#5142FC'],
      xaxis: { labels: { show: false }, axisBorder: { show: false } },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      tooltip: { enabled: false }
    }
  },
  chart2: {
    series: [{
      name: 'series2',
      data: [30, 40, 50, 80, 60, 70, 90]
    }],
    options: {
      chart: {
        height: 55,
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      colors: ['#47A432'],
      xaxis: { labels: { show: false }, axisBorder: { show: false } },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      tooltip: { enabled: false }
    }
  },
  chart3: {
    series: [{
      name: 'series3',
      data: [50, 30, 70, 40, 90, 60, 80]
    }],
    options: {
      chart: {
        height: 55,
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      colors: ['#DF4949'],
      xaxis: { labels: { show: false }, axisBorder: { show: false } },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      tooltip: { enabled: false }
    }
  },
  chart4: {
    series: [{
      name: 'series4',
      data: [20, 60, 40, 80, 50, 70, 100]
    }],
    options: {
      chart: {
        height: 55,
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      colors: ['#F7A600'],
      xaxis: { labels: { show: false }, axisBorder: { show: false } },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      tooltip: { enabled: false }
    }
  }
}

// Line Chart com duas linhas
export const lineChartTwolineOptions = {
  series: [
    {
      name: 'Item 01',
      data: [31, 90, 58, 70, 92, 89, 80]
    },
    {
      name: 'Item 02',
      data: [51, 45, -25, 51, 34, 2, 41]
    }
  ],
  options: {
    chart: {
      height: 207, // Matched original
      type: 'line',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#D4FE75', '#ffffff4d'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: '#95989D',
          fontSize: '12px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    },
    grid: {
      show: false,
      padding: {
          left: 0,
          right: 0
      }
    },
    tooltip: {
      enabled: false
    }
  }
}

// Candlestick Chart
export const candlestickOptions = {
  series: [{
    data: [
      { x: new Date(2022, 0, 1), y: [51.98, 56.29, 51.59, 53.85] },
      { x: new Date(2022, 0, 2), y: [53.66, 54.99, 51.35, 52.95] },
      { x: new Date(2022, 0, 3), y: [52.76, 57.35, 52.15, 57.03] },
      { x: new Date(2022, 0, 4), y: [57.04, 58.15, 48.88, 49.24] },
      { x: new Date(2022, 0, 5), y: [49.10, 52.86, 47.70, 52.78] },
      { x: new Date(2022, 0, 6), y: [52.68, 53.29, 50.91, 51.36] },
      { x: new Date(2022, 0, 7), y: [51.18, 54.70, 51.10, 54.14] },
      { x: new Date(2022, 0, 8), y: [54.14, 54.80, 50.58, 51.60] },
      { x: new Date(2022, 0, 9), y: [51.60, 55.72, 50.29, 54.38] },
      { x: new Date(2022, 0, 10), y: [54.38, 55.74, 51.80, 51.92] },
      { x: new Date(2022, 0, 11), y: [51.92, 55.26, 50.10, 55.26] },
      { x: new Date(2022, 0, 12), y: [55.26, 58.76, 55.16, 58.10] },
      { x: new Date(2022, 0, 13), y: [58.10, 58.70, 53.69, 54.80] },
      { x: new Date(2022, 0, 14), y: [54.80, 55.47, 51.81, 52.40] },
      { x: new Date(2022, 0, 15), y: [52.40, 53.10, 49.46, 49.46] },
      { x: new Date(2022, 0, 16), y: [49.46, 51.22, 48.62, 49.26] },
      { x: new Date(2022, 0, 17), y: [49.26, 53.10, 48.27, 51.98] },
      { x: new Date(2022, 0, 18), y: [51.98, 55.52, 51.32, 52.86] },
      { x: new Date(2022, 0, 19), y: [52.86, 56.63, 52.08, 55.00] },
      { x: new Date(2022, 0, 20), y: [55.00, 58.29, 54.54, 55.34] }
    ]
  }],
  options: {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: { show: false }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' },
        formatter: (value) => '$' + value.toFixed(2)
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#47A432',
          downward: '#DF4949'
        }
      }
    },
    grid: {
      borderColor: '#2E2E35',
      strokeDashArray: 5
    }
  }
}

// Column Chart
export const columnChartOptions = {
  series: [{
    name: 'Volume',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: { enabled: false },
    colors: ['#5142FC'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' }
      }
    },
    grid: {
      borderColor: '#2E2E35',
      strokeDashArray: 5,
      xaxis: { lines: { show: false } }
    }
  }
}

// Donut Chart
export const donutChartOptions = {
  series: [44, 55, 41, 17],
  options: {
    chart: {
      type: 'donut',
      height: 280
    },
    colors: ['#5142FC', '#47A432', '#F7A600', '#DF4949'],
    labels: ['Bitcoin', 'Ethereum', 'Litecoin', 'Monero'],
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: '#8E8E93' }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true },
            value: {
              show: true,
              formatter: (val) => val + '%'
            },
            total: {
              show: true,
              label: 'Total',
              formatter: () => '$84,345'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 }
  }
}

// Area Chart para wallet
export const areaChartOptions = {
  series: [{
    name: 'Balance',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }],
  options: {
    chart: {
      type: 'area',
      height: 200,
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ['#5142FC'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#8E8E93', fontSize: '12px' },
        formatter: (value) => '$' + value + 'K'
      }
    },
    grid: {
      borderColor: '#2E2E35',
      strokeDashArray: 5,
      xaxis: { lines: { show: false } }
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (value) => '$' + value + 'K' }
    }
  }
}

export const walletDonutOptions = {
  series: [56, 15, 56, 56],
  options: {
    chart: { type: 'donut', height: 180 },
    labels: ['Grocery', 'Shopping', 'Health', 'Rent'],
    colors: ['#90caf9', '#f4ff81', '#ce93d8', '#ba68c8'],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: { size: '45%' }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value + '%'
        }
      }
    }
  }
}

// Stacked Column Chart (para mini gráficos na página Crypto)
export const stackedColumnChartOptions = {
  series: [{
      name: 's1',
      data: [44, 55, 41, 67, 22, 43, 21, 44, 55, 41, 67]
  }, {
      name: 's2',
      data: [13, 23, 20, 8, 13, 27, 33, 13, 23, 20, 8]
  }, {
      name: 's3',
      data: [11, 17, 15, 15, 21, 14, 15, 11, 17, 15, 15]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 87,
      width: 120, // Ajustado
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    plotOptions: {
      bar: {
        columnWidth: '5px',
        borderRadius: 0
      }
    },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    fill: { opacity: 1 },
    stroke: { width: 0 },
    legend: { show: false },
    grid: { show: false, padding: { left: 0, right: 0 } },
    tooltip: { enabled: false },
    colors: ['#161326', '#A4A4A9', '#FFFFFF']
  }
}

// Configuração específica para a página Exchange (replicando candlestick-3.js)
export const candlestick3Options = {
  series: [{
    data: [
      { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
      { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
      { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
      { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
      { x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
      { x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
      { x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
      { x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
      { x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
      { x: new Date(1538796600000), y: [6608.02, 6610.68, 6601.99, 6608.91] },
      { x: new Date(1538798400000), y: [6608.91, 6618.99, 6608.01, 6612] },
      { x: new Date(1538800200000), y: [6612, 6615.13, 6605.09, 6612] },
      { x: new Date(1538802000000), y: [6612, 6624.12, 6608.43, 6622.95] },
      { x: new Date(1538803800000), y: [6623.91, 6623.91, 6615, 6615.67] },
      { x: new Date(1538805600000), y: [6618.69, 6618.74, 6610, 6610.4] },
      { x: new Date(1538807400000), y: [6611, 6622.78, 6610.4, 6614.9] },
      { x: new Date(1538809200000), y: [6614.9, 6626.2, 6613.33, 6623.45] },
      { x: new Date(1538811000000), y: [6623.48, 6627, 6618.38, 6620.35] },
      { x: new Date(1538812800000), y: [6619.43, 6620.35, 6610.05, 6615.53] },
      { x: new Date(1538814600000), y: [6615.53, 6617.93, 6610, 6615.19] },
      { x: new Date(1538816400000), y: [6615.19, 6621.6, 6608.2, 6620] },
      { x: new Date(1538818200000), y: [6619.54, 6625.17, 6614.15, 6620] },
      { x: new Date(1538820000000), y: [6620.33, 6634.15, 6617.24, 6624.61] },
      { x: new Date(1538821800000), y: [6625.95, 6626, 6611.66, 6617.58] },
      { x: new Date(1538823600000), y: [6619, 6625.97, 6595.27, 6598.86] },
      { x: new Date(1538825400000), y: [6598.86, 6598.88, 6570, 6587.16] },
      { x: new Date(1538827200000), y: [6588.86, 6600, 6580, 6593.4] }
    ]
  }],
  options: {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: { columnWidth: '4px' },
      candlestick: {
        colors: {
          upward: '#C388F7',
          downward: '#C0FAA0'
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { colors: '#A4A4A9', fontSize: '12px', fontWeight: 400 }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      opposite: true,
      tooltip: { enabled: true },
      labels: {
        style: { colors: '#A4A4A9', fontSize: '12px', fontWeight: 400 }
      }
    }
  }
}
