import ReactApexChart from 'react-apexcharts';
// import pingData from '@/constant/ping';
import convertTime from '@/utils/convertTime';
import styles from './NetworkReport.module.scss';

function TrafficChart({ selectedLocation }) {
  const monthlyPingResponse = [
    {
      min: 0.0763368606567383,
      date: '2023-07-31T18:15:00.000Z',
      max: 0.0763289928436279,
      avg: 0.0766677856445312,
      country: 'UAE',
    },
    {
      min: 0.188452005386353,
      date: '2023-07-31T18:15:00.000Z',
      max: 0.18840503692627,
      avg: 0.187242984771729,
      country: 'Germany',
    },
    {
      min: 0.231734037399292,
      date: '2023-07-31T18:15:00.000Z',
      max: 0.232000112533569,
      avg: 0.231781959533691,
      country: 'USA',
    },
    {
      min: 0.5,
      date: '2023-08-31T18:15:00.000Z',
      max: 0.7,
      avg: 0.8,
      country: 'UAE',
    },
    {
      min: 0.2,
      date: '2023-08-31T18:15:00.000Z',
      max: 0.18840503692627,
      avg: 0.187242984771729,
      country: 'Germany',
    },
    {
      min: 0.62,
      date: '2023-08-31T18:15:00.000Z',
      max: 0.45,
      avg: 0.32,
      country: 'USA',
    },
  ];

  const filterDataByCountry = (monthlyPingResponse, selectedLocation) => {
    const filteredData = monthlyPingResponse.filter(
      (entry) => entry.country === selectedLocation,
    );

    if (filteredData.length === 1) {
      const date = new Date(filteredData[0].date);
      date.setUTCMonth(date.getUTCMonth() - 1); // Subtract 1 month
      const oneMonthAgo = date.toISOString();

      // Create a new entry with the one month before date
      const newDataEntry = {
        min: 0, // You can set default values here
        max: 0,
        avg: 0,
        date: oneMonthAgo,
        country: selectedLocation,
      };

      // Add the new entry to the filtered data
      filteredData.push(newDataEntry);
    }

    return filteredData;
  };

  const pingData = filterDataByCountry(monthlyPingResponse, selectedLocation);

  const series = [
    {
      name: 'Minimum',
      data: pingData.map((data) => data.min),
    },
    {
      name: 'Maximum',
      data: pingData.map((data) => data.max),
    },
    {
      name: 'Average',
      data: pingData.map((data) => data.avg),
    },
  ];

  var options = {
    chart: {
      type: 'area',
      height: 350,
    },
    colors: ['#06B496', '#091E21', '#E3696A'],
    stroke: { width: 1.2, curve: ['smooth', 'straight', 'smooth'] },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      categories: pingData.map((data) => data?.date),
      labels: {
        show: true,
        rotate: -45, // Rotate x-axis labels for better readability
        formatter: function (val, timestamp) {
          const date = new Date(timestamp);
          if (date.getDate() === 1) {
            // Show the full date for the 1st day of each month
            return date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            });
          }
          return ''; // Hide other labels
        },
      },
      tickAmount: 5, // Ensure at least 5 ticks (data points) are displayed
      min: new Date(pingData[0]?.date).getTime(), // Set the minimum date
      max: new Date(pingData[0]?.date).setMonth(
        new Date(pingData[0]?.date).getMonth() + 5,
      ), // Set the maximum date (5 months ahead)
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return convertTime(val);
        },
      },
    },
    legend: {
      position: 'top',
      offsetY: 0,
      fontSize: '12px',
      fontWeight: 500,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'top',
            offsetY: 25,
          },
        },
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <ReactApexChart
        type="area"
        options={options}
        series={series}
        height={'100%'}
      />
    </div>
  );
}

export default TrafficChart;

/*
import ReactApexChart from 'react-apexcharts';
import pingData from '@/constant/ping';
import convertTime from '@/utils/convertTime';
import styles from './NetworkReport.module.scss';

function TrafficChart(selectedMonthlyPing) {
  console.log('TrafficChart(selectedMonthlyPing)', selectedMonthlyPing)
  const series = [
    {
      name: 'Minimum',
      data: selectedMonthlyPing?.min,
    },
    {
      name: 'Maximum',
      data: selectedMonthlyPing?.max,
    },
    {
      name: 'Average',
      data: selectedMonthlyPing?.avg,
    },
  ];

  var options = {
    chart: {
      type: 'area',
      height: 350,
    },
    colors: ['#06B496', '#091E21', '#E3696A'],
    stroke: { width: 1.2, curve: ['smooth', 'straight', 'smooth'] },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      categories: pingData.map((data) =>
        new Date(data.date).toLocaleDateString(),
      ),
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return convertTime(val);
        },
      },
    },
    legend: {
      position: 'top',
      offsetY: 0,
      fontSize: '12px',
      fontWeight: 500,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'top',
            offsetY: 25,
          },
        },
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <ReactApexChart
        type="area"
        options={options}
        series={series}
        height={'100%'}
      />
    </div>
  );
}

export default TrafficChart;

* */
