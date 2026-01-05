import { motion } from 'framer-motion';
import bathHadeethLogo from '../assets/logos/LOGO_Bath hadeeth.png';

export function IntroSlide() {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9a6dd7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#e255a1]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <img
            src={bathHadeethLogo}
            alt="بث حديث"
            className="h-28 md:h-36 object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(1868%) hue-rotate(243deg) brightness(87%) contrast(92%)' }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-[#9a6dd7] font-medium mb-1"
        >
          حاضنة البودكاست العربي
        </motion.p>

        {/* Big Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-[#9a6dd7] to-[#e255a1] bg-clip-text text-transparent">
            +1.2B
          </div>
          <p className="text-base sm:text-lg text-gray-500 mt-2">
            مليار مشاهدة في 2025
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#9a6dd7]">12</p>
            <p className="text-sm text-gray-500">برنامج</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#e255a1]">+8.2M</p>
            <p className="text-sm text-gray-500">متابع</p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-32 h-1 bg-gradient-to-r from-[#9a6dd7] to-[#e255a1] rounded-full mt-8"
        />
      </div>
    </div>
  );
}
