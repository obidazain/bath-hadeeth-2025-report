import { motion } from 'framer-motion';

const values = [
  { title: 'القرآن الكريم مصدر إلهامنا', titleEn: 'The Quran is Our Source of Inspiration', slideIndex: 3 },
  { title: 'وحدة الأمة', titleEn: 'Unity of the Ummah', slideIndex: 4 },
  { title: 'المجتمع أهم من الفرد وأكبر من الدولة', titleEn: 'Society is Greater than the Individual and the State', slideIndex: 5 },
  { title: 'الإنسان مؤتمن', titleEn: 'Humans are Entrusted', slideIndex: 6 },
  { title: 'الاستبداد سبب التبعية والتطرف والفقر', titleEn: 'Tyranny Causes Dependency, Extremism & Poverty', slideIndex: 7 },
  { title: 'تحرير فلسطين خطوة', titleEn: 'Liberating Palestine is a Step', slideIndex: 8 },
  { title: 'التدين فطرة وانسجام مع الكون', titleEn: 'Faith is Natural & Harmony with the Universe', slideIndex: 9 },
  { title: 'القيام على الأسرة عبادة', titleEn: 'Family Care is Worship', slideIndex: 10 },
  { title: 'المرأة الركيزة', titleEn: 'Women are the Foundation', slideIndex: 11 },
  { title: 'الاقتصاد', titleEn: 'Economy', slideIndex: 12 },
];

interface IntegralValuesIntroSlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralValuesIntroSlide({ onNavigate }: IntegralValuesIntroSlideProps) {
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
            المضامين{' '}
            <span className="text-orange-500">والرسالة</span>
          </h1>
          <p className="text-2xl text-gray-500 mt-2" dir="ltr" style={{ textAlign: 'left' }}>Values & Message</p>
        </motion.div>

        {/* Values Grid - 2 rows x 5 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-5 gap-4"
        >
          {values.map((value, index) => (
            <motion.button
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              onClick={() => onNavigate?.(value.slideIndex)}
              className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-orange-300 hover:shadow-lg transition-all text-center cursor-pointer"
            >
              {/* Number */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold mb-3 shadow-md">
                {index + 1}
              </span>
              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 leading-relaxed">
                {value.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1" dir="ltr" style={{ textAlign: 'left' }}>
                {value.titleEn}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
