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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
  title?: string;
}

export function LineChart({ labels, datasets, title }: LineChartProps) {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3,
      fill: dataset.fill ?? true,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    locale: 'ar',
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        textDirection: 'rtl',
        labels: {
          color: '#37352f',
          font: {
            family: 'IBM Plex Sans Arabic',
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
            return `${context.dataset.label || ''}: ${context.parsed.y?.toLocaleString() ?? 0}`;
          },
        },
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
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#787774',
          font: {
            family: 'IBM Plex Sans Arabic',
          },
          callback: function(value: number | string) {
            if (typeof value === 'number') {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}
