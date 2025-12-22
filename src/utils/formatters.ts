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

// Platform colors
export const platformColors = {
  youtube: '#FF0000',
  tiktok: '#000000',
  instagram: '#E4405F',
  facebook: '#1877F2',
  spotify: '#1DB954',
  applePodcasts: '#9933CC',
};

// Notion-friendly chart colors for light theme
export const chartColors = {
  primary: '#2383e2',
  secondary: '#9a6dd7',
  youtube: '#eb5757',
  tiktok: '#37352f',
  instagram: '#e255a1',
  facebook: '#529cca',
  green: '#4dab9a',
  orange: '#fa9f47',
  yellow: '#f7c948',
};

// Chart colors with proper contrast for light theme
export const chartColorsLight = {
  youtube: 'rgba(235, 87, 87, 0.85)',
  tiktok: 'rgba(55, 53, 47, 0.85)',
  instagram: 'rgba(226, 85, 161, 0.85)',
  facebook: 'rgba(82, 156, 202, 0.85)',
};
