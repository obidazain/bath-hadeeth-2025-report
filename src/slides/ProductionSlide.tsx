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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* Monthly Episodes Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="font-semibold text-notion-text text-sm mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-pink"></div>
              عدد الحلقات الشهرية
            </h3>
            <div className="chart-container flex-1 min-h-[180px]">
              <BarChart
                labels={monthlyTotals.map(m => m.monthName.slice(0, 3))}
                datasets={[
                  {
                    label: 'حلقات',
                    data: monthlyTotals.map(m => m.episodes),
                    backgroundColor: 'rgba(236, 72, 153, 0.7)',
                  },
                ]}
              />
            </div>
          </motion.div>

          {/* Monthly Hours Chart */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="card-compact flex flex-col"
          >
            <h3 className="font-semibold text-notion-text text-sm mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              ساعات الإنتاج الشهرية
            </h3>
            <div className="chart-container flex-1 min-h-[180px]">
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
        </div>

        {/* Top Programs - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-compact"
        >
          <h3 className="font-semibold text-notion-text text-sm mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
            أعلى البرامج إنتاجاً (بالساعات)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {topPrograms.map((program, index) => {
              const logoPath = programLogos[program.id];
              const maxHours = topPrograms[0]?.totalHours || 1;
              const percentage = (program.totalHours / maxHours) * 100;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-notion-secondary/50 rounded-xl p-3 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-notion-secondary text-notion-text-secondary'
                    }`}>
                      {index + 1}
                    </div>
                    {logoPath && (
                      <img src={logoPath} alt="" className="w-7 h-7 rounded object-contain" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-notion-text truncate mb-1">{program.name}</p>
                  <p className="text-lg font-bold text-primary">{program.totalHours.toFixed(0)}</p>
                  <p className="text-[10px] text-notion-text-secondary">ساعة</p>
                  <div className="h-1 bg-notion-secondary rounded-full overflow-hidden mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                      className="h-full bg-gradient-to-r from-primary to-accent-pink rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
