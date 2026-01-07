import { motion } from 'framer-motion';

export function ArabyPostTransformSlide() {
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
              <path strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
          التحول{' '}
          <span className="text-[#08b2e3]">2024</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Transformation 2024
        </motion.p>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          >
            <p className="text-base leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
              في عام 2024 تبنت المؤسسة نهجاً لدمج الذكاء الاصطناعي في دورة العمل ودعم الأتمتة وتغيير رسالة عربي بوست من موقع إعلامي للمنوعات والمدونات والأخبار السياسية إلى موقع للتحقيقات الاستقصائية والشارح السياسي مع إلغاء أقسام الأخبار والتدوين والمحتوى الأخضر والتحليلات والمنوعات والمواضيع المترجمة والفيديوهات الإخبارية القصيرة.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#08b2e3]/5 rounded-3xl p-8 border border-[#08b2e3]/20"
          >
            <p className="text-base leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              In 2024, the organization adopted a new strategic direction focused on integrating artificial intelligence into its workflows, enhancing automation, and redefining ArabicPost's mission. The platform transitioned from a media outlet centered on mixed content—blogs, general news, political coverage, and lifestyle topics—into a platform dedicated to investigative journalism and political explainers. As part of this shift, the following sections were discontinued: daily news, blogging, SEO-driven ("evergreen") content, opinion analyses, lifestyle and variety content, translated topics, and short-form news videos.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
