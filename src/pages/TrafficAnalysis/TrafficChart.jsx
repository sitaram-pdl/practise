import trafficData from '@/constant/traffic';
import convertTime from '@/utils/convertTime';
import ReactApexChart from 'react-apexcharts';

function TrafficChart() {
  const series = [
    {
      name: 'Engagement',
      data: trafficData.map((data) => data.engagement),
    },
  ];

  var options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
    },
    stroke: {
      width: 2,
      colors: '#1B9876',
      curve: 'smooth',
    },

    xaxis: {
      type: 'datetime',
      categories: trafficData.map((data) =>
        new Date(data.date).toLocaleDateString(),
      ),
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return convertTime(val);
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} height={300} />
    </div>
  );
}

export default TrafficChart;
