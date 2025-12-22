import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function ProgramsRankingSlide() {
  // Sort programs by total views
  const sortedPrograms = [...reportData.programs].sort(
    (a, b) => b.totalViews - a.totalViews
  );

  // Add ranking numbers to labels for better clarity
  const labels = sortedPrograms.map((p) => `${p.name}`);
  const data = sortedPrograms.map(p => p.totalViews);

  // Create legend data with logos
  const legendItems = sortedPrograms.slice(0, 7).map((p, i) => ({
    rank: i + 1,
    name: p.name,
    logo: programLogos[p.id],
    views: p.totalViews,
  }));

  // Use consistent brand purple color with slight opacity variation
  const brandPurple = 'rgba(124, 58, 237, 0.85)'; // Main brand color
  const colors = sortedPrograms.map(() => brandPurple);

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
          البرامج الـ 14 مرتبة حسب إجمالي المشاهدات
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
              <div
                key={program.id}
                className="card-compact text-center px-4 py-2 flex items-center gap-2"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                {logoPath && (
                  <img src={logoPath} alt="" className="w-6 h-6 rounded object-contain" />
                )}
                <div className="text-right">
                  <p className="text-xs font-semibold text-notion-text">{program.name}</p>
                  <p className="text-sm font-bold text-gradient">
                    {formatNumber(program.totalViews)}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-compact flex-1 flex flex-col"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-4 h-3 rounded bg-[rgba(124,58,237,0.85)]"></span>
            <span className="text-xs text-notion-text-secondary">إجمالي المشاهدات</span>
          </div>
          <div className="chart-container flex-1">
            <BarChart
              labels={labels}
              datasets={[
                {
                  label: 'إجمالي المشاهدات',
                  data,
                  backgroundColor: colors,
                },
              ]}
              horizontal
              showLabelsOnBars
            />
          </div>
        </motion.div>

        {/* Programs Legend with Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 grid grid-cols-7 gap-2"
        >
          {legendItems.map((item) => (
            <div key={item.rank} className="card-compact p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="w-5 h-5 rounded-full bg-accent-purple text-white text-[10px] font-bold flex items-center justify-center">
                  {item.rank}
                </span>
                {item.logo && (
                  <img src={item.logo} alt="" className="w-5 h-5 rounded object-contain" />
                )}
              </div>
              <p className="text-[10px] font-semibold text-notion-text truncate">{item.name}</p>
              <p className="text-[10px] text-accent-purple font-bold">{formatNumber(item.views)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
