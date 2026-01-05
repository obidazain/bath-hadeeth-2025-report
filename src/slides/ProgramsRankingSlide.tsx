import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { usePrograms } from '../store/dataStore';
import { programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

// Stopped programs that should appear dimmed
const stoppedPrograms = ['malaz', 'ghada'];

export function ProgramsRankingSlide() {
  const programs = usePrograms();

  // Filter out falak and mawazen, then sort by total views
  const filteredPrograms = programs.filter(
    (p) => p.id !== 'falak' && p.id !== 'mawazen'
  );
  const sortedPrograms = [...filteredPrograms].sort(
    (a, b) => b.totalViews - a.totalViews
  );

  // Add ranking numbers to labels - add parentheses for stopped programs
  const labels = sortedPrograms.map((p) =>
    stoppedPrograms.includes(p.id) ? `(${p.name})` : p.name
  );
  const data = sortedPrograms.map(p => p.totalViews);

  // Create colors array - gray for stopped programs, purple for active
  const pointColors = sortedPrograms.map(p =>
    stoppedPrograms.includes(p.id) ? '#9ca3af' : '#7c3aed'
  );

  // Create legend data with logos - show all programs
  const legendItems = sortedPrograms.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    logo: programLogos[p.id],
    views: p.totalViews,
    isStopped: stoppedPrograms.includes(p.id),
    id: p.id,
  }));

  return (
    <div className="slide flex flex-col items-center justify-start pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="text-gradient">ترتيب البرامج</span>
        </h2>
        <p className="text-notion-text-secondary text-sm sm:text-base md:text-lg">
          البرامج الـ {sortedPrograms.length} مرتبة حسب إجمالي المشاهدات في جميع المنصات
        </p>
      </motion.div>

      {/* Content Container - Centered */}
      <div className="flex-1 flex flex-col justify-start w-full max-w-6xl mx-auto px-4">
        {/* Top 3 Programs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-4"
        >
          {sortedPrograms.slice(0, 3).map((program, index) => {
            const logoPath = programLogos[program.id];
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="card-compact text-center px-5 py-3 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  'bg-gradient-to-br from-orange-400 to-orange-600'
                }`}>
                  {index + 1}
                </div>
                {logoPath && (
                  <img src={logoPath} alt="" className="w-9 h-9 rounded object-contain" />
                )}
                <div className="text-right">
                  <p className="text-sm font-semibold text-notion-text">{program.name}</p>
                  <p className="text-lg font-bold text-gradient">
                    {formatNumber(program.totalViews)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact mb-4"
        >
          <div className="chart-container h-[280px]">
            <LineChart
              labels={labels}
              datasets={[
                {
                  label: 'إجمالي المشاهدات',
                  data,
                  borderColor: '#7c3aed',
                  backgroundColor: 'rgba(124, 58, 237, 0.15)',
                  pointBackgroundColor: pointColors,
                  pointBorderColor: pointColors,
                },
              ]}
            />
          </div>
        </motion.div>

        {/* Programs Grid - 3 columns x 4 rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          {legendItems.map((item, index) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.03 }}
              className={`card-compact p-4 hover:shadow-md transition-shadow ${item.isStopped ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <span className={`w-10 h-10 rounded-full text-white text-lg font-bold flex items-center justify-center shadow-sm flex-shrink-0 ${
                  item.isStopped ? 'bg-gray-400' :
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  'bg-gradient-to-br from-purple-500 to-purple-700'
                }`}>
                  {item.rank}
                </span>

                {/* Logo */}
                {item.logo && (
                  <img src={item.logo} alt="" className={`w-14 h-14 rounded-lg object-contain flex-shrink-0 ${item.isStopped ? 'grayscale' : ''}`} />
                )}

                {/* Name and Views */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-notion-text truncate">{item.name}</p>
                  {item.isStopped ? (
                    <p className="text-xs text-red-500 font-medium">برنامج متوقف</p>
                  ) : (
                    <p className="text-lg text-purple-600 font-bold">{formatNumber(item.views)}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
