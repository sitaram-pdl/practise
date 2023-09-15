import React from 'react';
import ReactApexChart from 'react-apexcharts';
import customerData from '@/constant/customer';
import getNumberSuffix from '@/utils/getNumberSuffix';

const CustomerLineChart = () => {
  const data = customerData;

  const series = [
    { name: 'Priority', data: data.map((item) => item.priority) },
    { name: 'Mid target', data: data.map((item) => item.midTarget) },
    { name: 'Low', data: data.map((item) => item.low) },
  ];

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    colors: ['#06B496', '#EBE2A2', '#E3696A'],
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: data.map((item) => item.date),
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: '#242424',
        },
        formatter: (value) => {
          return new Date(value).toLocaleString('en-US', {
            month: 'short',
          });
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: '#242424',
        },
        formatter: (value) => {
          return getNumberSuffix(value);
        },
      },
    },

    legend: {
      position: 'right',
      offsetY: 40,
      itemMargin: {
        vertical: 10,
      },
      fontSize: '14px',
      fontWeight: 600,
    },
    responsive: [
      {
        breakpoint: 750,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: 'top',
            offsetY: 0,
            horizontalAlign: 'right',
            fontSize: '12px',
            fontWeight: 500,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontWeight: 500,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontWeight: 500,
              },
              formatter: (value) => {
                return getNumberSuffix(value);
              },
            },
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={250}
    />
  );
};

export default CustomerLineChart;
