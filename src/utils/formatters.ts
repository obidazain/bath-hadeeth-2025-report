// Number formatting utilities - K/M/B format

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const formatNumberArabic = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' مليار';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' مليون';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' ألف';
  }
  return num.toString();
};

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return ((value / total) * 100).toFixed(1) + '%';
};

export const formatWatchTime = (hours: number): string => {
  if (hours >= 1_000_000) {
    return (hours / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M ساعة';
  }
  if (hours >= 1_000) {
    return (hours / 1_000).toFixed(1).replace(/\.0$/, '') + 'K ساعة';
  }
  return hours.toLocaleString() + ' ساعة';
};

// Re-export platform colors from centralized config
export { platformColors, platformChartColors } from '../config/platforms';

// Chart number formatter for axis labels (K/M/B)
export const formatChartNumber = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

// Notion-friendly chart colors for light theme
export const chartColors = {
  primary: '#2383e2',
  secondary: '#9a6dd7',
  youtube: '#FF0000',
  tiktok: '#000000',
  instagram: '#E4405F',
  facebook: '#1877F2',
  green: '#4dab9a',
  orange: '#fa9f47',
  yellow: '#f7c948',
};
