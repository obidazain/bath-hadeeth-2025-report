import { motion } from 'framer-motion';
import { LineChart } from '../components/charts/LineChart';
import { reportData } from '../data/report-data';

export function MonthlyTrendSlide() {
  const months = reportData.monthly.map(m => m.monthName);

  const datasets = [
    {
      label: 'YouTube',
      data: reportData.monthly.map(m => m.youtube.views),
      borderColor: '#FF0000',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    {
      label: 'TikTok',
      data: reportData.monthly.map(m => m.tiktok.views),
      borderColor: '#000000',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    {
      label: 'Instagram',
      data: reportData.monthly.map(m => m.instagram.views),
      borderColor: '#E4405F',
      backgroundColor: 'rgba(228, 64, 95, 0.1)',
    },
    {
      label: 'Facebook',
      data: reportData.monthly.map(m => m.facebook.views),
      borderColor: '#1877F2',
      backgroundColor: 'rgba(24, 119, 242, 0.1)',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-notion-bg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-notion-text"
      >
        <span className="text-gradient">النمو الشهري</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-notion-text-secondary text-center mb-8"
      >
        المشاهدات الشهرية لكل منصة خلال 2025
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6 max-w-6xl mx-auto w-full"
      >
        <div className="h-[450px]">
          <LineChart labels={months} datasets={datasets} />
        </div>
      </motion.div>

      {/* Monthly highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mt-6"
      >
        <div className="card p-4 text-center">
          <p className="text-sm text-notion-text-secondary">أعلى شهر</p>
          <p className="text-xl font-bold text-accent-purple">نوفمبر</p>
          <p className="text-sm text-notion-text-secondary">155M مشاهدة</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-notion-text-secondary">متوسط شهري</p>
          <p className="text-xl font-bold text-accent-pink">104M</p>
          <p className="text-sm text-notion-text-secondary">مشاهدة</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-notion-text-secondary">نمو فبراير-نوفمبر</p>
          <p className="text-xl font-bold text-accent-green">+92%</p>
          <p className="text-sm text-notion-text-secondary">زيادة</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-notion-text-secondary">أفضل منصة</p>
          <p className="text-xl font-bold text-accent-orange">TikTok</p>
          <p className="text-sm text-notion-text-secondary">379M مشاهدة</p>
        </div>
      </motion.div>
    </div>
  );
}
