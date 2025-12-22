import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { reportData } from '../data/report-data';
import { platformColors, PlatformIcon } from '../config/platforms';
import { formatNumber } from '../utils/formatters';

export function MonthlyTrendSlide() {
  const months = reportData.monthly.map(m => m.monthName.slice(0, 3));

  // Calculate total views per platform
  const platformTotals = {
    youtube: reportData.monthly.reduce((sum, m) => sum + m.youtube.views, 0),
    tiktok: reportData.monthly.reduce((sum, m) => sum + m.tiktok.views, 0),
    instagram: reportData.monthly.reduce((sum, m) => sum + m.instagram.views, 0),
    facebook: reportData.monthly.reduce((sum, m) => sum + m.facebook.views, 0),
  };

  const datasets = [
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
          المشاهدات الشهرية لكل منصة خلال 2025
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Platform Totals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-3"
        >
          <div className="card-compact text-center flex items-center justify-center gap-2 py-2">
            <PlatformIcon platform="youtube" size="sm" />
            <div>
              <p className="text-sm font-bold" style={{ color: platformColors.youtube }}>{formatNumber(platformTotals.youtube)}</p>
              <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2 py-2">
            <PlatformIcon platform="tiktok" size="sm" />
            <div>
              <p className="text-sm font-bold" style={{ color: platformColors.tiktok }}>{formatNumber(platformTotals.tiktok)}</p>
              <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2 py-2">
            <PlatformIcon platform="instagram" size="sm" />
            <div>
              <p className="text-sm font-bold" style={{ color: platformColors.instagram }}>{formatNumber(platformTotals.instagram)}</p>
              <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2 py-2">
            <PlatformIcon platform="facebook" size="sm" />
            <div>
              <p className="text-sm font-bold" style={{ color: platformColors.facebook }}>{formatNumber(platformTotals.facebook)}</p>
              <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
            </div>
          </div>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact flex-1 flex flex-col mb-3"
        >
          <div className="chart-container flex-1">
            <LineChart labels={months} datasets={datasets} />
          </div>
        </motion.div>

        {/* Monthly highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-2"
        >
          <div className="card-compact text-center">
            <p className="text-[10px] text-notion-text-secondary">أعلى شهر</p>
            <p className="text-sm sm:text-base font-bold text-accent-purple">نوفمبر</p>
            <p className="text-[10px] text-notion-text-secondary">155M مشاهدة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-[10px] text-notion-text-secondary">متوسط شهري</p>
            <p className="text-sm sm:text-base font-bold text-accent-pink">104M</p>
            <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-[10px] text-notion-text-secondary">نمو فبراير-نوفمبر</p>
            <p className="text-sm sm:text-base font-bold text-accent-green">+92%</p>
            <p className="text-[10px] text-notion-text-secondary">زيادة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-[10px] text-notion-text-secondary">أفضل منصة</p>
            <p className="text-sm sm:text-base font-bold text-accent-orange">TikTok</p>
            <p className="text-[10px] text-notion-text-secondary">379M مشاهدة</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
