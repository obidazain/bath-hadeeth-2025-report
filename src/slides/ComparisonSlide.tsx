import { motion } from 'framer-motion';
import { useTotals, usePlatforms } from '../store/dataStore';
import { reportData2024, calculateGrowth, formatGrowth } from '../data/report-data-2024';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon } from '../config/platforms';

export function ComparisonSlide() {
  const totals = useTotals();
  const platformsData = usePlatforms();

  // Accurate data from files
  const data2024 = {
    totalViews: reportData2024.totals.totalViews,
    totalFollowers: reportData2024.totals.totalFollowers,
    newFollowers: reportData2024.totals.newFollowers,
  };

  const data2025 = {
    totalViews: totals.viewsWithFacebook,
    totalFollowers: totals.totalFollowers,
    newFollowers: totals.newFollowers2025,
  };

  // Calculate accurate growth percentages
  const viewsGrowth = calculateGrowth(data2024.totalViews, data2025.totalViews);
  const followersGrowth = calculateGrowth(data2024.totalFollowers, data2025.totalFollowers);
  const newFollowersGrowth = calculateGrowth(data2024.newFollowers, data2025.newFollowers);

  // Main stats configuration
  const mainStats = [
    {
      title: 'إجمالي المشاهدات',
      value2024: data2024.totalViews,
      value2025: data2025.totalViews,
      growth: viewsGrowth,
    },
    {
      title: 'إجمالي المتابعين',
      value2024: data2024.totalFollowers,
      value2025: data2025.totalFollowers,
      growth: followersGrowth,
    },
    {
      title: 'المتابعين الجدد',
      value2024: data2024.newFollowers,
      value2025: data2025.newFollowers,
      growth: newFollowersGrowth,
    },
  ];

  // Platform comparison data - YouTube split into Videos (long) and Shorts
  const platforms = [
    {
      key: 'youtube' as const,
      name: 'يوتيوب (حلقات)',
      views2024: reportData2024.platforms.youtube.videos,
      views2025: platformsData.youtube.videosViews || 0,
      followers2024: undefined,
      followers2025: undefined,
      isNew: false,
    },
    {
      key: 'youtube' as const,
      name: 'يوتيوب (شورتس)',
      views2024: reportData2024.platforms.youtube.shorts,
      views2025: platformsData.youtube.shortsViews || 0,
      followers2024: undefined,
      followers2025: undefined,
      isNew: false,
    },
    {
      key: 'tiktok' as const,
      name: 'تيك توك',
      views2024: reportData2024.platforms.tiktok.totalViews,
      views2025: platformsData.tiktok.totalViews,
      followers2024: reportData2024.platforms.tiktok.totalFollowers,
      followers2025: platformsData.tiktok.totalFollowers || 0,
      isNew: false,
    },
    {
      key: 'instagram' as const,
      name: 'انستغرام',
      views2024: reportData2024.platforms.instagram.totalViews,
      views2025: platformsData.instagram.totalViews,
      followers2024: reportData2024.platforms.instagram.totalFollowers,
      followers2025: platformsData.instagram.totalFollowers || 0,
      isNew: false,
    },
    {
      key: 'facebook' as const,
      name: 'فيسبوك',
      views2024: 0,
      views2025: platformsData.facebook.totalViews,
      followers2024: 0,
      followers2025: platformsData.facebook.totalFollowers || 0,
      isNew: true,
    },
  ];

  return (
    <div className="slide bg-white dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          مقارنة 2024 vs 2025
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          نمو بث حديث خلال عام كامل
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Row 1: Main Stats - 3 Cards */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
            >
              {/* Title */}
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center mb-4">
                {stat.title}
              </p>

              {/* Year comparison - 2024 left, 2025 right */}
              <div className="flex items-center justify-between gap-3 mb-4" dir="ltr">
                {/* 2024 - Left */}
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-medium">2024</p>
                  <p className="text-lg font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                    {formatNumber(stat.value2024)}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* 2025 - Right */}
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium">2025</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white tabular-nums">
                    {formatNumber(stat.value2025)}
                  </p>
                </div>
              </div>

              {/* Growth badge */}
              <div className="text-center">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
                  stat.growth >= 0
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {stat.growth >= 0 ? '↑' : '↓'} {formatGrowth(stat.growth)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Platform Cards */}
        <div className="grid grid-cols-5 gap-3">
          {platforms.map((platform, index) => {
            const vGrowth = platform.views2024 > 0 ? calculateGrowth(platform.views2024, platform.views2025) : 0;
            const fGrowth = platform.followers2024 && platform.followers2024 > 0 ? calculateGrowth(platform.followers2024, platform.followers2025 || 0) : 0;
            const hasFollowers = platform.followers2024 !== undefined;

            return (
              <motion.div
                key={`${platform.key}-${platform.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 shadow-sm"
              >
                {/* Platform Header */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <PlatformIcon platform={platform.key} size="sm" />
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-200">{platform.name}</span>
                </div>

                {/* Views Section */}
                <div className={`${hasFollowers ? 'mb-2' : ''} p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center font-medium">المشاهدات</p>

                  {/* 2024 left, 2025 right */}
                  <div className="flex items-center justify-between gap-1 text-center mb-2" dir="ltr">
                    <span className="text-gray-400 dark:text-gray-500 text-xs tabular-nums flex-1">
                      {platform.isNew ? '-' : formatNumber(platform.views2024)}
                    </span>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">→</span>
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-200 tabular-nums flex-1">
                      {formatNumber(platform.views2025)}
                    </span>
                  </div>

                  <div className="text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                      platform.isNew
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {platform.isNew ? 'جديد' : formatGrowth(vGrowth)}
                    </span>
                  </div>
                </div>

                {/* Followers Section */}
                {hasFollowers && (
                  <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center font-medium">المتابعين</p>

                    {/* 2024 left, 2025 right */}
                    <div className="flex items-center justify-between gap-1 text-center mb-2" dir="ltr">
                      <span className="text-gray-400 dark:text-gray-500 text-xs tabular-nums flex-1">
                        {platform.isNew ? '-' : formatNumber(platform.followers2024 || 0)}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600 text-xs">→</span>
                      <span className="font-bold text-sm text-gray-700 dark:text-gray-200 tabular-nums flex-1">
                        {formatNumber(platform.followers2025 || 0)}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                        platform.isNew
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      }`}>
                        {platform.isNew ? 'جديد' : formatGrowth(fGrowth)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
