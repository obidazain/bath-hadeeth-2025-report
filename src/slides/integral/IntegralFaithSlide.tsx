import { motion } from 'framer-motion';

interface IntegralFaithSlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralFaithSlide({ onNavigate }: IntegralFaithSlideProps) {
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
              <path strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
        >
          <span className="text-orange-500">التدين</span>{' '}فطرة وانسجام مع الكون
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Faith as a Natural Disposition and Harmony with the Universe
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
              التدين احتياج فطري لدى الإنسان، ومستند للأخلاق، يسمو بالروح في علاقتها مع الخالق، ويبعث الطمأنينة في النفس عبر إجابة المجهول وتفسير الحياة والموت والبحث عن معنى الإنسان ضمن المجموع وذلك ينعكس في سلوكه مع الآخرين وتأثيره المحمود على محيطه وبيئته.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-orange-50 rounded-3xl p-8 border border-orange-100"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              Religiosity is an innate human need and a foundation for ethics. It elevates the soul in its relationship with the Creator and brings tranquility to the self by answering the unknown, interpreting life and death, and seeking the meaning of the human being within the collective. This is reflected in one's conduct with others and in a positive influence on one's surroundings and environment.
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
