import { motion } from 'framer-motion';
import { reportData, programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

// Generate distinct colors for programs
const programColors = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#0ea5e9', // sky
  '#6366f1', // indigo
  '#a855f7', // purple
  '#ec4899', // pink
  '#f43f5e', // rose
  '#84cc16', // lime
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
];

export function WatchTimeSlide() {
  const watchTimeData = reportData.watchTime;
  // Get ALL programs sorted by hours
  const allPrograms = [...watchTimeData.byProgram].sort((a, b) => b.hours - a.hours);

  // Get program ID from name for logo lookup
  const getProgramId = (name: string) => {
    const program = reportData.programs.find(p => p.name === name);
    return program?.id || '';
  };

  // Assign colors to each program
  const programsWithColors = allPrograms.map((program, index) => ({
    ...program,
    color: programColors[index % programColors.length],
    logo: programLogos[getProgramId(program.name)],
  }));

  // Calculate total hours for percentage
  const totalHours = programsWithColors.reduce((sum, p) => sum + p.hours, 0);

  // Treemap layout - split into rows
  const treemapLayout = () => {
    const items = programsWithColors.map(p => ({
      ...p,
      percentage: (p.hours / totalHours) * 100,
    }));

    // First row: top 3 programs (largest)
    const row1 = items.slice(0, 3);
    // Second row: next 4 programs
    const row2 = items.slice(3, 7);
    // Third row: remaining programs
    const row3 = items.slice(7);

    return { row1, row2, row3 };
  };

  const { row1, row2, row3 } = treemapLayout();

  return (
    <div className="slide bg-white dark:bg-gray-900 p-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1">
          مدة المشاهدة
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          إجمالي ساعات المشاهدة على يوتيوب خلال 2025
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto h-[calc(100vh-180px)] flex flex-col">
        {/* Total Watch Time - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4 flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">
              {formatNumber(watchTimeData.total)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ساعة مشاهدة</p>
          </div>
        </motion.div>

        {/* Treemap - Programs Share */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 flex flex-col"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center">
            حصة البرامج من المشاهدة
          </h3>

          <div className="flex flex-col gap-2 flex-1">
            {/* Row 1 - Top 3 (Largest) */}
            <div className="flex gap-2 flex-[2]">
              {row1.map((program, index) => {
                const rowTotal = row1.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-md"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                  >
                    {program.logo && (
                      <img src={program.logo} alt="" className="w-10 h-10 rounded-lg object-contain mb-1" />
                    )}
                    <span className="text-lg font-bold">{program.percentage.toFixed(0)}%</span>
                    <span className="text-xs opacity-90 truncate max-w-full px-2">{program.name}</span>
                    <span className="text-[10px] opacity-75">{formatNumber(program.hours)} ساعة</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Row 2 - Next 4 */}
            <div className="flex gap-2 flex-[1.2]">
              {row2.map((program, index) => {
                const rowTotal = row2.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-md"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                  >
                    {program.logo && (
                      <img src={program.logo} alt="" className="w-6 h-6 rounded object-contain mb-0.5" />
                    )}
                    <span className="text-sm font-bold">{program.percentage.toFixed(0)}%</span>
                    <span className="text-[10px] opacity-90 truncate max-w-full px-1">{program.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Row 3 - Remaining */}
            {row3.length > 0 && (
              <div className="flex gap-2 flex-[0.8]">
                {row3.map((program, index) => {
                  const rowTotal = row3.reduce((sum, p) => sum + p.percentage, 0);
                  const width = (program.percentage / rowTotal) * 100;
                  return (
                    <motion.div
                      key={program.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-md"
                      style={{ backgroundColor: program.color, width: `${width}%` }}
                      title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                    >
                      <span className="text-xs font-bold">{program.percentage.toFixed(0)}%</span>
                      <span className="text-[9px] opacity-90 truncate max-w-full px-1">{program.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
