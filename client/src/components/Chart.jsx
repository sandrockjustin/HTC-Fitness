import React from 'react';
import { LineChart, ChartsReferenceLine } from '@mui/x-charts';

const Chart = ({ weights, goalWeight }) => {
  const formattedData = weights.map((weightEntry) => ({
    date: new Date(weightEntry.date).toISOString().split('T')[0],
    // Format date as YYYY-MM-DD
    weight: parseFloat(weightEntry.weight),
  }));
  const allWeights = weights.map((weightEntry) => weightEntry.weight);
  // Calculate the minimum and maximum weights, including the goal weight
  const actualMinWeight = Math.min(...allWeights);
  const actualMaxWeight = Math.max(...allWeights);

  // Add padding to min and max weights, but ensure that it also considers goalWeight
  const minWeight = actualMinWeight === Math.min(...allWeights, goalWeight)
    ? actualMinWeight - 5
    : Math.min(actualMinWeight, goalWeight - 5);

  const maxWeight = actualMaxWeight === Math.max(...allWeights, goalWeight)
    ? actualMaxWeight + 5
    : Math.max(actualMaxWeight, goalWeight + 5);

  return (
    <LineChart
      dataset={formattedData}
      xAxis={[{
        dataKey: 'date',
        scaleType: 'band',
        label: 'Date',
      }]}
      yAxis={[{
        min: minWeight,
        max: maxWeight,
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
      {goalWeight > 0 && (
        <ChartsReferenceLine
          y={goalWeight}
          label={`Goal Weight: ${goalWeight} lbs`}
          lineStyle={{ stroke: 'orange', strokeWidth: 2, strokeDasharray: '4 4' }}
          labelAlign='start'
      />
      )}
    </LineChart>
  );
};

export default Chart;
