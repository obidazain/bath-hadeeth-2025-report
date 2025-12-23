import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { reportData } from '../data/report-data';
import { platformColors, PlatformIcon } from '../config/platforms';
import { formatNumber } from '../utils/formatters';

type PlatformKey = 'youtube' | 'tiktok' | 'instagram' | 'facebook';

export function MonthlyTrendSlide() {
  const [visiblePlatforms, setVisiblePlatforms] = useState<Record<PlatformKey, boolean>>({
    youtube: true,
    tiktok: true,
    instagram: true,
    facebook: true,
  });

  const months = reportData.monthly.map(m => m.monthName.slice(0, 3));

  // Calculate total views per platform
  const platformTotals = {
    youtube: reportData.monthly.reduce((sum, m) => sum + m.youtube.views, 0),
    tiktok: reportData.monthly.reduce((sum, m) => sum + m.tiktok.views, 0),
    instagram: reportData.monthly.reduce((sum, m) => sum + m.instagram.views, 0),
    facebook: reportData.monthly.reduce((sum, m) => sum + m.facebook.views, 0),
  };

  // Calculate total views per month (sum of all visible platforms)
  const monthlyTotals = reportData.monthly.map(m => {
    let total = 0;
    if (visiblePlatforms.youtube) total += m.youtube.views;
    if (visiblePlatforms.tiktok) total += m.tiktok.views;
    if (visiblePlatforms.instagram) total += m.instagram.views;
    if (visiblePlatforms.facebook) total += m.facebook.views;
    return total;
  });

  // Find highest month
  const maxMonthIndex = monthlyTotals.indexOf(Math.max(...monthlyTotals));
  const highestMonth = reportData.monthly[maxMonthIndex]?.monthName || 'غير متاح';
  const highestMonthViews = monthlyTotals[maxMonthIndex] || 0;

  // Calculate average
  const avgMonthlyViews = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length;

  // Find best platform from visible ones
  const visiblePlatformTotals = Object.entries(platformTotals)
    .filter(([key]) => visiblePlatforms[key as PlatformKey])
    .map(([key, value]) => ({ key, value }));
  const bestPlatform = visiblePlatformTotals.sort((a, b) => b.value - a.value)[0];

  const platformNames: Record<PlatformKey, string> = {
    youtube: 'YouTube',
    tiktok: 'TikTok',
    instagram: 'Instagram',
    facebook: 'Facebook',
  };

  const togglePlatform = (platform: PlatformKey) => {
    // Prevent disabling all platforms
    const newState = { ...visiblePlatforms, [platform]: !visiblePlatforms[platform] };
    const anyVisible = Object.values(newState).some(v => v);
    if (anyVisible) {
      setVisiblePlatforms(newState);
    }
  };

  const allDatasets = [
    {
      label: 'YouTube',
      data: reportData.monthly.map(m => m.youtube.views),
      borderColor: platformColors.youtube,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    {
      label: 'TikTok',
      data: reportData.monthly.map(m => m.tiktok.views),
      borderColor: platformColors.tiktok,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    {
      label: 'Instagram',
      data: reportData.monthly.map(m => m.instagram.views),
      borderColor: platformColors.instagram,
      backgroundColor: 'rgba(228, 64, 95, 0.1)',
    },
    {
      label: 'Facebook',
      data: reportData.monthly.map(m => m.facebook.views),
      borderColor: platformColors.facebook,
      backgroundColor: 'rgba(24, 119, 242, 0.1)',
    },
  ];

  // Filter datasets based on visibility
  const datasets = allDatasets.filter((_, index) => {
    const platforms: PlatformKey[] = ['youtube', 'tiktok', 'instagram', 'facebook'];
    return visiblePlatforms[platforms[index]];
  });

  // Add total line
  const datasetsWithTotal = [
    ...datasets,
    {
      label: 'الإجمالي',
      data: monthlyTotals,
      borderColor: '#9a6dd7',
      backgroundColor: 'rgba(154, 109, 215, 0.15)',
      borderWidth: 3,
      borderDash: [5, 5],
    },
  ];

  const platforms: PlatformKey[] = ['youtube', 'tiktok', 'instagram', 'facebook'];

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">النمو الشهري</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          المشاهدات الشهرية لكل منصة خلال 2025 <span className="text-primary">(اضغط على المنصة لإخفائها/إظهارها)</span>
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Platform Toggles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-4"
        >
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`card-compact text-center flex items-center justify-center gap-3 py-4 px-3 transition-all duration-300 cursor-pointer hover:scale-105 ${
                visiblePlatforms[platform]
                  ? 'opacity-100 ring-2 ring-primary/50'
                  : 'opacity-40 grayscale'
              }`}
            >
              <PlatformIcon platform={platform} size="md" />
              <div>
                <p
                  className="text-lg font-bold"
                  style={{ color: visiblePlatforms[platform] ? platformColors[platform] : '#888' }}
                >
                  {formatNumber(platformTotals[platform])}
                </p>
                <p className="text-xs text-notion-text-secondary">مشاهدة</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact flex-1 flex flex-col mb-3"
        >
          <div className="chart-container flex-1">
            <LineChart labels={months} datasets={datasetsWithTotal} />
          </div>
        </motion.div>

        {/* Monthly Totals Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-3"
        >
          <h4 className="text-xs text-notion-text-secondary text-center mb-2">مجموع المشاهدات الشهرية</h4>
          <div className="grid grid-cols-11 gap-1">
            {reportData.monthly.map((month, index) => (
              <div
                key={month.monthName}
                className={`card-compact text-center py-2 px-1 ${index === maxMonthIndex ? 'ring-2 ring-primary bg-primary/10' : ''}`}
              >
                <p className="text-[10px] text-notion-text-secondary">{month.monthName.slice(0, 3)}</p>
                <p className="text-xs sm:text-sm font-bold text-notion-text">{formatNumber(monthlyTotals[index])}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="card-compact text-center py-3">
            <p className="text-xs text-notion-text-secondary">أعلى شهر</p>
            <p className="text-base sm:text-lg font-bold text-accent-purple">{highestMonth}</p>
            <p className="text-xs text-notion-text-secondary">{formatNumber(highestMonthViews)} مشاهدة</p>
          </div>
          <div className="card-compact text-center py-3">
            <p className="text-xs text-notion-text-secondary">متوسط شهري</p>
            <p className="text-base sm:text-lg font-bold text-accent-pink">{formatNumber(Math.round(avgMonthlyViews))}</p>
            <p className="text-xs text-notion-text-secondary">مشاهدة</p>
          </div>
          <div className="card-compact text-center py-3">
            <p className="text-xs text-notion-text-secondary">أفضل منصة</p>
            <p className="text-base sm:text-lg font-bold text-accent-orange">
              {bestPlatform ? platformNames[bestPlatform.key as PlatformKey] : '-'}
            </p>
            <p className="text-xs text-notion-text-secondary">
              {bestPlatform ? `${formatNumber(bestPlatform.value)} مشاهدة` : '-'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
