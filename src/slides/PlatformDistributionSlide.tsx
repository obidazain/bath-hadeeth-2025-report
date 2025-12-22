import { motion } from 'framer-motion';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { platformColors, PlatformIcon } from '../config/platforms';

export function PlatformDistributionSlide() {
  const platforms = reportData.platforms;

  const viewsData = [
    platforms.tiktok.totalViews,
    platforms.facebook.totalViews,
    platforms.youtube.totalViews,
    platforms.instagram.totalViews,
  ];

  const followersData = [
    platforms.facebook.totalFollowers,
    platforms.tiktok.totalFollowers,
    platforms.youtube.totalSubscribers,
    platforms.instagram.totalFollowers,
  ];

  const labels = ['TikTok', 'Facebook', 'YouTube', 'Instagram'];
  const colors = [
    platformColors.tiktok,
    platformColors.facebook,
    platformColors.youtube,
    platformColors.instagram,
  ];

  const platformKeys = ['tiktok', 'facebook', 'youtube', 'instagram'] as const;

  return (
    <div className="slide">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">توزيع المنصات</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">المشاهدات والمتابعين حسب كل منصة</p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Platform Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-3"
        >
          {platformKeys.map((key) => {
            const platform = platforms[key];
            return (
              <div key={key} className="card-compact text-center">
                <div className="flex justify-center mb-1">
                  <PlatformIcon platform={key} size="md" showBackground />
                </div>
                <p className="text-[10px] text-notion-text-secondary">{platform.nameAr}</p>
                <p className="text-sm font-bold text-notion-text">{formatNumber(platform.totalViews)}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
          {/* Views Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">توزيع المشاهدات</h3>
            <div className="chart-container flex-1">
              <DoughnutChart
                labels={labels}
                data={viewsData}
                colors={colors}
              />
            </div>
          </motion.div>

          {/* Followers Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">توزيع المتابعين</h3>
            <div className="chart-container flex-1">
              <DoughnutChart
                labels={labels}
                data={followersData}
                colors={colors}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
