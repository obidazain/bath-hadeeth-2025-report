import { motion } from 'framer-motion';
import { reportData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

export function ConclusionSlide() {
  const highlights = [
    { label: 'مليار+ مشاهدة', value: reportData.totals.viewsWithFacebook, icon: '👁️' },
    { label: 'مليون متابع', value: reportData.totals.totalFollowers, icon: '👥' },
    { label: 'برنامج', value: reportData.totals.programsCount, icon: '🎬' },
    { label: 'دولة', value: reportData.totals.countriesReached, icon: '🌍' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-notion-bg">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-8"
        >
          <span className="text-gradient">شكراً لكم</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-notion-text-secondary mb-12"
        >
          على ثقتكم ودعمكم المستمر
        </motion.p>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="card p-6 text-center"
            >
              <span className="text-4xl mb-2 block">{item.icon}</span>
              <p className="text-3xl font-bold text-gradient mb-1">
                {formatNumber(item.value)}
              </p>
              <p className="text-sm text-notion-text-secondary">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 2026 Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="card p-8 bg-gradient-to-r from-primary/5 to-accent-pink/5"
        >
          <p className="text-2xl font-semibold mb-4 text-notion-text">نحو 2026</p>
          <p className="text-notion-text-secondary text-lg">
            نعدكم بمحتوى أفضل وتغطية أوسع وتجربة مشاهدة أروع
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <span className="text-6xl font-black text-gradient">2B+</span>
          </div>
          <p className="text-notion-text-secondary mt-2">هدفنا للعام القادم</p>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-notion-text-secondary mt-12 text-sm"
        >
          بث حديث - التقرير السنوي 2025
        </motion.p>
      </motion.div>
    </div>
  );
}
