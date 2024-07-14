import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Plugin,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import theme from '@/styles/theme';

const BmiChart = ({ bmi }: { bmi: number }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const needleValue = () => {
    if (bmi <= 14) {
      return 0;
    } else if (bmi >= 35) {
      return 21;
    } else {
      return bmi - 14;
    }
  };

  // 저제중: 18.5 미만, 정상체중: 18.5 ~ 22.9, 과체중: 23 ~ 24.9,
  // 비만: 25 ~ 29.9, 고도비만: 30이상
  const data: ChartData<'doughnut'> = {
    labels: ['저체중', '정상', '과체중', '비만', '고도비만'],
    datasets: [
      {
        label: 'BMI',
        data: [4.5, 4.5, 2, 5, 5],
        datalabels: {
          formatter: (value, context) => {
            const labels = context.chart.data.labels;
            if (labels && Array.isArray(labels)) {
              return labels[context.dataIndex];
            }
            return null;
          },
          align: 'center',
          anchor: 'center',
          color: theme.black,
          font: {
            family: 'omyudapretty',
          },
        },
        backgroundColor: [
          theme.blue,
          theme.darkgreen,
          theme.yellow,
          theme.orange,
          theme.red,
        ],
        borderColor: [
          theme.blue,
          theme.darkgreen,
          theme.yellow,
          theme.orange,
          theme.red,
        ],
        circumference: 180, // 도넛 반 자르기
        rotation: 270, // 도넛
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '60%', // 도넛차트 두께
    layout: {
      padding: {
        bottom: 30,
      },
    },
    aspectRatio: 1.6, // 차트 캔버스 비율
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const gaugeNeedle: Plugin<'doughnut'> = {
    id: 'gaugeNeedle',
    afterDatasetsDraw(chart: ChartJS<'doughnut'>) {
      const { ctx, data } = chart;

      ctx.save();
      const dataset = chart.getDatasetMeta(0).data[0];
      const { x, y, outerRadius, innerRadius } = dataset as any;
      const widthSlice = (outerRadius - innerRadius) / 2;
      const radius = 8;
      const angle = Math.PI / 180;

      const { circumference } = dataset as any;
      const circumferenceValue =
        (circumference / Math.PI / data.datasets[0].data[0]) * needleValue();

      ctx.translate(x, y);
      ctx.rotate(Math.PI * (circumferenceValue + 1.5));

      // needle
      ctx.beginPath();
      ctx.strokeStyle = theme.black;
      ctx.fillStyle = theme.black;
      ctx.lineWidth = 1;
      ctx.moveTo(0 - radius, 0);
      ctx.lineTo(0, 0 - innerRadius - widthSlice);
      ctx.lineTo(0 + radius, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // dot
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, angle * 360, false);
      ctx.fill();

      ctx.restore();
    },
  };

  const gaugeFlowMeter: Plugin<'doughnut'> = {
    id: 'gaugeFlowMeter',
    afterDatasetsDraw(chart: ChartJS<'doughnut'>) {
      const { ctx, data } = chart;

      ctx.save();
      const { x, y } = chart.getDatasetMeta(0).data[0];

      const dataset = chart.getDatasetMeta(0).data[0];
      const { circumference } = dataset as any;

      const circumferenceValue =
        (circumference / Math.PI / data.datasets[0].data[0]) * needleValue();
      const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

      const bmiValue = dataTotal * circumferenceValue + 14;
      ctx.font = '18px omyudapretty';
      ctx.fillStyle = theme.black;
      ctx.textAlign = 'center';
      ctx.fillText(
        `${bmi === 0 ? '몸무게를 입력하세요' : bmiValue === 0 || bmiValue === 35 ? `BMI : ${bmi.toFixed(1)}` : `BMI : ${bmiValue.toFixed(1)}`}`,
        x,
        y + 30,
      );
    },
  };

  const plugins: Plugin<'doughnut'>[] = [
    gaugeNeedle,
    gaugeFlowMeter,
    ChartDataLabels as unknown as Plugin<'doughnut'>,
  ];

  return <Doughnut data={data} options={options} plugins={plugins} />;
};

export default BmiChart;
