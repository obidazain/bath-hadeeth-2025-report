import { motion } from 'framer-motion';

export function ArabyPostCoronaSlide() {
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
              <path strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
          قفزة{' '}
          <span className="text-[#08b2e3]">كورونا</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          COVID-19 Surge
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
              في عام كورونا قفزت الزيارات في الموقع بشكل غير مسبوق بسبب الحظر الشامل ولم يكن ذلك استثناء بل كانت موجة استفادت منها أغلب المواقع الإخبارية في العالم، واستطاع الموقع الحفاظ على هذا الزخم لعام ونصف.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#08b2e3]/5 rounded-3xl p-8 border border-[#08b2e3]/20"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              Despite these challenges, during the COVID-19 year the website experienced an unprecedented surge in traffic as a result of global lockdowns. This was not unique to ArabicPost, but part of a broader wave that benefited news websites worldwide. The platform succeeded in maintaining this momentum for approximately a year and a half.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
