import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

const barColors = ['#5DB39B', '#E3696A', '#1B9876', '#06B49659'];

// const data = [
//   { name: "Daily visitors", uv: 65 },
//   { name: "Monthly visitors", uv: 59 },
//   { name: "Page per visit", uv: 180 },
//   { name: "Visit duration", uv: 81 },
// ];

function formatCompactNumber(number) {
  if (number < 0) {
    return '-' + formatCompactNumber(-1 * number);
  }
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
}

const renderBar = (props) => {
  const { fill, x, y, width, height } = props;
  const borderRadius = 10; // Set the border radius value

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={50}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        fill={fill}
      />
    </g>
  );
};

const BarChartComponent = ({ data }) => {
  console.log('BarChartComponent: data', data);
  // const list = [];
  // data.map(item => {
  //   const obj = {
  //     name: item.name,
  //     uv: data.number
  //   }
  //   list.push(obj);
  // });
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <XAxis
          dataKey="name"
          label={{ position: 'insideBottom', offset: -10 }}
        />
        <YAxis
          label={{ angle: -90, position: 'insideLeft', offset: 10 }}
          tickFormatter={formatCompactNumber}
        />
        <Bar dataKey="number" fill={data.color} barSize={60} shape={renderBar}>
          {data.map((item, index) => (
            <Cell key={`bar-cell-${index}`} fill={barColors[index]}></Cell>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
