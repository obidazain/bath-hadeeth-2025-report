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
    },
    {
      key: 'tiktok' as const,
      name: 'تيك توك',
      views2024: reportData2024.platforms.tiktok.totalViews,
      views2025: reportData.platforms.tiktok.totalViews,
      followers2024: reportData2024.platforms.tiktok.totalFollowers,
      followers2025: reportData.platforms.tiktok.totalFollowers,
      isNew: false,
    },
    {
      key: 'instagram' as const,
      name: 'انستغرام',
      views2024: reportData2024.platforms.instagram.totalViews,
      views2025: reportData.platforms.instagram.totalViews,
      followers2024: reportData2024.platforms.instagram.totalFollowers,
      followers2025: reportData.platforms.instagram.totalFollowers,
      isNew: false,
    },
    {
      key: 'facebook' as const,
      name: 'فيسبوك',
      views2024: 0,
      views2025: reportData.platforms.facebook.totalViews,
      followers2024: 0,
      followers2025: reportData.platforms.facebook.totalFollowers,
      isNew: true,
    },
  ];

  return (
    <div className="slide" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">
          <span className="text-gradient">مقارنة 2024 vs 2025</span>
        </h2>
        <p className="text-notion-text-secondary text-sm">
          نمو بث حديث خلال عام كامل
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Row 1: Main Stats - 3 Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Total Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10"
          >
            <p className="text-sm text-gray-400 mb-3 text-center">إجمالي المشاهدات</p>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500 mb-1">2024</p>
                <p className="text-lg font-bold text-gray-400">{formatNumber(data2024.totalViews)}</p>
              </div>
              <div className="text-2xl text-green-500">→</div>
              <div className="text-center flex-1">
                <p className="text-xs text-purple-400 mb-1">2025</p>
                <p className="text-lg font-bold text-purple-500">{formatNumber(data2025.totalViews)}</p>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 font-bold">
                {formatGrowth(viewsGrowth)}
              </span>
            </div>
          </motion.div>

          {/* Total Followers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10"
          >
            <p className="text-sm text-gray-400 mb-3 text-center">إجمالي المتابعين</p>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500 mb-1">2024</p>
                <p className="text-lg font-bold text-gray-400">{formatNumber(data2024.totalFollowers)}</p>
              </div>
              <div className="text-2xl text-green-500">→</div>
              <div className="text-center flex-1">
                <p className="text-xs text-pink-400 mb-1">2025</p>
                <p className="text-lg font-bold text-pink-500">{formatNumber(data2025.totalFollowers)}</p>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 font-bold">
                {formatGrowth(followersGrowth)}
              </span>
            </div>
          </motion.div>

          {/* New Followers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10"
          >
            <p className="text-sm text-gray-400 mb-3 text-center">المتابعين الجدد</p>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500 mb-1">2024</p>
                <p className="text-lg font-bold text-gray-400">{formatNumber(data2024.newFollowers)}</p>
              </div>
              <div className="text-2xl text-green-500">→</div>
              <div className="text-center flex-1">
                <p className="text-xs text-orange-400 mb-1">2025</p>
                <p className="text-lg font-bold text-orange-500">{formatNumber(data2025.newFollowers)}</p>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 font-bold">
                {formatGrowth(newFollowersGrowth)}
              </span>
            </div>
          </motion.div>
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
                transition={{ delay: 0.25 + index * 0.05 }}
                className="bg-white/5 backdrop-blur rounded-2xl p-3 border border-white/10"
              >
                {/* Platform Header */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <PlatformIcon platform={platform.key} size="sm" />
                  <span className="font-bold text-sm">{platform.name}</span>
                </div>

                {/* Views Section */}
                <div className={`${hasFollowers ? 'mb-3' : ''} p-2 rounded-xl bg-black/20`}>
                  <p className="text-xs text-gray-400 mb-1 text-center">المشاهدات</p>
                  <div className="text-center mb-1">
                    <span className="text-gray-500 text-xs">{platform.isNew ? '-' : formatNumber(platform.views2024)}</span>
                    <span className="text-gray-500 mx-1">→</span>
                    <span className="font-bold text-sm" style={{ color: platformColors[platform.key] }}>
                      {formatNumber(platform.views2025)}
                    </span>
                  </div>
                  <p className={`text-center text-xs font-bold ${platform.isNew ? 'text-blue-400' : 'text-green-400'}`}>
                    {platform.isNew ? 'جديد' : formatGrowth(vGrowth)}
                  </p>
                </div>

                {/* Followers Section - only for non-subplatforms */}
                {hasFollowers && (
                  <div className="p-2 rounded-xl bg-black/20">
                    <p className="text-xs text-gray-400 mb-1 text-center">المتابعين</p>
                    <div className="text-center mb-1">
                      <span className="text-gray-500 text-xs">{platform.isNew ? '-' : formatNumber(platform.followers2024 || 0)}</span>
                      <span className="text-gray-500 mx-1">→</span>
                      <span className="font-bold text-sm" style={{ color: platformColors[platform.key] }}>
                        {formatNumber(platform.followers2025 || 0)}
                      </span>
                    </div>
                    <p className={`text-center text-xs font-bold ${platform.isNew ? 'text-blue-400' : 'text-green-400'}`}>
                      {platform.isNew ? 'جديد' : formatGrowth(fGrowth)}
                    </p>
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
