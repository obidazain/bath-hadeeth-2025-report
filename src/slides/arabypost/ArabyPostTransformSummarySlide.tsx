import { motion } from 'framer-motion';

const stats = [
  {
    platform: 'Website',
    platformAr: 'الموقع',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    from: '22.9M',
    to: '6.5M',
    is2024Higher: true,
  },
  {
    platform: 'Instagram',
    platformAr: 'إنستجرام',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" strokeWidth="2" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
    from: '6.2M',
    to: '38.7M',
    is2024Higher: false,
    subtitle: 'Peak Views',
    subtitleAr: 'ذروة المشاهدات',
  },
  {
    platform: 'TikTok',
    platformAr: 'تيكتوك',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
    from: '180K',
    to: '22M',
    is2024Higher: false,
    subtitle: 'Peak Views',
    subtitleAr: 'ذروة المشاهدات',
  },
  {
    platform: 'Facebook',
    platformAr: 'فيسبوك',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    from: '300',
    to: '1.8K',
    is2024Higher: false,
    subtitle: 'Engagement',
    subtitleAr: 'التفاعلات',
  },
];

export function ArabyPostTransformSummarySlide() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            ملخص{' '}
            <span className="text-[#08b2e3]">التحول الرقمي</span>
          </h2>
          <p className="text-xl text-gray-500 mt-1" dir="ltr" style={{ textAlign: 'left' }}>Digital Transformation Summary</p>
          <p className="text-lg text-gray-400 mt-2">مقارنة الأداء بين 2024 و 2025 | Performance Comparison 2024 vs 2025</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.platform}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#08b2e3]/10 text-[#08b2e3] mb-4">
                {stat.icon}
              </div>

              {/* Platform Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-0">{stat.platformAr}</h3>
              <p className="text-xs text-gray-400 mb-1">{stat.platform}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mb-3">{stat.subtitleAr} | {stat.subtitle}</p>
              )}

              {/* From/To */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">2024</p>
                  <span className={`text-xl font-bold ${stat.is2024Higher ? 'text-[#08b2e3]' : 'text-gray-400'}`}>{stat.from}</span>
                </div>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">2025</p>
                  <span className={`text-xl font-bold ${stat.is2024Higher ? 'text-gray-400' : 'text-[#08b2e3]'}`}>{stat.to}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-[#08b2e3]/5 rounded-2xl p-5 border border-[#08b2e3]/20"
        >
          <p className="text-center text-gray-700 text-base" style={{ direction: 'rtl' }}>
            انخفاض زيارات الموقع مقابل <span className="text-[#08b2e3] font-bold">نمو كبير</span> في التفاعل على منصات التواصل الاجتماعي - تحول واضح في سلوك الجمهور
          </p>
          <p className="text-center text-gray-500 text-sm mt-2" style={{ direction: 'ltr' }}>
            Website visits declined while <span className="text-[#08b2e3] font-bold">significant growth</span> occurred on social media platforms - a clear shift in audience behavior
          </p>
        </motion.div>
      </div>
    </div>
  );
}
