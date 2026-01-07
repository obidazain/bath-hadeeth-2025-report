import { motion } from 'framer-motion';

export function BismillahSlide() {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[#9a6dd7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[#9a6dd7]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        {/* Arabic Bismillah with Tashkeel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#9a6dd7] leading-relaxed"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#9a6dd7]/40 to-transparent mb-8"
        />

        {/* English Translation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-light tracking-wide" dir="ltr" style={{ textAlign: 'justify' }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </motion.div>
      </div>
    </div>
  );
}
