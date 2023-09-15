import { useState } from 'react';
import { useEffect } from 'react';

import ApexCharts from 'react-apexcharts';
import { trafficDetail } from '@/constant/traffic';
import getNumberSuffix from '@/utils/getNumberSuffix';

function TrafficChart({ series, categories }) {
  const [option, setOptions] = useState('Monthly');

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: 1.5,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark', // From top to bottom
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#B5FFDF', '#F8FFFC'],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.2,
      },
    },
    colors: ['#1B9876'],
    xaxis: {
      categories: categories || [],
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => {
          return getNumberSuffix(value);
        },
      },
    },
  };

  return <ApexCharts options={options} series={series || []} type="area" />;
}

export default TrafficChart;
