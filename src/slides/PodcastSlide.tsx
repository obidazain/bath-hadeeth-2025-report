import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function PodcastSlide() {
  const topPrograms = reportData.podcast.programDownloads.slice(0, 8);
  const topCountries = reportData.podcast.topCountries.slice(0, 8);

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">المنصات الصوتية</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          البودكاست على Spotify و Apple Podcasts وغيرها
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Key Stats - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-2 max-w-md mx-auto mb-3"
        >
          <div className="card-compact text-center py-2">
            <p className="text-2xl sm:text-3xl font-bold text-accent-green">
              {formatNumber(reportData.podcast.totalDownloads)}
            </p>
            <p className="text-xs text-notion-text-secondary">تحميل</p>
          </div>
          <div className="card-compact text-center py-2">
            <p className="text-2xl sm:text-3xl font-bold text-accent-purple">
              {reportData.podcast.countriesReached}
            </p>
            <p className="text-xs text-notion-text-secondary">دولة</p>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
          {/* Top Programs */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">أكثر البرامج استماعاً</h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={topPrograms.map(p => p.name)}
                datasets={[
                  {
                    label: 'التحميلات',
                    data: topPrograms.map(p => p.downloads),
                    backgroundColor: 'rgba(77, 171, 154, 0.8)',
                  },
                ]}
                horizontal
              />
            </div>
          </motion.div>

          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-center mb-2 text-notion-text">أكثر الدول استماعاً</h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={topCountries.map(c => c.countryAr)}
                datasets={[
                  {
                    label: 'التحميلات',
                    data: topCountries.map(c => c.downloads),
                    backgroundColor: 'rgba(154, 109, 215, 0.8)',
                  },
                ]}
                horizontal
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
