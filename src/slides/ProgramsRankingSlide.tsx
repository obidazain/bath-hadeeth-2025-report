import { motion } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function ProgramsRankingSlide() {
  // Sort programs by total views
  const sortedPrograms = [...reportData.programs].sort(
    (a, b) => b.totalViews - a.totalViews
  );

  const labels = sortedPrograms.map(p => p.name);
  const data = sortedPrograms.map(p => p.totalViews);

  // Generate gradient colors
  const colors = sortedPrograms.map((_, i) => {
    const hue = 270 - (i * 15); // Purple to pink gradient
    return `hsla(${hue}, 70%, 60%, 0.8)`;
  });

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">ترتيب البرامج</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-notion-text-secondary text-center mb-8"
      >
        البرامج الـ 14 مرتبة حسب إجمالي المشاهدات
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6 max-w-6xl mx-auto w-full"
      >
        <div className="h-[500px]">
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
          />
        </div>
      </motion.div>

      {/* Top 3 Programs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 mt-8"
      >
        {sortedPrograms.slice(0, 3).map((program, index) => (
          <div
            key={program.id}
            className="card card-hover p-6 text-center min-w-[150px]"
          >
            <div className={`text-3xl font-bold mb-2 ${
              index === 0 ? 'text-accent-yellow' :
              index === 1 ? 'text-notion-text-secondary' :
              'text-accent-orange'
            }`}>
              #{index + 1}
            </div>
            <p className="text-lg font-semibold mb-1 text-notion-text">{program.name}</p>
            <p className="text-2xl font-bold text-gradient">
              {formatNumber(program.totalViews)}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
