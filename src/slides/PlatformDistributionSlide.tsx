import { motion } from 'framer-motion';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

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
  const colors = ['#000000', '#1877F2', '#FF0000', '#E4405F'];

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">توزيع المنصات</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-notion-text-secondary text-center mb-8"
      >
        المشاهدات والمتابعين حسب كل منصة
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
        {/* Views Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">توزيع المشاهدات</h3>
          <div className="h-[350px]">
            <DoughnutChart
              labels={labels}
              data={viewsData}
              colors={colors}
            />
          </div>
        </motion.div>

        {/* Followers Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">توزيع المتابعين</h3>
          <div className="h-[350px]">
            <DoughnutChart
              labels={labels}
              data={followersData}
              colors={colors}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mt-8"
      >
        {Object.entries(platforms).map(([key, platform]) => (
          <div key={key} className="card p-4 text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: platform.color }}
            />
            <p className="text-sm text-notion-text-secondary">{platform.nameAr}</p>
            <p className="text-lg font-bold text-notion-text">{formatNumber(platform.totalViews)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
