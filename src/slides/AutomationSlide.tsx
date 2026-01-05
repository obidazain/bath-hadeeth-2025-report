import { motion } from 'framer-motion';

interface ComparisonStat {
  label: string;
  before: string;
  after: string;
}

const comparisonStats: ComparisonStat[] = [
  { label: 'الحلقات شهرياً', before: '13', after: '45-50' },
  { label: 'المقاطع شهرياً', before: '300', after: '+1000' },
  { label: 'الجلسات يومياً', before: '1-2', after: '3-4' },
  { label: 'وقت المونتاج', before: '2-3 أيام', after: '6 ساعات' },
];

export function AutomationSlide() {

  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-1">
            <span className="text-2xl ml-2">🤖</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              الأتمتة والذكاء الاصطناعي
            </span>
          </h2>
          <p className="text-notion-text-secondary text-sm">
            تحول جذري من العمل اليدوي إلى الأتمتة
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-50 to-white border-4 border-purple-200 rounded-2xl p-4 relative"
          >
            {/* Warning Badge */}
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center text-xl rotate-12 shadow-lg">
              ⚠️
            </div>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-purple-600">الوضع السابق</h3>
            </div>

            <div className="space-y-2">
              {comparisonStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200"
                >
                  <span className="text-sm text-red-800 font-medium">{stat.label}</span>
                  <span className="text-lg font-bold text-purple-600">{stat.before}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-dashed border-red-200 text-center">
              <p className="text-sm text-red-700">
                🔧 عمل يدوي بالكامل<br />
                ⏱️ بطء في الإنجاز<br />
                💰 تكاليف عالية
              </p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-xl">
              <svg className="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="mt-2 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI + الأتمتة
            </p>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-white border-4 border-green-500 rounded-2xl p-4 relative"
          >
            {/* Success Badge */}
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl -rotate-12 shadow-lg text-white font-bold">
              ✓
            </div>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-green-600">الوضع الحالي</h3>
            </div>

            <div className="space-y-2">
              {comparisonStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="text-sm text-green-800 font-medium">{stat.label}</span>
                  <span className="text-lg font-bold text-green-600">{stat.after}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-dashed border-green-300 text-center">
              <p className="text-sm text-green-700">
                🤖 أتمتة 80% من المهام<br />
                ⚡ سرعة فائقة<br />
                💎 جودة عالية
              </p>
            </div>
          </motion.div>
        </div>

        {/* ORCA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-xl p-3 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            {/* ORCA Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">🐋</span>
              </div>
            </div>

            {/* ORCA Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-black tracking-wide">ORCA</h3>
                <span className="px-2 py-0.5 bg-amber-500 text-amber-900 text-[10px] font-bold rounded-full">
                  المرحلة الرابعة - قيد التطوير
                </span>
              </div>
              <p className="text-blue-200 text-xs leading-relaxed">
                منصة إنتاج بودكاست متكاملة معززة بالذكاء الاصطناعي
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">مونتاج آلي</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">تحرير بالنص</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">إدارة الاستديو</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">النشر والتوزيع</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">التحليلات</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-blue-100">الإعداد التحريري</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
