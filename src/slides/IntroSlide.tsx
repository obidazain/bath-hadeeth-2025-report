import { motion } from 'framer-motion';
import { reportData } from '../data/report-data';

export function IntroSlide() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-notion-bg">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="text-gradient">بث حديث</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-3xl text-notion-text-secondary mb-12"
        >
          التقرير السنوي 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="text-8xl md:text-[10rem] font-black text-gradient">
            +1B
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl md:text-2xl text-notion-text-secondary mt-4"
          >
            مليار مشاهدة في 2025
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          <div className="card px-6 py-4">
            <p className="text-3xl font-bold text-accent-purple">{reportData.totals.programsCount}</p>
            <p className="text-sm text-notion-text-secondary">برنامج</p>
          </div>
          <div className="card px-6 py-4">
            <p className="text-3xl font-bold text-accent-pink">+15M</p>
            <p className="text-sm text-notion-text-secondary">متابع</p>
          </div>
          <div className="card px-6 py-4">
            <p className="text-3xl font-bold text-accent-orange">{reportData.totals.countriesReached}</p>
            <p className="text-sm text-notion-text-secondary">دولة</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
