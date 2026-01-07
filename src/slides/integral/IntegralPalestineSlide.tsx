import { motion } from 'framer-motion';

interface IntegralPalestineSlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralPalestineSlide({ onNavigate }: IntegralPalestineSlideProps) {
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
              <path strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
          تحرير{' '}
          <span className="text-orange-500">فلسطين</span>{' '}خطوة
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          The Liberation of Palestine as a First Step
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
              إن الأرض المباركة والمسجد الأقصى من عناوين وحدة المسلمين وبوصلة للأحرار في العالم، وتحريرها أولى الخطوات لخروجنا من هامش التاريخ، وابتعاث دورنا في مسيرة الإنسان، واستعادة الوعي الوحدوي الذي تحمله أحلامنا، إن القوامة على قبلتنا الأولى هو حجر الأساس لمشروع حضاري أكبر يبشر بالخير والعدالة والكرامة والأمان والازدهار.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-orange-50 rounded-3xl p-8 border border-orange-100"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              The blessed land and Al-Aqsa Mosque are among the central symbols of Muslim unity and a compass for free people around the world. Their liberation is the first step toward emerging from the margins of history, reviving our role in the human journey, and restoring the collective consciousness carried by our dreams. The guardianship of our first qibla is the cornerstone of a greater civilizational project—one that heralds goodness, justice, dignity, security, and prosperity.
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
