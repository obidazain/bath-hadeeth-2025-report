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
  showLabels?: boolean; // Force show axis labels clearly
  compact?: boolean; // Compact mode for smaller charts
}

export function BarChart({ labels, datasets, title, horizontal = false, stacked = false, showDataLabels: _showDataLabels = true, showLabelsOnBars = false, showLabels = false, compact: _compact = false }: BarChartProps) {
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
        display: true, // Always show data labels
        color: showLabelsOnBars ? '#ffffff' : '#37352f',
        anchor: showLabelsOnBars ? ('center' as const) : (horizontal ? ('end' as const) : ('end' as const)),
        align: showLabelsOnBars ? ('center' as const) : (horizontal ? ('start' as const) : ('top' as const)),
        offset: showLabelsOnBars ? 0 : 4,
        font: {
          family: 'IBM Plex Sans Arabic',
          weight: 'bold' as const,
          size: showLabels ? 9 : (showLabelsOnBars ? 12 : 11),
        },
        textShadowColor: showLabelsOnBars ? 'rgba(0, 0, 0, 0.6)' : undefined,
        textShadowBlur: showLabelsOnBars ? 4 : 0,
        formatter: (value: number, context: any) => {
          if (showLabelsOnBars) {
            const label = labels[context.dataIndex];
            return label;
          }
          // Only show label for first dataset to avoid duplicate labels
          if (context.datasetIndex > 0) return '';
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
        display: true, // Always show Y-axis labels
        grid: {
          color: horizontal ? 'transparent' : 'rgba(55, 53, 47, 0.08)',
        },
        ticks: {
          color: '#37352f',
          font: {
            family: 'IBM Plex Sans Arabic',
            size: showLabels ? 11 : (horizontal ? 12 : 11),
            weight: ('bold' as const),
          },
          padding: horizontal ? 6 : 4,
          callback: function(value: number | string) {
            if (!horizontal && typeof value === 'number') {
              return formatChartNumber(value);
            }
            return value;
          },
        },
      },
    },
    layout: {
      padding: showLabels ? { left: 5, right: 15, top: 5, bottom: 5 } : {},
    },
  };

  return (
    <div className="w-full h-full min-h-[200px]">
      <Bar data={data} options={options} />
    </div>
  );
}
