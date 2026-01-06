import { motion } from 'framer-motion';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon } from '../config/platforms';

export function ComparisonSlide() {
  // Main stats configuration - Updated from /Users/obidazain/Downloads/ana files
  // 2025 Total Views = YouTube (278,787,403) + TikTok (382,344,000) + Instagram (182,975,157) + Facebook (385,106,587) = 1,229,213,147
  const mainStats = [
    {
      title: 'إجمالي المشاهدات',
      value2024: 717152811, // From report-data-2024.ts
      value2025: 1229213147, // Sum of all platforms 2025
    },
    {
      title: 'إجمالي المتابعين',
      value2024: 2995654, // From report-data-2024.ts
      value2025: 8200537, // From Total Followers.csv
    },
    {
      title: 'مدة المشاهدة "يوتيوب"',
      value2024: 10500000, // Estimated 2024
      value2025: 26598566, // From YouTube.csv watch time
    },
    {
      title: 'عدد الحلقات',
      value2024: 373,
      value2025: 438,
    },
    {
      title: 'عدد الضيوف',
      value2024: 253,
      value2025: 143,
    },
    {
      title: 'عدد المنشورات',
      value2024: 31000,
      value2025: 51000,
    },
  ];

  // Platform stats - Updated from /Users/obidazain/Downloads/ana files
  const platformStats = [
    {
      key: 'youtube' as const,
      name: 'يوتيوب',
      views2024: 268408988, // From report-data-2024.ts
      views2025: 278787403, // From YouTube.csv
      shorts2024: 222957622, // From report-data-2024.ts
      shorts2025: 219138867, // From YouTube.csv shorts
      videos2024: 45451366, // From report-data-2024.ts
      videos2025: 59648536, // From YouTube.csv videos
      followers2024: 1208959, // From report-data-2024.ts
      followers2025: 2479265, // From Total Followers.csv
      hasBreakdown: true,
    },
    {
      key: 'tiktok' as const,
      name: 'تيك توك',
      views2024: 302209377, // From report-data-2024.ts
      views2025: 382344000, // From TikTok.csv
      followers2024: 1212474, // From report-data-2024.ts
      followers2025: 2367000, // From Total Followers.csv
    },
    {
      key: 'instagram' as const,
      name: 'انستغرام',
      views2024: 146534446, // From report-data-2024.ts
      views2025: 182975157, // From Instagram.csv
      followers2024: 574221, // From report-data-2024.ts
      followers2025: 1262049, // From Total Followers.csv
    },
    {
      key: 'facebook' as const,
      name: 'فيسبوك',
      views2024: 0, // Facebook was in testing phase in 2024
      views2025: 385106587, // From Facebook.csv
      followers2024: 0,
      followers2025: 2092223, // From Total Followers.csv
      isNew: true,
    },
  ];

  return (
    <div className="slide bg-notion-bg flex flex-col justify-center items-center min-h-screen px-2 py-1" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-2">
          <span className="text-gradient">الأرقام الرئيسية</span>
        </h2>
        <p className="text-notion-text-secondary text-lg">
          مقارنة 2024 ⟷ 2025
        </p>
      </motion.div>

      <div className="w-full max-w-[75%] mx-auto flex flex-col justify-center">
        {/* Section 1: Main Stats Table */}
        <div className="mb-4">
          {/* Table Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-3 px-6 py-2 rounded-xl bg-gray-100"
          >
            <div className="text-right">
              <span className="text-lg font-bold text-accent-purple">المؤشر</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-600">2024</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-accent-pink">2025</span>
            </div>
          </motion.div>

          {/* Rows */}
          <div className="space-y-2">
            {mainStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.05 }}
                className="grid grid-cols-3 gap-4 items-center rounded-xl bg-notion-card border-2 border-notion-border py-4 px-6 hover:shadow-md transition-shadow"
              >
                <div className="text-right">
                  <p className="text-base font-semibold text-notion-text">{stat.title}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-notion-text-secondary tabular-nums">
                    {formatNumber(stat.value2024)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold tabular-nums text-accent-purple">
                    {formatNumber(stat.value2025)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-base font-semibold text-notion-text-secondary mb-3 text-center">
            إحصائيات المنصات
          </p>
          <div className="grid grid-cols-4 gap-3">
            {platformStats.map((platform, index) => (
              <motion.div
                key={platform.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.05 }}
                className="rounded-xl bg-notion-card border-2 border-notion-border p-3 text-center"
              >
                {/* Platform Header */}
                <div className="flex items-center justify-center gap-2 mb-3 pb-2 border-b border-notion-border">
                  <PlatformIcon platform={platform.key} size="sm" />
                  <span className="text-base font-bold text-notion-text">{platform.name}</span>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3">
                  {/* المشاهدات */}
                  <div>
                    <p className="text-xs font-semibold text-notion-text mb-1.5">المشاهدات</p>

                    {platform.hasBreakdown ? (
                      <div className="grid grid-cols-2 gap-2">
                        {/* حلقات طويلة */}
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-[10px] font-medium text-gray-600 mb-0.5">حلقات طويلة</p>
                          <p className="text-base font-bold text-accent-purple tabular-nums mb-0.5">
                            {formatNumber(platform.videos2025)}
                          </p>
                          <p className="text-xs font-semibold text-gray-500 tabular-nums">
                            2024: {formatNumber(platform.videos2024)}
                          </p>
                        </div>
                        {/* مقاطع قصيرة */}
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-[10px] font-medium text-gray-600 mb-0.5">مقاطع قصيرة</p>
                          <p className="text-base font-bold text-accent-purple tabular-nums mb-0.5">
                            {formatNumber(platform.shorts2025)}
                          </p>
                          <p className="text-xs font-semibold text-gray-500 tabular-nums">
                            2024: {formatNumber(platform.shorts2024)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xl font-bold text-accent-purple tabular-nums mb-1">
                          {formatNumber(platform.views2025)}
                        </p>
                        <p className="text-sm font-semibold text-gray-500 tabular-nums">
                          2024: {platform.isNew ? 'جديد' : formatNumber(platform.views2024)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* المتابعين */}
                  <div>
                    <p className="text-xs font-semibold text-notion-text mb-1.5">المتابعين</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-accent-pink tabular-nums mb-1">
                        {formatNumber(platform.followers2025)}
                      </p>
                      <p className="text-sm font-semibold text-gray-500 tabular-nums">
                        2024: {platform.isNew ? 'جديد' : formatNumber(platform.followers2024)}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
