import { motion } from 'framer-motion';

export function IntegralNamingSlide() {
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
              <path strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8"
        >
          <span className="text-orange-500">التسمية</span>
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
        >
          <p className="text-xl sm:text-2xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
            نبدأ بالبسملة ونتوجه باسم الله أن يوفق عملنا ونستذكر كيف علم الله أبونا آدم الأسماء كلها، ولذلك نحرص على تسمية الأشياء والخطط والمراحل والأعمال وإنتاجنا، فالألفة والرمزية وإعادة التعريف جوهرية في هذا النوع من الأعمال الإعلامية الإبداعية.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
