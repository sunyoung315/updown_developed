import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import theme from '@/styles/theme';

const RecordChart = ({
  xInfo,
  yInfo,
}: {
  xInfo: string[][];
  yInfo: number[];
}) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const data = {
    labels: xInfo,
    datasets: [
      {
        pointBackgroundColor: theme['darkgreen'],
        pointBorderWidth: 1,
        borderColor: theme['darkgreen'],
        borderWidth: 1.5,
        data: yInfo,
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
          width: 0.5,
        },
        border: {
          display: true,
          color: theme['darkgreen'],
          width: 1.5,
        },
        ticks: {
          color: theme['black'],
          font: {
            size: 12.5,
            family: 'omyudapretty',
          },
        },
      },
      y: {
        grid: {
          color: 'transparent',
          width: 0.5,
        },
        border: {
          display: true,
          color: theme['darkgreen'],
          width: 1.5,
        },
        ticks: {
          color: theme['black'],
          font: {
            size: 12.5,
            family: 'omyudapretty',
          },
        },
        afterDataLimits: (scale: { max: number; min: number }) => {
          scale.max = scale.max + 2;
          scale.min = scale.min - 2;
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      style={{ width: '18rem', height: '13rem' }}
    />
  );
};

export default RecordChart;
