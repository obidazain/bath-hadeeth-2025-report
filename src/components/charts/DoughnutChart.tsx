import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatChartNumber } from '../../utils/formatters';

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
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        rtl: true,
        textDirection: 'rtl',
        labels: {
          color: '#37352f',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
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
            return `${context.label}: ${formatChartNumber(context.parsed)} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: showLabels,
        color: '#ffffff',
        anchor: 'center' as const,
        align: 'center' as const,
        font: {
          family: 'IBM Plex Sans Arabic',
          weight: 'bold' as const,
          size: 14,
        },
        textStrokeColor: 'rgba(0, 0, 0, 0.3)',
        textStrokeWidth: 2,
        formatter: (value: any, context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          // Only show label if percentage is significant enough
          return parseInt(percentage) >= 5 ? percentage + '%' : '';
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
