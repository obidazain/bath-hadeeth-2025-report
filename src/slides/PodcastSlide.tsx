import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData } from '../data/report-data';
import { formatNumberWithCommas } from '../utils/formatters';

export function PodcastSlide() {
  const topPrograms = reportData.podcast.programDownloads.slice(0, 10);
  const topCountries = reportData.podcast.topCountries.slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">المنصات الصوتية</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-notion-text-secondary text-center mb-8"
      >
        البودكاست على Spotify و Apple Podcasts وغيرها
      </motion.p>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8"
      >
        <div className="card p-4 text-center">
          <p className="text-4xl font-bold text-accent-green">
            {formatNumberWithCommas(reportData.podcast.totalDownloads)}
          </p>
          <p className="text-sm text-notion-text-secondary">تحميل</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-4xl font-bold text-accent-purple">
            {reportData.podcast.countriesReached}
          </p>
          <p className="text-sm text-notion-text-secondary">دولة</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {/* Top Programs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">أكثر البرامج استماعاً</h3>
          <div className="h-[300px]">
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4 text-notion-text">أكثر الدول استماعاً</h3>
          <div className="h-[300px]">
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
  );
}
