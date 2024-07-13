import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Plugin,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import theme from '@/styles/theme';
import { endianness } from 'os';

const RecordChart = ({
  xInfo,
  yInfo,
}: {
  xInfo: string[][];
  yInfo: number[];
}) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const data: ChartData<'line'> = {
    labels: xInfo,
    datasets: [
      {
        pointBackgroundColor: theme['darkgreen'],
        pointBorderWidth: 1,
        borderColor: theme['darkgreen'],
        borderWidth: 1.5,
        data: yInfo,
        datalabels: {
          font: {
            family: 'omyudapretty',
            size: 13,
          },
          color: theme.black,
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };

  const options: ChartOptions<'line'> = {
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
          color: ctx =>
            ctx.index === 0 ? theme['darkgreen'] : theme['lightgreen'],
          drawOnChartArea: true,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        afterDataLimits: (scale: { max: number; min: number }) => {
          scale.max = scale.max + 2;
          scale.min = scale.min - 2;
        },
      },
    },
  };

  const plugins: Plugin<'line'>[] = [ChartDataLabels];

  return (
    <Line
      data={data}
      options={options}
      style={{ width: '18rem', height: '13rem' }}
      plugins={plugins}
    />
  );
};

export default RecordChart;
