import { motion } from 'framer-motion';

interface IntegralUmmaSlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralUmmaSlide({ onNavigate }: IntegralUmmaSlideProps) {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center z-10 max-w-5xl mx-auto w-full px-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2"
        >
          <span className="text-orange-500">وحدة</span>{' '}الأمة
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Unity of the Ummah
        </motion.p>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
              الأمة مستودع الحق ونحن أمة واحدة بتوجيه سماوي، عبرنا به التاريخ والجغرافية والعرق والقومية واللغة منذ أكثر من ١٤٠٠ عام، من أقصى المحيط إلى أقصى المحيط، فأصبحت جزء من وجدان وجينات شعوب المسلمين، ولا يمكن لمئة عام من الابتلاء والضعف أن تغير هذه الحقيقة، فالتحديات والمصير واحد.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-orange-50 rounded-3xl p-8 border border-orange-100"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              The Ummah (the global Muslim community) is a vessel of truth and one nation by divine guidance. Through this guidance, Muslims have transcended history, geography, ethnicity, nationalism, and language for over 1,400 years—from one end of the world to the other. This unity has become embedded in the collective consciousness and cultural fabric of Muslim societies. A century of hardship, fragmentation, and weakness cannot erase this reality. Our challenges are shared, and so is our destiny.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Back Button - Fixed Left */}
      {onNavigate && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => onNavigate(2)}
          className="absolute left-6 bottom-6 w-12 h-12 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
