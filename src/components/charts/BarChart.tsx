import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
  }[];
  title?: string;
  horizontal?: boolean;
  stacked?: boolean;
}

export function BarChart({ labels, datasets, title, horizontal = false, stacked = false }: BarChartProps) {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderRadius: 8,
      borderSkipped: false,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ('y' as const) : ('x' as const),
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
            const value = horizontal ? context.parsed.x : context.parsed.y;
            return `${context.dataset.label || ''}: ${value?.toLocaleString() ?? 0}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked,
        grid: {
          color: 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#787774',
          font: {
            family: 'IBM Plex Sans Arabic',
          },
          callback: function(value: number | string) {
            if (horizontal && typeof value === 'number') {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
            }
            return value;
          },
        },
      },
      y: {
        stacked,
        grid: {
          color: 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#787774',
          font: {
            family: 'IBM Plex Sans Arabic',
          },
          callback: function(value: number | string) {
            if (!horizontal && typeof value === 'number') {
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
      <Bar data={data} options={options} />
    </div>
  );
}
