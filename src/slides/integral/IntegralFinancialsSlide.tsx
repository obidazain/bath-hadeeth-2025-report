import { motion } from 'framer-motion';

interface YearlyData {
  year: string;
  paidPromotion: string;
  revenue: string;
  arabyPostWebsite: string;
  arabyPostSocial: string;
  arabyPostTotal: string;
  bathHadeeth?: string;
}

const financialData: YearlyData[] = [
  { year: '2019', paidPromotion: '276K', revenue: '18K', arabyPostWebsite: '165M', arabyPostSocial: '50M', arabyPostTotal: '215M' },
  { year: '2020', paidPromotion: '264K', revenue: '14K', arabyPostWebsite: '200M', arabyPostSocial: '50M', arabyPostTotal: '250M' },
  { year: '2021', paidPromotion: '240K', revenue: '4K', arabyPostWebsite: '225M', arabyPostSocial: '100M', arabyPostTotal: '325M' },
  { year: '2022', paidPromotion: '180K', revenue: '4K', arabyPostWebsite: '180M', arabyPostSocial: '120M', arabyPostTotal: '300M' },
  { year: '2023', paidPromotion: '108K', revenue: '4K', arabyPostWebsite: '105M', arabyPostSocial: '210M', arabyPostTotal: '315M' },
  { year: '2024', paidPromotion: '0', revenue: '79K', arabyPostWebsite: '23M', arabyPostSocial: '173M', arabyPostTotal: '196M', bathHadeeth: '771M' },
  { year: '2025', paidPromotion: '0', revenue: '215K', arabyPostWebsite: '6.5M', arabyPostSocial: '338M', arabyPostTotal: '345M', bathHadeeth: '1.23B' },
];

// SVG Icons
const TrendDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const highlights = [
  {
    icon: TrendDownIcon,
    title: 'الترويج المدفوع',
    from: '276K',
    to: '0',
    color: 'green',
    description: 'تخفيض كامل للاعتماد على الإعلانات المدفوعة',
  },
  {
    icon: TrendUpIcon,
    title: 'العائدات',
    from: '18K',
    to: '215K',
    color: 'green',
    description: 'نمو العائدات بنسبة 1,094%',
  },
  {
    icon: RocketIcon,
    title: 'بث حديث',
    from: '0',
    to: '1.23B',
    color: 'purple',
    description: 'من الصفر إلى 1.23 مليار مشاهدة',
  },
  {
    icon: RefreshIcon,
    title: 'التحول الرقمي',
    from: 'الموقع',
    to: 'التواصل',
    color: 'blue',
    description: 'تحول من الموقع الإلكتروني إلى منصات التواصل',
  },
];

export function IntegralFinancialsSlide() {
  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
            المؤشرات المالية والإنتاجية
          </h2>
          <p className="text-gray-600 text-sm">
            تطور الأداء المالي من 2019 إلى 2025
          </p>
        </motion.div>

        {/* Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-4"
        >
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={highlight.title}
                className={`rounded-xl p-3 border-2 ${
                  highlight.color === 'green' ? 'bg-green-50 border-green-200' :
                  highlight.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${
                    highlight.color === 'green' ? 'text-green-600' :
                    highlight.color === 'purple' ? 'text-purple-600' :
                    'text-blue-600'
                  }`}>
                    <IconComponent />
                  </span>
                  <span className={`text-sm font-bold ${
                    highlight.color === 'green' ? 'text-green-700' :
                    highlight.color === 'purple' ? 'text-purple-700' :
                    'text-blue-700'
                  }`}>{highlight.title}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 line-through">{highlight.from}</span>
                  <ArrowRightIcon />
                  <span className={`text-lg font-bold ${
                    highlight.color === 'green' ? 'text-green-600' :
                    highlight.color === 'purple' ? 'text-purple-600' :
                    'text-blue-600'
                  }`}>{highlight.to}</span>
                </div>
                <p className="text-[10px] text-gray-500">{highlight.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-4 border border-gray-200 overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-2 px-3 text-right font-bold text-gray-700">السنة</th>
                <th className="py-2 px-3 text-center font-bold text-red-600">
                  <div className="flex flex-col items-center">
                    <span>الترويج المدفوع</span>
                    <span className="text-[10px] text-gray-400">$</span>
                  </div>
                </th>
                <th className="py-2 px-3 text-center font-bold text-green-600">
                  <div className="flex flex-col items-center">
                    <span>العائدات</span>
                    <span className="text-[10px] text-gray-400">$</span>
                  </div>
                </th>
                <th className="py-2 px-3 text-center font-bold text-blue-600">
                  <div className="flex flex-col items-center">
                    <span>عربي بوست (الموقع)</span>
                    <span className="text-[10px] text-gray-400">مشاهدات</span>
                  </div>
                </th>
                <th className="py-2 px-3 text-center font-bold text-blue-600">
                  <div className="flex flex-col items-center">
                    <span>عربي بوست (التواصل)</span>
                    <span className="text-[10px] text-gray-400">مشاهدات</span>
                  </div>
                </th>
                <th className="py-2 px-3 text-center font-bold text-blue-700">
                  <div className="flex flex-col items-center">
                    <span>عربي بوست (المجموع)</span>
                    <span className="text-[10px] text-gray-400">مشاهدات</span>
                  </div>
                </th>
                <th className="py-2 px-3 text-center font-bold text-purple-600">
                  <div className="flex flex-col items-center">
                    <span>بث حديث</span>
                    <span className="text-[10px] text-gray-400">مشاهدات</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((row) => (
                <tr
                  key={row.year}
                  className={`border-b border-gray-100 ${
                    row.year === '2025' ? 'bg-orange-50' : ''
                  } ${row.year === '2024' ? 'bg-green-50/50' : ''}`}
                >
                  <td className="py-2 px-3 text-right">
                    <span className={`font-bold ${
                      row.year === '2025' ? 'text-orange-600' :
                      row.year === '2024' ? 'text-green-600' : 'text-gray-700'
                    }`}>{row.year}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`font-medium ${
                      row.paidPromotion === '0' ? 'text-green-600' : 'text-red-500'
                    }`}>{row.paidPromotion}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="font-medium text-green-600">{row.revenue}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="font-medium text-blue-500">{row.arabyPostWebsite}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="font-medium text-blue-500">{row.arabyPostSocial}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="font-bold text-blue-700">{row.arabyPostTotal}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    {row.bathHadeeth ? (
                      <span className="font-bold text-purple-600">{row.bathHadeeth}</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center justify-center gap-6 text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded" />
            <span>2025 - الوضع الحالي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-50 border border-green-200 rounded" />
            <span>2024 - نقطة التحول</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>نمو إيجابي</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
