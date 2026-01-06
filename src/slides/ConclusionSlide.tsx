import { motion } from 'framer-motion';
import { Eye, Users, Clapperboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTotals } from '../store/dataStore';
import { formatNumber } from '../utils/formatters';

export function ConclusionSlide() {
  const totals = useTotals();

  const highlights: { label: string; value: number; icon: LucideIcon }[] = [
    { label: 'إجمالي المشاهدات', value: totals.viewsWithFacebook, icon: Eye },
    { label: 'إجمالي المتابعين', value: totals.totalFollowers, icon: Users },
    { label: 'برنامج', value: 12, icon: Clapperboard },
  ];

  return (
    <div className="slide relative overflow-hidden bg-notion-bg">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center z-10 max-w-4xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-3"
        >
          <span className="text-gradient">بث حديث</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-notion-text-secondary mb-6"
        >
          حاضنة البودكاست العربي
        </motion.p>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-6 w-full"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              className="card-compact text-center py-3"
            >
              <item.icon className="w-7 h-7 mx-auto mb-1 text-primary" />
              <p className="text-xl sm:text-2xl font-bold text-gradient mb-0.5">
                {formatNumber(item.value)}
              </p>
              <p className="text-[10px] text-notion-text-secondary">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-notion-text-secondary mt-4 text-xs"
        >
          بث حديث - التقرير السنوي 2025
        </motion.p>
      </motion.div>
    </div>
  );
}
