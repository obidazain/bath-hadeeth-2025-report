import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
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
    <div className="slide flex flex-col h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-1 flex-shrink-0"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
          <span className="text-gradient">مدة المشاهدة</span>
        </h2>
        <p className="text-notion-text-secondary text-[10px] sm:text-xs">
          إجمالي ساعات المشاهدة على يوتيوب خلال 2025
        </p>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
        {/* Row 1: Total + Monthly Chart */}
        <div className="grid grid-cols-3 gap-2 mb-1 flex-shrink-0">
          {/* Total Watch Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="card-compact text-center py-2 flex flex-col justify-center"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-red/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-accent-red">
                  {formatNumber(watchTimeData.total)}
                </p>
                <p className="text-[9px] text-notion-text-secondary">ساعة مشاهدة</p>
              </div>
            </div>
          </motion.div>

          {/* Monthly Watch Time - Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col p-2 col-span-2"
          >
            <h3 className="text-[10px] font-semibold text-notion-text mb-1">
              مدة المشاهدة الشهرية
            </h3>
            <div className="chart-container h-[70px]">
              <LineChart
                labels={watchTimeData.monthly.map(m => m.monthName)}
                datasets={[
                  {
                    label: 'ساعات المشاهدة',
                    data: watchTimeData.monthly.map(m => m.hours),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  },
                ]}
              />
            </div>
          </motion.div>
        </div>

        {/* Row 2: Treemap - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card-compact flex flex-col p-2 mb-1 flex-1"
        >
          <h3 className="text-[10px] font-semibold text-notion-text mb-1">
            حصة البرامج من المشاهدة
          </h3>
          <div className="flex flex-col gap-1 flex-1 min-h-0">
            {/* Row 1 - Top 3 (Largest) */}
            <div className="flex gap-1" style={{ flex: '2' }}>
              {row1.map((program, index) => {
                const rowTotal = row1.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden shadow-sm"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                  >
                    {program.logo && (
                      <img src={program.logo} alt="" className="w-6 h-6 rounded object-contain" />
                    )}
                    <span className="text-xs font-bold">{program.percentage.toFixed(0)}%</span>
                    <span className="text-[8px] opacity-90 truncate max-w-full px-1">{program.name}</span>
                  </motion.div>
                );
              })}
            </div>
            {/* Row 2 - Next 4 */}
            <div className="flex gap-1" style={{ flex: '1.2' }}>
              {row2.map((program, index) => {
                const rowTotal = row2.reduce((sum, p) => sum + p.percentage, 0);
                const width = (program.percentage / rowTotal) * 100;
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden shadow-sm"
                    style={{ backgroundColor: program.color, width: `${width}%` }}
                    title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                  >
                    {program.logo && (
                      <img src={program.logo} alt="" className="w-4 h-4 rounded object-contain" />
                    )}
                    <span className="text-[10px] font-bold">{program.percentage.toFixed(0)}%</span>
                  </motion.div>
                );
              })}
            </div>
            {/* Row 3 - Remaining */}
            {row3.length > 0 && (
              <div className="flex gap-1" style={{ flex: '0.8' }}>
                {row3.map((program, index) => {
                  const rowTotal = row3.reduce((sum, p) => sum + p.percentage, 0);
                  const width = (program.percentage / rowTotal) * 100;
                  return (
                    <motion.div
                      key={program.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden shadow-sm"
                      style={{ backgroundColor: program.color, width: `${width}%` }}
                      title={`${program.name}: ${formatNumber(program.hours)} ساعة (${program.percentage.toFixed(1)}%)`}
                    >
                      <span className="text-[8px] font-bold">{program.percentage.toFixed(0)}%</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Row 3: Programs Line Chart - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-compact flex flex-col p-2 flex-shrink-0"
        >
          <h3 className="text-[10px] font-semibold text-notion-text mb-1">
            ترتيب البرامج حسب مدة المشاهدة
          </h3>
          <div className="chart-container h-[60px]">
            <LineChart
              labels={programsWithColors.map(p => p.name)}
              datasets={[
                {
                  label: 'ساعات المشاهدة',
                  data: programsWithColors.map(p => p.hours),
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                },
              ]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
