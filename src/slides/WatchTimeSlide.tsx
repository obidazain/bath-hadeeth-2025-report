import { motion } from 'framer-motion';
import { useWatchTime } from '../store/dataStore';
import { formatNumber } from '../utils/formatters';
import { BarChart } from '../components/charts/BarChart';

export function WatchTimeSlide() {
  const watchTime = useWatchTime();

  // Sort programs by watch hours descending
  const sortedPrograms = [...watchTime.byProgram].sort(
    (a, b) => b.hours - a.hours
  );

  const totalHours = watchTime.total;
  const programCount = sortedPrograms.length;

  // Calculate top 3 percentage
  const top3Hours = sortedPrograms.slice(0, 3).reduce((sum, p) => sum + p.hours, 0);
  const top3Percentage = ((top3Hours / totalHours) * 100).toFixed(1);

  // Calculate leader (الشرق) percentage
  const leaderPercentage = ((sortedPrograms[0].hours / totalHours) * 100).toFixed(1);

  // Generate gradient colors (red tones for YouTube theme)
  const barColors = sortedPrograms.map((_, index) => {
    const opacity = Math.max(0.3, 1 - index * 0.05);
    return `rgba(239, 68, 68, ${opacity})`;
  });

  return (
    <div className="slide bg-white dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1">
          مدة المشاهدة
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          إجمالي ساعات المشاهدة على يوتيوب خلال 2025
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto flex flex-col gap-4 px-4" style={{ height: 'calc(100vh - 140px)' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          {/* Main Number */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-4xl sm:text-5xl font-black text-red-500">
                {formatNumber(totalHours)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ساعة مشاهدة</p>
            </div>
          </div>

          {/* Supporting Stats */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            >
              <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {top3Percentage}%
              </p>
              <p className="text-xs text-blue-500 dark:text-blue-400">من الأعلى 3</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
            >
              <p className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400">
                {leaderPercentage}%
              </p>
              <p className="text-xs text-amber-500 dark:text-amber-400">{sortedPrograms[0].name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
            >
              <p className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                {programCount}
              </p>
              <p className="text-xs text-purple-500 dark:text-purple-400">برنامج</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Programs Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex flex-col min-h-0"
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            ترتيب البرامج حسب مدة المشاهدة
          </h3>
          <div className="flex-1 min-h-0">
            <BarChart
              labels={sortedPrograms.map(p => p.name)}
              datasets={[
                {
                  label: 'ساعات المشاهدة',
                  data: sortedPrograms.map(p => p.hours),
                  backgroundColor: barColors,
                },
              ]}
              horizontal={true}
              showDataLabels={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
