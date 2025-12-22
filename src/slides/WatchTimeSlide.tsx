import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function WatchTimeSlide() {
  const watchTimeData = reportData.watchTime;
  const topPrograms = [...watchTimeData.byProgram].sort((a, b) => b.hours - a.hours).slice(0, 8);

  // Get program ID from name for logo lookup
  const getProgramId = (name: string) => {
    const program = reportData.programs.find(p => p.name === name);
    return program?.id || '';
  };

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">مدة المشاهدة</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          إجمالي ساعات المشاهدة على يوتيوب خلال 2025
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Total Watch Time - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-compact mb-3 text-center py-3"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-red/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-accent-red">
                {formatNumber(watchTimeData.total)}
              </p>
              <p className="text-xs text-notion-text-secondary">ساعة مشاهدة إجمالية</p>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
          {/* Programs by Watch Time */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-notion-text mb-2">
              البرامج حسب مدة المشاهدة
            </h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={topPrograms.map(p => p.name)}
                datasets={[
                  {
                    label: 'ساعات المشاهدة',
                    data: topPrograms.map(p => p.hours),
                    backgroundColor: 'rgba(235, 87, 87, 0.85)', // Consistent red color matching YouTube theme
                  },
                ]}
                horizontal
                showLabelsOnBars
              />
            </div>
            {/* Programs Mini Legend */}
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {topPrograms.slice(0, 4).map((p, i) => {
                const logo = programLogos[getProgramId(p.name)];
                return (
                  <div key={p.name} className="flex items-center gap-1 text-[10px]">
                    <span className="w-4 h-4 rounded-full bg-accent-red text-white text-[8px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {logo && <img src={logo} alt="" className="w-4 h-4 rounded object-contain" />}
                    <span className="font-medium text-notion-text">{p.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Monthly Watch Time */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-notion-text mb-2">
              مدة المشاهدة الشهرية
            </h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={watchTimeData.monthly.map(m => m.monthName.slice(0, 3))}
                datasets={[
                  {
                    label: 'ساعات المشاهدة',
                    data: watchTimeData.monthly.map(m => m.hours),
                    backgroundColor: 'rgba(235, 87, 87, 0.8)',
                  },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
