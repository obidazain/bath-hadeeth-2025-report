import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { reportData, programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

// Generate distinct colors for programs
const programColors = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
  '#84cc16', '#06b6d4', '#8b5cf6', '#d946ef',
];

export function WatchTimeSlide() {
  const watchTimeData = reportData.watchTime;
  const allPrograms = [...watchTimeData.byProgram].sort((a, b) => b.hours - a.hours);

  const getProgramId = (name: string) => {
    const program = reportData.programs.find(p => p.name === name);
    return program?.id || '';
  };

  const programsWithColors = allPrograms.map((program, index) => ({
    ...program,
    color: programColors[index % programColors.length],
    logo: programLogos[getProgramId(program.name)],
  }));

  const totalHours = programsWithColors.reduce((sum, p) => sum + p.hours, 0);

  const treemapLayout = () => {
    const items = programsWithColors.map(p => ({
      ...p,
      percentage: (p.hours / totalHours) * 100,
    }));
    const row1 = items.slice(0, 3);
    const row2 = items.slice(3, 7);
    const row3 = items.slice(7);
    return { row1, row2, row3 };
  };

  const { row1, row2, row3 } = treemapLayout();

  return (
    <div className="slide bg-white dark:bg-gray-900 p-3" dir="rtl">
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          مدة المشاهدة
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          إجمالي ساعات المشاهدة على يوتيوب خلال 2025
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col gap-2" style={{ height: 'calc(100vh - 140px)' }}>
        {/* Row 1: Total + Monthly Chart */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0" style={{ height: '80px' }}>
          {/* Total Watch Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex items-center justify-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-red-500 leading-tight">
                {formatNumber(watchTimeData.total)}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">ساعة مشاهدة</p>
            </div>
          </motion.div>

          {/* Monthly Watch Time - Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 col-span-3"
          >
            <h3 className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
              مدة المشاهدة الشهرية
            </h3>
            <div style={{ height: '50px' }}>
              <LineChart
                labels={watchTimeData.monthly.map(m => m.monthName)}
                datasets={[{
                  label: 'ساعات المشاهدة',
                  data: watchTimeData.monthly.map(m => m.hours),
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                }]}
              />
            </div>
          </motion.div>
        </div>

        {/* Row 2: Treemap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex-1"
        >
          <h3 className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 mb-1 text-center">
            حصة البرامج من المشاهدة
          </h3>
          <div className="flex flex-col gap-1 h-[calc(100%-20px)]">
            {/* Row 1 - Top 3 */}
            <div className="flex gap-1 flex-[2]">
              {row1.map((program, index) => {
                const rowTotal = row1.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="rounded-lg flex flex-col items-center justify-center text-white overflow-hidden shadow-sm"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة`}
                  >
                    {program.logo && <img src={program.logo} alt="" className="w-6 h-6 rounded object-contain" />}
                    <span className="text-sm font-bold">{program.percentage.toFixed(0)}%</span>
                    <span className="text-[9px] opacity-90 truncate max-w-full px-1">{program.name}</span>
                  </motion.div>
                );
              })}
            </div>
            {/* Row 2 - Next 4 */}
            <div className="flex gap-1 flex-[1.2]">
              {row2.map((program, index) => {
                const rowTotal = row2.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="rounded-lg flex flex-col items-center justify-center text-white overflow-hidden shadow-sm"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة`}
                  >
                    <span className="text-xs font-bold">{program.percentage.toFixed(0)}%</span>
                    <span className="text-[8px] opacity-90 truncate max-w-full px-1">{program.name}</span>
                  </motion.div>
                );
              })}
            </div>
            {/* Row 3 - Remaining */}
            {row3.length > 0 && (
              <div className="flex gap-1 flex-[0.8]">
                {row3.map((program, index) => {
                  const rowTotal = row3.reduce((sum, p) => sum + p.percentage, 0);
                  const width = (program.percentage / rowTotal) * 100;
                  return (
                    <motion.div
                      key={program.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="rounded-lg flex flex-col items-center justify-center text-white overflow-hidden shadow-sm"
                      style={{ backgroundColor: program.color, width: `${width}%` }}
                      title={`${program.name}: ${formatNumber(program.hours)} ساعة`}
                    >
                      <span className="text-[8px] font-bold">{program.percentage.toFixed(0)}%</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Row 3: Programs Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex-shrink-0"
          style={{ height: '70px' }}
        >
          <h3 className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
            ترتيب البرامج حسب مدة المشاهدة
          </h3>
          <div style={{ height: '45px' }}>
            <LineChart
              labels={programsWithColors.map(p => p.name)}
              datasets={[{
                label: 'ساعات المشاهدة',
                data: programsWithColors.map(p => p.hours),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
              }]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
