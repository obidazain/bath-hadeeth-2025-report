import { motion } from 'framer-motion';

interface IntegralTyrannySlideProps {
  onNavigate?: (slideIndex: number) => void;
}

export function IntegralTyrannySlide({ onNavigate }: IntegralTyrannySlideProps) {
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
              <path strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
          <span className="text-orange-500">الاستبداد</span>{' '}سبب التبعية والتطرف والفقر
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Tyranny as the Root of Dependency, Extremism, and Poverty
        </motion.p>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
              منظومات الحكم المستبدة هي نقيض لمراد الله وسنته في الكون من تنوع واختلاف يقتضي المدافعة والاستخلاف، وإقصاء للتشارك والتشاور، وإطفاء للإبداع والإثراء، ذلك ولد فقر شديد على مستوى الأفكار والإدارة والموارد، فالفساد والاستغلال والبغي جزء لا يتجزأ من طبيعة الاستبداد، فأشغلت الأوطان في صدام مع ضمير المجتمع وهويته، وهلك الحرث والنسل، وعادت خيرات البلاد مرتعاً للمستعمر وبقي لنا من الاستقلال أيام الاحتفال.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-orange-50 rounded-3xl p-8 border border-orange-100"
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-700" dir="ltr" style={{ textAlign: 'justify' }}>
              Tyrannical systems of governance are the antithesis of God's will and His cosmic order, which is characterized by diversity and difference—conditions that necessitate mutual challenge (mudafa'a) and stewardship (istikhlaf). These systems exclude participation and consultation, extinguish creativity and enrichment. This has led to profound poverty at the level of ideas, governance, and resources. Corruption, exploitation, and oppression are inseparable from the nature of tyranny. Nations have been drawn into conflict with society's conscience and identity, resulting in the destruction of life and progeny. Our lands have once again become a pasture for colonizers, and what remains of independence is merely days of celebration.
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
