import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData } from '../data/report-data';
import { reportData2024, calculateGrowth } from '../data/report-data-2024';
import { formatNumber } from '../utils/formatters';

export function PodcastSlide() {
  const topPrograms = reportData.podcast.programDownloads.slice(0, 10);
  const topCountries = reportData.podcast.topCountries.slice(0, 10);

  // Calculate growth
  const downloadsGrowth = calculateGrowth(
    reportData2024.podcast.totalDownloads,
    reportData.podcast.totalDownloads
  );

  // Get 2024 data for comparison
  const programs2024Map = new Map(
    reportData2024.podcast.programDownloads.map(p => [p.name, p.downloads])
  );

  const countries2024Map = new Map(
    reportData2024.podcast.topCountries.map(c => [c.country, c.downloads])
  );

  return (
    <div className="slide overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">المنصات الصوتية</span>
          </h2>
          <p className="text-notion-text-secondary text-sm">
            البودكاست على Spotify و Apple Podcasts وغيرها
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="card-compact text-center py-4">
            <p className="text-2xl sm:text-3xl font-bold text-accent-green">
              {formatNumber(reportData.podcast.totalDownloads)}
            </p>
            <p className="text-sm text-notion-text-secondary mt-1">تحميل 2025</p>
          </div>
          <div className="card-compact text-center py-4">
            <p className="text-2xl sm:text-3xl font-bold text-notion-text-secondary">
              {formatNumber(reportData2024.podcast.totalDownloads)}
            </p>
            <p className="text-sm text-notion-text-secondary mt-1">تحميل 2024</p>
          </div>
          <div className="card-compact text-center py-4">
            <p className={`text-2xl sm:text-3xl font-bold ${downloadsGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {downloadsGrowth >= 0 ? '+' : ''}{downloadsGrowth.toFixed(0)}%
            </p>
            <p className="text-sm text-notion-text-secondary mt-1">النمو</p>
          </div>
        </motion.div>

        {/* Top Programs Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact mb-6"
        >
          <h3 className="text-lg font-semibold text-center mb-4 text-notion-text">
            أكثر البرامج استماعاً
          </h3>
          <div className="h-80">
            <BarChart
              labels={topPrograms.map(p => p.name)}
              datasets={[
                {
                  label: '2025',
                  data: topPrograms.map(p => p.downloads),
                  backgroundColor: 'rgba(77, 171, 154, 0.8)',
                },
                {
                  label: '2024',
                  data: topPrograms.map(p => programs2024Map.get(p.name) || 0),
                  backgroundColor: 'rgba(77, 171, 154, 0.3)',
                },
              ]}
              horizontal
            />
          </div>
        </motion.div>

        {/* Top Countries Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-compact mb-6"
        >
          <h3 className="text-lg font-semibold text-center mb-4 text-notion-text">
            أكثر الدول استماعاً
          </h3>
          <div className="h-80">
            <BarChart
              labels={topCountries.map(c => c.countryAr)}
              datasets={[
                {
                  label: '2025',
                  data: topCountries.map(c => c.downloads),
                  backgroundColor: 'rgba(154, 109, 215, 0.8)',
                },
                {
                  label: '2024',
                  data: topCountries.map(c => countries2024Map.get(c.countryAr) || 0),
                  backgroundColor: 'rgba(154, 109, 215, 0.3)',
                },
              ]}
              horizontal
            />
          </div>
        </motion.div>

        {/* Countries Reached */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-compact text-center py-6"
        >
          <p className="text-4xl font-bold text-accent-purple mb-2">
            {reportData.podcast.countriesReached}
          </p>
          <p className="text-notion-text-secondary">دولة حول العالم</p>
        </motion.div>
      </div>
    </div>
  );
}
