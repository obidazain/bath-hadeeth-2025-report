import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function WatchTimeSlide() {
  const watchTimeData = reportData.watchTime;
  const topPrograms = [...watchTimeData.byProgram].sort((a, b) => b.hours - a.hours).slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">مدة المشاهدة</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-notion-text-secondary mb-8"
      >
        إجمالي ساعات المشاهدة على يوتيوب خلال 2025
      </motion.p>

      <div className="max-w-6xl mx-auto w-full">
        {/* Total Watch Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mb-8 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-accent-red/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-notion-text-secondary text-lg mb-2">إجمالي ساعات المشاهدة</p>
            <p className="text-5xl md:text-6xl font-bold text-accent-red">
              {formatNumber(watchTimeData.total)}
            </p>
            <p className="text-notion-text-secondary mt-2">ساعة</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Programs by Watch Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-notion-text mb-4">
              البرامج حسب مدة المشاهدة
            </h3>
            <div className="h-80">
              <BarChart
                labels={topPrograms.map(p => p.name)}
                datasets={[
                  {
                    label: 'ساعات المشاهدة',
                    data: topPrograms.map(p => p.hours),
                    backgroundColor: [
                      'rgba(235, 87, 87, 0.8)',
                      'rgba(250, 159, 71, 0.8)',
                      'rgba(247, 201, 72, 0.8)',
                      'rgba(77, 171, 154, 0.8)',
                      'rgba(82, 156, 202, 0.8)',
                      'rgba(154, 109, 215, 0.8)',
                      'rgba(226, 85, 161, 0.8)',
                      'rgba(35, 131, 226, 0.8)',
                      'rgba(120, 119, 116, 0.8)',
                      'rgba(55, 53, 47, 0.6)',
                    ],
                  },
                ]}
                horizontal
              />
            </div>
          </motion.div>

          {/* Monthly Watch Time */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-notion-text mb-4">
              مدة المشاهدة الشهرية
            </h3>
            <div className="h-80">
              <BarChart
                labels={watchTimeData.monthly.map(m => m.monthName)}
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

        {/* Top 3 Programs Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          {topPrograms.slice(0, 3).map((program, index) => (
            <div
              key={program.name}
              className="card-secondary p-4 flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: index === 0 ? '#eb5757' : index === 1 ? '#fa9f47' : '#f7c948',
                }}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-notion-text">{program.name}</p>
                <p className="text-sm text-notion-text-secondary">
                  {formatNumber(program.hours)} ساعة
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
