import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function FollowersSlide() {
  const months = reportData.monthly.map(m => m.monthName);

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">نمو المتابعين</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-notion-text-secondary text-center mb-8"
      >
        المتابعين الجدد في 2025 حسب المنصة
      </motion.p>

      {/* Total New Followers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <p className="text-6xl font-black text-gradient">
          +{formatNumber(reportData.totals.newFollowers2025)}
        </p>
        <p className="text-xl text-notion-text-secondary mt-2">متابع جديد في 2025</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {/* New Followers by Platform */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">المتابعين الجدد حسب المنصة</h3>
          <div className="h-[300px]">
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
                  backgroundColor: ['rgba(235, 87, 87, 0.85)', 'rgba(55, 53, 47, 0.85)', 'rgba(226, 85, 161, 0.85)', 'rgba(82, 156, 202, 0.85)'],
                },
              ]}
            />
          </div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">نمو المتابعين الشهري</h3>
          <div className="h-[300px]">
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
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mt-6"
      >
        <div className="card p-4 text-center border-t-4 border-accent-red">
          <p className="text-sm text-notion-text-secondary">YouTube</p>
          <p className="text-xl font-bold text-notion-text">+{formatNumber(reportData.platforms.youtube.newSubscribers2025)}</p>
        </div>
        <div className="card p-4 text-center border-t-4 border-notion-text">
          <p className="text-sm text-notion-text-secondary">TikTok</p>
          <p className="text-xl font-bold text-notion-text">+{formatNumber(reportData.platforms.tiktok.newFollowers2025)}</p>
        </div>
        <div className="card p-4 text-center border-t-4 border-accent-pink">
          <p className="text-sm text-notion-text-secondary">Instagram</p>
          <p className="text-xl font-bold text-notion-text">+{formatNumber(reportData.platforms.instagram.newFollowers2025)}</p>
        </div>
        <div className="card p-4 text-center border-t-4 border-accent-blue">
          <p className="text-sm text-notion-text-secondary">Facebook</p>
          <p className="text-xl font-bold text-notion-text">+{formatNumber(reportData.platforms.facebook.newFollowers2025)}</p>
        </div>
      </motion.div>
    </div>
  );
}
