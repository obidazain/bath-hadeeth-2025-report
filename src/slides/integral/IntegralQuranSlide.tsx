import { motion } from 'framer-motion';

export function IntegralQuranSlide() {
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
              <path strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
          القرآن الكريم{' '}
          <span className="text-orange-500">مصدر إلهامنا</span>
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
        >
          <p className="text-xl sm:text-2xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
            فكلمات الله مركز الهداية والحكمة وفهمنا للكليات، تعزز أفهامنا، وتزكينا، وتذكرنا بالمنشأ والمآل، تحثنا على المسير والتفكر، وتربط وعي المسلمين معاً، فهو المرجعية الفكرية والأخلاقية في حياتنا الأولى وبشرى في حياتنا الأخرى وسيرة النبي صلى الله عليه وسلم هي المثال الحركي والخلقي والتعبدي الأسمى الذي نقتدي به.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
