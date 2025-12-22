import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  colors: string[];
  title?: string;
  showLabels?: boolean;
}

export function DoughnutChart({ labels, data, colors, title, showLabels = true }: DoughnutChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors.map(() => 'rgba(255, 255, 255, 0.8)'),
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    locale: 'ar',
    plugins: {
      legend: {
        position: 'bottom' as const,
        rtl: true,
        textDirection: 'rtl',
        labels: {
          color: '#37352f',
          padding: 20,
          font: {
            family: 'IBM Plex Sans Arabic',
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#37352f',
        font: {
          family: 'IBM Plex Sans Arabic',
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(55, 53, 47, 0.9)',
        titleFont: {
          family: 'IBM Plex Sans Arabic',
        },
        bodyFont: {
          family: 'IBM Plex Sans Arabic',
        },
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: showLabels,
        color: '#37352f',
        font: {
          family: 'IBM Plex Sans Arabic',
          weight: 'bold' as const,
          size: 14,
        },
        formatter: (value: any, context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return percentage + '%';
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
