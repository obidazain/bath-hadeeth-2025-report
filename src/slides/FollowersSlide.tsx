import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon, platformColors } from '../config/platforms';

export function FollowersSlide() {
  const months = reportData.monthly.map(m => m.monthName.slice(0, 3));

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">نمو المتابعين</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          المتابعين الجدد في 2025 حسب المنصة
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Total New Followers - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-3"
        >
          <p className="text-4xl sm:text-5xl font-black text-gradient">
            +{formatNumber(reportData.totals.newFollowers2025)}
          </p>
          <p className="text-sm text-notion-text-secondary mt-1">متابع جديد في 2025</p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0 mb-3">
          {/* New Followers by Platform */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">المتابعين الجدد حسب المنصة</h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={['YouTube', 'TikTok', 'Instagram', 'Facebook']}
                datasets={[
                  {
                    label: 'متابعين جدد',
                    data: [
                      reportData.platforms.youtube.newSubscribers2025,
                      reportData.platforms.tiktok.newFollowers2025,
                      reportData.platforms.instagram.newFollowers2025,
                      reportData.platforms.facebook.newFollowers2025,
                    ],
                    backgroundColor: [
                      platformColors.youtube,
                      platformColors.tiktok,
                      platformColors.instagram,
                      platformColors.facebook,
                    ],
                  },
                ]}
              />
            </div>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">نمو المتابعين الشهري</h3>
            <div className="chart-container flex-1">
              <LineChart
                labels={months}
                datasets={[
                  {
                    label: 'متابعين جدد',
                    data: reportData.monthly.map(m => m.totalNewFollowers),
                    borderColor: '#9a6dd7',
                    backgroundColor: 'rgba(154, 109, 215, 0.15)',
                  },
                ]}
              />
            </div>
          </motion.div>
        </div>

        {/* Platform breakdown cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-2"
        >
          <div className="card-compact text-center flex items-center justify-center gap-2">
            <PlatformIcon platform="youtube" size="sm" />
            <div>
              <p className="text-sm font-bold text-notion-text">+{formatNumber(reportData.platforms.youtube.newSubscribers2025)}</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2">
            <PlatformIcon platform="tiktok" size="sm" />
            <div>
              <p className="text-sm font-bold text-notion-text">+{formatNumber(reportData.platforms.tiktok.newFollowers2025)}</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2">
            <PlatformIcon platform="instagram" size="sm" />
            <div>
              <p className="text-sm font-bold text-notion-text">+{formatNumber(reportData.platforms.instagram.newFollowers2025)}</p>
            </div>
          </div>
          <div className="card-compact text-center flex items-center justify-center gap-2">
            <PlatformIcon platform="facebook" size="sm" />
            <div>
              <p className="text-sm font-bold text-notion-text">+{formatNumber(reportData.platforms.facebook.newFollowers2025)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
