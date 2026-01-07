import { motion } from 'framer-motion';

const culturePoints = [
  { title: 'التسمية', titleEn: 'Naming', slideIndex: 14 },
  { title: 'الابتكارية', titleEn: 'Innovation', slideIndex: 15 },
  { title: 'التواصل', titleEn: 'Communication', slideIndex: 16 },
  { title: 'النقدية', titleEn: 'Critical Thinking', slideIndex: 17 },
  { title: 'اللامركزية', titleEn: 'Decentralization', slideIndex: 18 },
  { title: 'التكيف', titleEn: 'Adaptation', slideIndex: 19 },
  { title: 'التوثيق', titleEn: 'Documentation', slideIndex: 20 },
  { title: 'قراءة البيانات', titleEn: 'Data Analysis', slideIndex: 21 },
];

interface IntegralCultureIntroSlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralCultureIntroSlide({ onNavigate }: IntegralCultureIntroSlideProps) {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center z-10 max-w-6xl mx-auto w-full px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900">
            ثقافة العمل{' '}
            <span className="text-orange-500">التوجيهية</span>
          </h1>
          <p className="text-2xl text-gray-500 mt-2">Guiding Work Culture</p>
        </motion.div>

        {/* Culture Points Grid - 2 rows x 4 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-4"
        >
          {culturePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              onClick={() => onNavigate?.(point.slideIndex)}
              className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-orange-300 hover:shadow-lg transition-all text-center cursor-pointer"
            >
              {/* Number */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold mb-3 shadow-md">
                {index + 1}
              </span>
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 leading-relaxed">
                {point.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {point.titleEn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
