import { motion } from 'framer-motion';

export function ArabyPostPolicySlide() {
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
              <path strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
          تغير{' '}
          <span className="text-[#08b2e3]">سياسة التحرير</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Change in Editorial Policy
        </motion.p>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          >
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
              بسبب التغير التدريجي في سياسة التحرير من المساحات الترفيهية التي كان يعتمدها هاف بوست وتبني عمل إخباري أكبر، تقلصت قدرات الموقع في الوصول لمزيد من الجمهور وتحقيق زيارات أكبر.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#08b2e3]/5 rounded-3xl p-8 border border-[#08b2e3]/20"
          >
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              As editorial policies gradually shifted away from the entertainment-oriented spaces that HuffPost had relied on, toward more news-focused content, the website's ability to reach wider audiences and generate higher traffic declined.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
