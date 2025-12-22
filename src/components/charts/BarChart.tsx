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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatChartNumber } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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
  showDataLabels?: boolean;
  showLabelsOnBars?: boolean; // Show label names on the bars
}

export function BarChart({ labels, datasets, title, horizontal = false, stacked = false, showDataLabels = true, showLabelsOnBars = false }: BarChartProps) {
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
    animation: {
      duration: 1200,
      easing: 'easeOutQuart' as const,
      delay: (context: any) => context.dataIndex * 50, // Stagger animation
    },
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
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
            return `${context.dataset.label || ''}: ${formatChartNumber(value ?? 0)}`;
          },
        },
      },
      datalabels: {
        display: showDataLabels || showLabelsOnBars,
        color: showLabelsOnBars ? '#ffffff' : '#37352f',
        anchor: showLabelsOnBars ? ('center' as const) : (horizontal ? ('end' as const) : ('end' as const)),
        align: showLabelsOnBars ? ('center' as const) : (horizontal ? ('end' as const) : ('top' as const)),
        offset: showLabelsOnBars ? 0 : 6,
        font: {
          family: 'IBM Plex Sans Arabic',
          weight: 'bold' as const,
          size: showLabelsOnBars ? 12 : 13,
        },
        textShadowColor: showLabelsOnBars ? 'rgba(0, 0, 0, 0.6)' : undefined,
        textShadowBlur: showLabelsOnBars ? 4 : 0,
        formatter: (value: number, context: any) => {
          if (showLabelsOnBars) {
            const label = labels[context.dataIndex];
            return label;
          }
          return formatChartNumber(value);
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
            size: 11,
          },
          callback: function(value: number | string) {
            if (horizontal && typeof value === 'number') {
              return formatChartNumber(value);
            }
            return value;
          },
        },
      },
      y: {
        stacked,
        display: !(horizontal && showLabelsOnBars), // Hide Y-axis when labels are on bars
        grid: {
          color: horizontal ? 'transparent' : 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#37352f',
          font: {
            family: 'IBM Plex Sans Arabic',
            size: horizontal ? 12 : 11,
            weight: horizontal ? ('bold' as const) : ('normal' as const),
          },
          padding: horizontal ? 8 : 4,
          callback: function(value: number | string) {
            if (!horizontal && typeof value === 'number') {
              return formatChartNumber(value);
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
