import { motion } from 'framer-motion';

// دالة لتنسيق النص وجعل ما بين الأقواس bold وبلون مختلف
const formatEventText = (text: string) => {
  const parts = text.split(/(\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('(') && part.endsWith(')')) {
      return (
        <span key={index} className="font-bold text-orange-600">
          {part}
        </span>
      );
    }
    return part;
  });
};

interface TimelineYear {
  year: string;
  events: {
    month?: string;
    monthEn?: string;
    event: string;
    eventEn?: string;
  }[];
  financials?: {
    paidPromotion: string;
    revenue: string;
    arabyPostWebsite: string;
    arabyPostSocial: string;
    arabyPostTotal: string;
    bathHadeeth?: string;
  };
}

const timelineData: TimelineYear[] = [
  {
    year: '2019',
    events: [
      { event: 'عام بعد التحول من هافنجتون بوست العربي', eventEn: 'One year after transition from HuffPost Arabic' },
    ],
    financials: {
      paidPromotion: '276K',
      revenue: '18K',
      arabyPostWebsite: '165M',
      arabyPostSocial: '50M',
      arabyPostTotal: '215M',
    },
  },
  {
    year: '2020',
    events: [
      { month: 'مارس', monthEn: 'March', event: 'مدير المواقع الإلكترونية', eventEn: 'Director of Digital Platforms' },
      { month: 'ابريل', monthEn: 'April', event: 'تحديث البنية التحتية الرقمية', eventEn: 'Digital infrastructure upgrade' },
      { month: 'يونيو', monthEn: 'June', event: 'إطلاق أسباب', eventEn: 'Launch of Asbab' },
      { month: 'نوفمبر', monthEn: 'November', event: 'نائب الرئيس التنفيذي', eventEn: 'Deputy CEO' },
      { month: 'ديسمبر', monthEn: 'December', event: 'رئيس التحرير - مدير الاستثمار - المدير المالي', eventEn: 'Editor-in-Chief – Investment Director – CFO' },
    ],
    financials: {
      paidPromotion: '264K',
      revenue: '14K',
      arabyPostWebsite: '200M',
      arabyPostSocial: '50M',
      arabyPostTotal: '250M',
    },
  },
  {
    year: '2021',
    events: [
      { month: 'يناير', monthEn: 'January', event: 'تحديث الدليل الوظيفي', eventEn: 'Job framework update' },
      { month: 'يونيو', monthEn: 'June', event: 'إعادة الهيكلة في مؤسسة انتجرال ميديا (الشيخ جراح)', eventEn: 'Restructuring of Integral Media (Sheikh Jarrah)' },
    ],
    financials: {
      paidPromotion: '240K',
      revenue: '4K',
      arabyPostWebsite: '225M',
      arabyPostSocial: '100M',
      arabyPostTotal: '325M',
    },
  },
  {
    year: '2022',
    events: [
      { month: 'يونيو', monthEn: 'June', event: 'ترشيد وهيكلة الموارد المالية (الغيمة)', eventEn: 'Financial rationalization & restructuring (The Cloud)' },
    ],
    financials: {
      paidPromotion: '180K',
      revenue: '4K',
      arabyPostWebsite: '180M',
      arabyPostSocial: '120M',
      arabyPostTotal: '300M',
    },
  },
  {
    year: '2023',
    events: [
      { month: 'يونيو', monthEn: 'June', event: 'استضافات حية وندوات عامة', eventEn: 'Live hosting & public forums' },
      { month: 'أكتوبر', monthEn: 'October', event: 'إطلاق بث حديث (الأشرعة العريضة)', eventEn: 'Launch of Bath Hadeeth (Broad Sails)' },
    ],
    financials: {
      paidPromotion: '108K',
      revenue: '4K',
      arabyPostWebsite: '105M',
      arabyPostSocial: '210M',
      arabyPostTotal: '315M',
    },
  },
  {
    year: '2024',
    events: [
      { month: 'يناير', monthEn: 'January', event: 'استراتيجية (رياح الجنوب) عربي بوست', eventEn: '"Southern Winds" Strategy – Arabi Post' },
      { month: 'مارس', monthEn: 'March', event: 'توفير التدريس باللغة التركية', eventEn: 'Turkish-language instruction provided' },
    ],
    financials: {
      paidPromotion: '0',
      revenue: '79K',
      arabyPostWebsite: '23M',
      arabyPostSocial: '173M',
      arabyPostTotal: '196M',
      bathHadeeth: '771M',
    },
  },
  {
    year: '2025',
    events: [
      { month: 'ديسمبر', monthEn: 'December', event: 'إطلاق رؤية 26-28 (المرافئ الجديدة)', eventEn: 'Launch of Vision 26–28 (New Harbors)' },
    ],
    financials: {
      paidPromotion: '0',
      revenue: '215K',
      arabyPostWebsite: '6.5M',
      arabyPostSocial: '338M',
      arabyPostTotal: '345M',
      bathHadeeth: '1.23B',
    },
  },
];

export function IntegralTimelineSlide() {
  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-4 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
            خطوط زمنية ومؤشرات مالية
          </h2>
          <p className="text-gray-600 text-lg font-medium" dir="ltr">
            Timelines & Financial Indicators
          </p>
          <p className="text-gray-500 text-sm mt-1">
            رحلة انتجرال ميديا من 2019 إلى 2025
            <span className="mx-2">|</span>
            <span dir="ltr">Integral Media Journey 2019–2025</span>
          </p>
        </motion.div>

        {/* Column Headers - عربي بوست group */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-end mb-1 mr-16"
          style={{ paddingLeft: '12px' }}
        >
          <div className="flex-1" />
          <div className="flex flex-shrink-0" style={{ gap: '8px', marginLeft: '2px' }}>
            <div style={{ width: '56px' }} />
            <div style={{ width: '56px' }} />
            {/* عربي بوست Group Header */}
            <div style={{ width: '152px' }} className="text-center border-b-2 border-blue-500 pb-1">
              <span className="text-xs font-bold text-blue-600">عربي بوست</span>
              <span className="text-[9px] text-blue-400 block" dir="ltr">Arabi Post</span>
            </div>
            <div style={{ width: '60px' }} />
          </div>
        </motion.div>
        {/* Column Headers - Individual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center mb-3 mr-16"
          style={{ paddingLeft: '12px' }}
        >
          <div className="flex-1">
            <span className="text-sm font-bold text-gray-700">الأحداث الرئيسية</span>
            <span className="text-xs text-gray-500 block" dir="ltr">Key Milestones</span>
          </div>
          <div className="flex flex-shrink-0" style={{ gap: '8px', marginLeft: '2px' }}>
            <div style={{ width: '56px' }} className="text-center border-l border-gray-400">
              <span className="text-[10px] font-bold text-red-600">الترويج</span>
              <span className="text-[8px] text-red-400 block" dir="ltr">Promotion</span>
            </div>
            <div style={{ width: '56px' }} className="text-center border-l border-gray-400">
              <span className="text-[10px] font-bold text-green-600">العائدات</span>
              <span className="text-[8px] text-green-400 block" dir="ltr">Revenue</span>
            </div>
            <div style={{ width: '48px' }} className="text-center border-l border-gray-400">
              <span className="text-[9px] font-bold text-blue-400">الموقع</span>
              <span className="text-[7px] text-blue-300 block" dir="ltr">Website</span>
            </div>
            <div style={{ width: '48px' }} className="text-center border-l border-gray-400">
              <span className="text-[9px] font-bold text-blue-500">التواصل</span>
              <span className="text-[7px] text-blue-400 block" dir="ltr">Social</span>
            </div>
            <div style={{ width: '48px' }} className="text-center border-l border-gray-400">
              <span className="text-[9px] font-bold text-blue-700">مجموع</span>
              <span className="text-[7px] text-blue-500 block" dir="ltr">Total</span>
            </div>
            <div style={{ width: '60px' }} className="text-center">
              <span className="text-[10px] font-bold text-purple-600">بث حديث</span>
              <span className="text-[7px] text-purple-400 block" dir="ltr">Bath Hadeeth</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex-1">
          {/* Timeline Line */}
          <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300" />

          {/* Years */}
          <div className="space-y-2">
            {timelineData.map((yearData, yearIndex) => {
              const is2025 = yearData.year === '2025';
              const is2024 = yearData.year === '2024';

              return (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: yearIndex * 0.05 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    {/* Year Badge */}
                    <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                      is2025 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                      is2024 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      <span className="text-white font-bold text-sm">{yearData.year}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 rounded-xl p-3 border-2 ${
                      is2025 ? 'bg-orange-50 border-orange-200' :
                      is2024 ? 'bg-green-50 border-green-200' :
                      'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex items-center justify-between gap-4">
                        {/* Events */}
                        <div className="flex-1 min-w-0">
                          <div className="space-y-1">
                            {yearData.events.map((event, eventIndex) => (
                              <div key={eventIndex} className="flex items-start gap-2">
                                {event.month && (
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap">
                                      {event.month}
                                    </span>
                                    {event.monthEn && (
                                      <span className="text-[8px] text-orange-400 px-2" dir="ltr">
                                        {event.monthEn}
                                      </span>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-col">
                                  <span className="text-gray-700 text-xs leading-tight">{formatEventText(event.event)}</span>
                                  {event.eventEn && (
                                    <span className="text-gray-400 text-[10px] leading-tight" dir="ltr">
                                      {event.eventEn}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Financials */}
                        {yearData.financials && (
                          <div className="flex flex-shrink-0" style={{ gap: '8px' }}>
                            <div className="text-center border-l border-gray-400/70" style={{ width: '56px' }}>
                              <p className={`text-sm font-bold ${
                                yearData.financials.paidPromotion === '0' ? 'text-green-600' : 'text-red-500'
                              }`}>
                                {yearData.financials.paidPromotion}
                              </p>
                            </div>
                            <div className="text-center border-l border-gray-400/70" style={{ width: '56px' }}>
                              <p className="text-sm font-bold text-green-600">{yearData.financials.revenue}</p>
                            </div>
                            <div className="text-center border-l border-gray-400/70" style={{ width: '48px' }}>
                              <p className="text-xs font-bold text-blue-400">{yearData.financials.arabyPostWebsite}</p>
                            </div>
                            <div className="text-center border-l border-gray-400/70" style={{ width: '48px' }}>
                              <p className="text-xs font-bold text-blue-500">{yearData.financials.arabyPostSocial}</p>
                            </div>
                            <div className="text-center border-l border-gray-400/70" style={{ width: '48px' }}>
                              <p className="text-xs font-bold text-blue-700">{yearData.financials.arabyPostTotal}</p>
                            </div>
                            <div className="text-center" style={{ width: '60px' }}>
                              {yearData.financials.bathHadeeth ? (
                                <p className="text-sm font-bold text-purple-600">{yearData.financials.bathHadeeth}</p>
                              ) : (
                                <p className="text-sm text-gray-300">-</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
