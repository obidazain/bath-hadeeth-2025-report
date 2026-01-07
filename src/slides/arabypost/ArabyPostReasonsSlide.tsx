import { motion } from 'framer-motion';

export function ArabyPostReasonsSlide() {
  const reasons = [
    { en: 'A decline in news consumption on websites in favor of social media platforms.', ar: 'تقلص المتابعات الخبرية على المواقع لصالح شبكات التواصل الاجتماعي.' },
    { en: 'Social media platforms\' control over traffic distribution, including algorithmic throttling and reduced content visibility.', ar: 'تحكم شبكات التواصل الاجتماعي للوصول لصفحات الموقع وتقييدها وتخفيض نسبة ظهورها للمستخدمين.' },
    { en: 'The growing role of individuals and independent creators in news dissemination via social networks.', ar: 'تعاظم دور الأفراد والمستقلين في تغطيات ونقل الأخبار على شبكات التواصل الاجتماعي.' },
    { en: 'The emergence of AI-powered generative search engines, which are expected in the near future to replace SEO-driven ("evergreen") content within the content industry.', ar: 'ظهور محركات البحث التوليدية المدعمة بالذكاء الاصطناعي، والتي من المتوقع خلال الفترة القادمة أن تقوم باستبدال المحتوى الأخضر في صناعة المحتوى.' },
    { en: 'The relatively weak financial returns of video content compared to the resources allocated to its production, especially when benchmarked against other platforms.', ar: 'ضعف عائد المرئيات ( الفيديو ) مقارنة بالموارد المخصصة للإنتاج في المشروع ومقارنة بأرقام المنصات الأخرى.' },
    { en: 'The rise of podcasts as a widely accepted and rapidly growing media product, offering greater space for expression compared to written blogs.', ar: 'بروز البودكاست كمنتج إعلامي يلقى قبول كبير وانتشار مضاعف لدى الجمهور ومساحة للتعبير عن الرأي أكبر من المدونات المكتوبة.' },
    { en: 'The increasing cost of paid advertising and promotion, coupled with its limited long-term impact.', ar: 'ارتفاع كلفة الإعلانات المدفوعة والترويج، ومحدودية أثرها على المدى البعيد.' },
    { en: 'The growing capabilities of artificial intelligence in handling routine and repetitive editorial and administrative tasks, and the desire to adopt and leverage these tools.', ar: 'بروز إمكانيات الذكاء الاصطناعي في المهام النمطية والتكرارية المكتبية والرغبة في تبنيها والاستفادة منها.' },
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
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
        >
          أسباب{' '}
          <span className="text-[#08b2e3]">التغيير</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-500 mb-8"
          dir="ltr"
          style={{ textAlign: 'left' }}
        >
          Reasons for Change
        </motion.p>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 gap-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#08b2e3] text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm text-gray-700 text-right leading-relaxed" style={{ direction: 'rtl' }}>
                  {reason.ar}
                </p>
                <p className="text-xs text-gray-400 text-left leading-relaxed mt-1" style={{ direction: 'ltr' }}>
                  {reason.en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
