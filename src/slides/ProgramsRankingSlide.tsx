import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { usePrograms } from '../store/dataStore';
import { programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function ProgramsRankingSlide() {
  const programs = usePrograms();

  // Sort programs by total views
  const sortedPrograms = [...programs].sort(
    (a, b) => b.totalViews - a.totalViews
  );

  // Add ranking numbers to labels for better clarity
  const labels = sortedPrograms.map((p) => p.name);
  const data = sortedPrograms.map(p => p.totalViews);

  // Create legend data with logos - show all programs
  const legendItems = sortedPrograms.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    logo: programLogos[p.id],
    views: p.totalViews,
  }));

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">ترتيب البرامج</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          البرامج الـ {sortedPrograms.length} مرتبة حسب إجمالي المشاهدات
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Top 3 Programs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 mb-3"
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

        {/* Line Chart - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact flex flex-col mb-3"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-4 h-1 rounded bg-primary"></span>
            <span className="text-xs text-notion-text-secondary">إجمالي المشاهدات حسب البرنامج</span>
          </div>
          <div className="chart-container h-[200px]">
            <LineChart
              labels={labels}
              datasets={[
                {
                  label: 'إجمالي المشاهدات',
                  data,
                  borderColor: '#7c3aed',
                  backgroundColor: 'rgba(124, 58, 237, 0.15)',
                },
              ]}
            />
          </div>
          {/* Program Logos Row - Aligned with chart points */}
          <div className="flex justify-around items-center mt-2 px-8">
            {sortedPrograms.map((program, index) => {
              const logo = programLogos[program.id];
              return (
                <div key={program.id} className="flex flex-col items-center" style={{ width: `${100 / sortedPrograms.length}%` }}>
                  {logo ? (
                    <img src={logo} alt={program.name} className="w-5 h-5 rounded object-contain" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Programs Legend with Logos - All Programs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-7 gap-2"
        >
          {legendItems.map((item, index) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.03 }}
              className="card-compact p-2 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className={`w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  'bg-gradient-to-br from-purple-500 to-purple-700'
                }`}>
                  {item.rank}
                </span>
                {item.logo && (
                  <img src={item.logo} alt="" className="w-5 h-5 rounded object-contain" />
                )}
              </div>
              <p className="text-[10px] font-medium text-notion-text truncate">{item.name}</p>
              <p className="text-xs text-purple-600 font-bold">{formatNumber(item.views)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
