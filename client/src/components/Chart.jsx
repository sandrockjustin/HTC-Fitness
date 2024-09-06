import React from 'react';
import { LineChart, ChartsReferenceLine } from '@mui/x-charts';

const sampleData = [
  { date: '2024-08-01', weight: 250 },
  { date: '2024-08-02', weight: 248 },
  { date: '2024-08-03', weight: 248.2 },
  { date: '2024-08-04', weight: 249 },
  { date: '2024-08-05', weight: 246.7 },
  { date: '2024-08-06', weight: 246 },
  { date: '2024-08-07', weight: 248.1 },
];

const goalWeight = 248;

const Chart = () => (
  <LineChart
    dataset={sampleData}
    xAxis={[{
      dataKey: 'date',
      scaleType: 'band',
      label: 'Date',
    }]}
    series={[{
      dataKey: 'weight',
      label: 'Weight (lbs.)',
      color: '#1976d2',
    }]}
    height={600}
    grid={{ vertical: true, horizontal: true }}
    sx={{
      backgroundColor: '#303030',
      borderRadius: '1rem',
      padding: '1rem',
      mt: 2,
    }}
  >
    <ChartsReferenceLine
      y={goalWeight}
      label={`Goal Weight: ${goalWeight} lbs`}
      lineStyle={{ stroke: 'orange', strokeWidth: 2, strokeDasharray: '4 4' }}
      labelAlign='start'
    />
  </LineChart>
);

export default Chart;
