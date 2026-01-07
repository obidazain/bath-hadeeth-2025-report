import { motion } from 'framer-motion';

export function ArabyPostNewDirectionSlide() {
  const directions = [
    { en: 'Abandoning numerical and volume-based reach targets in favor of influence-driven impact goals.', ar: 'إلغاء أهداف الانتشار العددي والكمي واستبدالها بأهداف الانتشار المؤثر.' },
    { en: 'Strengthening investigative journalism, verification-based reporting, exclusive stories, and in-depth explanatory content.', ar: 'تعزيز العمل الصحفي الاستقصائي والتحققي والتقارير الحصرية والمواد الشارحة.' },
    { en: 'Maintaining ArabicPost\'s editorial and journalistic vision as open and adaptive to new platforms and media products consumed by audiences.', ar: 'إبقاء رؤى عربي بوست الصحفية والإعلامية منفتحة تجاه المنصات والمنتجات الجديدة التي يستهلكها الجمهور.' },
  ];

  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#08b2e3]/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#08b2e3] to-[#06a0cf] text-white shadow-xl">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
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
          التوجه{' '}
          <span className="text-[#08b2e3]">الاستراتيجي</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Strategic Direction
        </motion.p>

        {/* Content */}
        <div className="space-y-4">
          {directions.map((direction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#08b2e3] text-white flex items-center justify-center text-lg font-bold">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg sm:text-xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
                  {direction.ar}
                </p>
                <p className="text-base leading-relaxed text-gray-400 mt-2" dir="ltr" style={{ textAlign: 'justify' }}>
                  {direction.en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
