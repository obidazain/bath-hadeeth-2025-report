import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { productionData, productionSummary, monthlyTotals } from '../data/production-data';
import { programLogos } from '../data/report-data';

export function ProductionSlide() {
  // Sort programs by total hours and get top 6
  const topPrograms = [...productionData]
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 6);

  return (
    <div className="slide">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">عمليات الإنتاج 2025</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">إحصائيات الإنتاج الشهرية</p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Summary Stats - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-3"
        >
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-primary">{productionSummary.totalEpisodes}</p>
            <p className="text-[10px] sm:text-xs text-notion-text-secondary">حلقة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-pink">{Math.round(productionSummary.totalHours)}</p>
            <p className="text-[10px] sm:text-xs text-notion-text-secondary">ساعة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-purple">{productionSummary.activePrograms}</p>
            <p className="text-[10px] sm:text-xs text-notion-text-secondary">برنامج</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-green">{productionSummary.monthsCovered}</p>
            <p className="text-[10px] sm:text-xs text-notion-text-secondary">شهر</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1 min-h-0">
          {/* Monthly Production Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 card-compact flex flex-col"
          >
            <h3 className="font-semibold text-notion-text text-sm mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              ساعات الإنتاج الشهرية
            </h3>
            <div className="chart-container flex-1">
              <BarChart
                labels={monthlyTotals.map(m => m.monthName.slice(0, 3))}
                datasets={[
                  {
                    label: 'ساعات',
                    data: monthlyTotals.map(m => Math.round(m.hours * 10) / 10),
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                  },
                ]}
              />
            </div>
          </motion.div>

          {/* Top Programs */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card-compact flex flex-col"
          >
            <h3 className="font-semibold text-notion-text text-sm mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-pink"></div>
              أعلى البرامج إنتاجاً
            </h3>
            <div className="flex-1 flex flex-col justify-between gap-1 overflow-auto">
              {topPrograms.map((program, index) => {
                const logoPath = programLogos[program.id];
                const maxHours = topPrograms[0]?.totalHours || 1;
                const percentage = (program.totalHours / maxHours) * 100;

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-notion-secondary text-notion-text-secondary'
                    }`}>
                      {index + 1}
                    </div>
                    {logoPath && (
                      <img src={logoPath} alt="" className="w-5 h-5 rounded object-contain shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-notion-text truncate">{program.name}</span>
                        <span className="text-primary font-bold shrink-0 mr-2">{program.totalHours.toFixed(0)}h</span>
                      </div>
                      <div className="h-1 bg-notion-secondary rounded-full overflow-hidden mt-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent-pink rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
