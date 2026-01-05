import { motion } from 'framer-motion';

const stats = [
  {
    platform: 'الموقع',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    change: -72,
    from: '22.9M',
    to: '6.5M',
    color: 'red',
  },
  {
    platform: 'إنستجرام',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" strokeWidth="2" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
    change: 524,
    from: '6.2K',
    to: '38.7K',
    color: 'green',
  },
  {
    platform: 'تيكتوك',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
    change: 12222,
    from: '180',
    to: '22K',
    color: 'green',
  },
  {
    platform: 'فيسبوك',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    change: 515,
    from: '300',
    to: '1.8K',
    color: 'green',
    subtitle: 'التفاعلات',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-right">
            ملخص{' '}
            <span className="text-[#08b2e3]">التحول الرقمي</span>
          </h2>
          <p className="text-lg text-gray-500 mt-2 text-right">مقارنة الأداء بين 2024 و 2025</p>
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
              <h3 className="text-lg font-bold text-gray-800 mb-1">{stat.platform}</h3>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mb-2">{stat.subtitle}</p>
              )}

              {/* Change Percentage */}
              <div className={`text-3xl font-bold mb-3 ${stat.color === 'green' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change > 0 ? '+' : ''}{stat.change.toLocaleString()}%
              </div>

              {/* From/To */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-400">{stat.from}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="text-gray-700 font-semibold">{stat.to}</span>
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
          <p className="text-center text-gray-700 text-lg" style={{ direction: 'rtl' }}>
            انخفاض زيارات الموقع مقابل <span className="text-[#08b2e3] font-bold">نمو كبير</span> في التفاعل على منصات التواصل الاجتماعي - تحول واضح في سلوك الجمهور
          </p>
        </motion.div>
      </div>
    </div>
  );
}
