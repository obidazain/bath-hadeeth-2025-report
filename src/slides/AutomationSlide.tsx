import { motion } from 'framer-motion';
import { Bot, User, AlertTriangle, Wrench, Clock, Coins, Zap, Gem, Fish } from 'lucide-react';

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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9a6dd7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#9a6dd7]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-1 flex items-center justify-center gap-2">
            <Bot className="w-7 h-7 text-[#9a6dd7]" />
            <span className="text-[#9a6dd7]">
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
            className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 relative"
          >
            {/* Warning Badge */}
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center rotate-12 shadow-lg">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-600">الوضع السابق</h3>
            </div>

            <div className="space-y-2">
              {comparisonStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200"
                >
                  <span className="text-sm text-red-800 font-medium">{stat.label}</span>
                  <span className="text-lg font-bold text-gray-600">{stat.before}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-dashed border-red-200">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-red-700">
                  <Wrench className="w-4 h-4" />
                  <span>عمل يدوي بالكامل</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700">
                  <Clock className="w-4 h-4" />
                  <span>بطء في الإنجاز</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700">
                  <Coins className="w-4 h-4" />
                  <span>تكاليف عالية</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="bg-[#9a6dd7] text-white p-4 rounded-full shadow-xl">
              <svg className="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="mt-2 text-base font-bold text-[#9a6dd7]">
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
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center -rotate-12 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Bot className="w-8 h-8 text-white" />
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

            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-dashed border-green-300">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Bot className="w-4 h-4" />
                  <span>أتمتة 80% من المهام</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Zap className="w-4 h-4" />
                  <span>سرعة فائقة</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Gem className="w-4 h-4" />
                  <span>جودة عالية</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ORCA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-xl p-3 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9a6dd7] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#9a6dd7] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            {/* ORCA Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Fish className="w-10 h-10 text-[#9a6dd7]" />
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
              <p className="text-purple-200 text-xs leading-relaxed">
                منصة إنتاج بودكاست متكاملة معززة بالذكاء الاصطناعي
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">مونتاج آلي</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">تحرير بالنص</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">إدارة الاستديو</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">النشر والتوزيع</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">التحليلات</span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 text-center">
                <span className="text-[9px] text-purple-100">الإعداد التحريري</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
