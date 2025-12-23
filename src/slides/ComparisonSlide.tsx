import { motion } from 'framer-motion';
import { reportData } from '../data/report-data';
import { reportData2024, calculateGrowth, formatGrowth } from '../data/report-data-2024';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon, platformColors } from '../config/platforms';

export function ComparisonSlide() {
  // Accurate data from files
  const data2024 = {
    totalViews: reportData2024.totals.totalViews,
    totalFollowers: reportData2024.totals.totalFollowers,
    newFollowers: reportData2024.totals.newFollowers,
  };

  const data2025 = {
    totalViews: reportData.totals.viewsWithFacebook,
    totalFollowers: reportData.totals.totalFollowers,
    newFollowers: reportData.totals.newFollowers2025,
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
      gradient: 'from-purple-500/20 to-violet-600/20',
      borderColor: 'border-purple-500/30',
      accentColor: 'text-purple-400',
      valueColor: 'text-purple-300',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'إجمالي المتابعين',
      value2024: data2024.totalFollowers,
      value2025: data2025.totalFollowers,
      growth: followersGrowth,
      gradient: 'from-pink-500/20 to-rose-600/20',
      borderColor: 'border-pink-500/30',
      accentColor: 'text-pink-400',
      valueColor: 'text-pink-300',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'المتابعين الجدد',
      value2024: data2024.newFollowers,
      value2025: data2025.newFollowers,
      growth: newFollowersGrowth,
      gradient: 'from-orange-500/20 to-amber-600/20',
      borderColor: 'border-orange-500/30',
      accentColor: 'text-orange-400',
      valueColor: 'text-orange-300',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
  ];

  // Platform comparison data - YouTube split into Videos (long) and Shorts
  const platforms = [
    {
      key: 'youtube' as const,
      name: 'يوتيوب (حلقات)',
      views2024: reportData2024.platforms.youtube.videos,
      views2025: reportData.platforms.youtube.videosViews,
      followers2024: undefined,
      followers2025: undefined,
      isNew: false,
      isSubPlatform: true,
      gradient: 'from-red-500/10 to-red-600/20',
    },
    {
      key: 'youtube' as const,
      name: 'يوتيوب (شورتس)',
      views2024: reportData2024.platforms.youtube.shorts,
      views2025: reportData.platforms.youtube.shortsViews,
      followers2024: undefined,
      followers2025: undefined,
      isNew: false,
      isSubPlatform: true,
      gradient: 'from-red-500/10 to-red-600/20',
    },
    {
      key: 'tiktok' as const,
      name: 'تيك توك',
      views2024: reportData2024.platforms.tiktok.totalViews,
      views2025: reportData.platforms.tiktok.totalViews,
      followers2024: reportData2024.platforms.tiktok.totalFollowers,
      followers2025: reportData.platforms.tiktok.totalFollowers,
      isNew: false,
      gradient: 'from-cyan-500/10 to-pink-500/10',
    },
    {
      key: 'instagram' as const,
      name: 'انستغرام',
      views2024: reportData2024.platforms.instagram.totalViews,
      views2025: reportData.platforms.instagram.totalViews,
      followers2024: reportData2024.platforms.instagram.totalFollowers,
      followers2025: reportData.platforms.instagram.totalFollowers,
      isNew: false,
      gradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      key: 'facebook' as const,
      name: 'فيسبوك',
      views2024: 0,
      views2025: reportData.platforms.facebook.totalViews,
      followers2024: 0,
      followers2025: reportData.platforms.facebook.totalFollowers,
      isNew: true,
      gradient: 'from-blue-500/10 to-blue-600/20',
    },
  ];

  return (
    <div className="slide" dir="rtl">
      {/* Header with animated gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            مقارنة 2024 vs 2025
          </span>
        </h2>
        <p className="text-gray-400 text-sm">
          نمو بث حديث خلال عام كامل
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Row 1: Main Stats - 3 Cards */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border ${stat.borderColor} p-5 shadow-xl`}
            >
              {/* Decorative glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} blur-3xl opacity-50`} />

              {/* Header with icon */}
              <div className="flex items-center justify-center gap-2 mb-4 relative">
                <span className={stat.accentColor}>{stat.icon}</span>
                <p className="text-sm font-medium text-gray-300">{stat.title}</p>
              </div>

              {/* Year comparison */}
              <div className="flex items-center justify-center gap-3 mb-4 relative">
                {/* 2024 */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1 font-medium">2024</p>
                  <p className="text-lg font-bold text-gray-400 tabular-nums">
                    {formatNumber(stat.value2024)}
                  </p>
                </div>

                {/* Arrow with animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  className="flex items-center"
                >
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>

                {/* 2025 */}
                <div className="text-center">
                  <p className={`text-xs ${stat.accentColor} mb-1 font-medium`}>2025</p>
                  <p className={`text-xl font-bold ${stat.valueColor} tabular-nums`}>
                    {formatNumber(stat.value2025)}
                  </p>
                </div>
              </div>

              {/* Growth badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                className="text-center relative"
              >
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm shadow-lg shadow-emerald-500/10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {formatGrowth(stat.growth)}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Platform Cards */}
        <div className="grid grid-cols-5 gap-3">
          {platforms.map((platform, index) => {
            const vGrowth = platform.views2024 > 0 ? calculateGrowth(platform.views2024, platform.views2025) : 0;
            const fGrowth = platform.followers2024 && platform.followers2024 > 0 ? calculateGrowth(platform.followers2024, platform.followers2025 || 0) : 0;
            const hasFollowers = platform.followers2024 !== undefined;
            const platformColor = platformColors[platform.key];

            return (
              <motion.div
                key={`${platform.key}-${platform.name}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${platform.gradient} backdrop-blur-xl border border-white/10 p-3 shadow-lg hover:border-white/20 transition-all duration-300`}
              >
                {/* Platform Header */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <PlatformIcon platform={platform.key} size="sm" />
                  <span className="font-bold text-sm text-white/90">{platform.name}</span>
                </div>

                {/* Views Section */}
                <div className={`${hasFollowers ? 'mb-2' : ''} p-2.5 rounded-lg bg-black/30 border border-white/5`}>
                  <p className="text-xs text-gray-400 mb-2 text-center font-medium">المشاهدات</p>
                  <div className="text-center mb-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-gray-500 text-xs tabular-nums">
                        {platform.isNew ? '-' : formatNumber(platform.views2024)}
                      </span>
                      <span className="text-emerald-400 text-xs">→</span>
                      <span
                        className="font-bold text-sm tabular-nums"
                        style={{ color: platformColor }}
                      >
                        {formatNumber(platform.views2025)}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                      platform.isNew
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {platform.isNew ? 'جديد' : formatGrowth(vGrowth)}
                    </span>
                  </div>
                </div>

                {/* Followers Section - only for non-subplatforms */}
                {hasFollowers && (
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                    <p className="text-xs text-gray-400 mb-2 text-center font-medium">المتابعين</p>
                    <div className="text-center mb-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-gray-500 text-xs tabular-nums">
                          {platform.isNew ? '-' : formatNumber(platform.followers2024 || 0)}
                        </span>
                        <span className="text-emerald-400 text-xs">→</span>
                        <span
                          className="font-bold text-sm tabular-nums"
                          style={{ color: platformColor }}
                        >
                          {formatNumber(platform.followers2025 || 0)}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                        platform.isNew
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
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
