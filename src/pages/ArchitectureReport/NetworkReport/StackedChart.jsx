import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StackedBarChart = () => {
  // Sample data for this week and last week
  const data = [
    {
      time: '4pm',
      thisWeek: 6,
      lastWeek: 4.5,
    },
    {
      time: '6pm',
      thisWeek: 8,
      lastWeek: 5,
    },
    {
      time: '9pm',
      thisWeek: 7,
      lastWeek: 4.5,
    },
    {
      time: '12am',
      thisWeek: 7.5,
      lastWeek: 5,
    },
    {
      time: '1am',
      thisWeek: 8,
      lastWeek: 5,
    },
    {
      time: '4am',
      thisWeek: 8,
      lastWeek: 6,
    },
    {
      time: '6am',
      thisWeek: 8,
      lastWeek: 6,
    },
    {
      time: '8am',
      thisWeek: 8,
      lastWeek: 6,
    },
    {
      time: '11am',
      thisWeek: 8,
      lastWeek: 8,
    },
  ];

  // Extracting data for the chart
  const categories = data.map((item) => item.time);
  const thisWeekData = data.map((item) => item.thisWeek);
  const lastWeekData = data.map((item) => item.lastWeek);

  // Chart options
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        show: false,
      },
    },
    colors: ['#ccc', '#1b9876'],
    dataLabels: {
      enabled: false,
      position: 'top',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15px',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: false,
    },
  };

  // Chart series
  const series = [
    {
      name: 'Last Week',
      data: lastWeekData,
    },
    {
      name: 'This Week',
      data: thisWeekData,
    },
  ];

  return (
    <div style={{ height: 250, width: '100%' }}>
      <ReactApexChart
        width={'100%'}
        height={'100%'}
        options={options}
        series={series}
        type="bar"
      />
    </div>
  );
};

export default StackedBarChart;
