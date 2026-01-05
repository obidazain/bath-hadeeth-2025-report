import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatChartNumber } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string | string[];
    backgroundColor?: string;
    fill?: boolean;
    pointBackgroundColor?: string | string[];
    pointBorderColor?: string | string[];
    segment?: {
      borderColor?: (ctx: any) => string;
    };
  }[];
  title?: string;
}

export function LineChart({ labels, datasets, title }: LineChartProps) {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
      borderWidth: 3,
      fill: dataset.fill ?? true,
      pointBackgroundColor: dataset.pointBackgroundColor || dataset.borderColor,
      pointBorderColor: dataset.pointBorderColor || dataset.borderColor,
      segment: dataset.segment,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    locale: 'ar',
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        textDirection: 'rtl',
        labels: {
          color: '#37352f',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'line',
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#37352f',
        bodyColor: '#37352f',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'IBM Plex Sans Arabic',
          size: 13,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: 'IBM Plex Sans Arabic',
          size: 12,
        },
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label || ''}: ${formatChartNumber(context.parsed.y ?? 0)}`;
          },
        },
      },
      datalabels: {
        display: false, // Disable data labels on line charts to avoid overlap
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#787774',
          font: {
            family: 'IBM Plex Sans Arabic',
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#787774',
          font: {
            family: 'IBM Plex Sans Arabic',
            size: 11,
          },
          callback: function(value: number | string) {
            if (typeof value === 'number') {
              return formatChartNumber(value);
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
}
