import { motion } from 'framer-motion';
import { reportData } from '../data/report-data';

export function IntroSlide() {
  return (
    <div className="slide relative overflow-hidden bg-notion-bg">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3"
        >
          <span className="text-gradient">بث حديث</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-notion-text-secondary mb-6"
        >
          التقرير السنوي 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-6"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl font-black text-gradient">
            +1.2B
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg text-notion-text-secondary mt-2 text-center"
          >
            مليار مشاهدة في 2025
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <div className="card-compact px-4 py-2 text-center">
            <p className="text-xl sm:text-2xl font-bold text-accent-purple">{reportData.totals.programsCount}</p>
            <p className="text-xs text-notion-text-secondary">برنامج</p>
          </div>
          <div className="card-compact px-4 py-2 text-center">
            <p className="text-xl sm:text-2xl font-bold text-accent-pink">+15M</p>
            <p className="text-xs text-notion-text-secondary">متابع</p>
          </div>
          <div className="card-compact px-4 py-2 text-center">
            <p className="text-xl sm:text-2xl font-bold text-accent-orange">{reportData.totals.countriesReached}</p>
            <p className="text-xs text-notion-text-secondary">دولة</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
