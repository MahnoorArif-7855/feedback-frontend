import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const FeedbackBarChart = ({ datas }) => {
  return (
    <BarChart
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 25,
      }}
      barGap={20}
      width={800}
      height={650}
      data={datas}
      padding={{ left: 30 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis
        verticalAnchor='start'
        interval={0}
        dataKey='name'
        padding={{ top: 20, left: 30 }}
        angle={-70}
        textAnchor='end'
        height={300}
      />

      <YAxis />
      <Tooltip />
      <Bar barSize={30} dataKey='count' fill='#f28c6f' />
    </BarChart>
  );
};

export default FeedbackBarChart;
