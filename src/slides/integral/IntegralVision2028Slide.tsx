import { motion } from 'framer-motion';

interface VisionGoal {
  id: number;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// SVG Icons
const MicrophoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const CpuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const VideoCameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const visionGoals: VisionGoal[] = [
  {
    id: 1,
    icon: MicrophoneIcon,
    title: 'برامج جديدة في البودكاست',
    description: 'إطلاق برامج جديدة وإعادة إطلاق برامج متوقفة لتوسيع المحتوى',
    color: 'purple',
  },
  {
    id: 2,
    icon: CpuIcon,
    title: 'تجارب إنتاجية بالذكاء الاصطناعي',
    description: 'تطوير محتوى عربي بوست باستخدام تقنيات الذكاء الاصطناعي',
    color: 'blue',
  },
  {
    id: 3,
    icon: VideoCameraIcon,
    title: 'برنامج حواري بالإنجليزية',
    description: 'إطلاق برنامج حواري باللغة الإنجليزية للوصول لجمهور عالمي',
    color: 'green',
  },
  {
    id: 4,
    icon: GlobeIcon,
    title: 'ترجمة ودبلجة متعددة اللغات',
    description: 'ترجمة ودبلجة بلغات العالم الإسلامي الحية ولغات رئيسية أخرى',
    color: 'orange',
  },
  {
    id: 5,
    icon: SparklesIcon,
    title: 'إنتاج فني بالذكاء الاصطناعي',
    description: 'استخدام الذكاء الاصطناعي لإنتاج محتوى فني ومرئي مبتكر',
    color: 'pink',
  },
];

export function IntegralVision2028Slide() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-500', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-500', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-500', text: 'text-green-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-500', text: 'text-orange-600' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'bg-pink-500', text: 'text-pink-600' },
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="slide bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-4 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
            <span className="text-orange-400 text-sm font-medium">المرافئ الجديدة</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-2">
            رؤية 2026-2028
          </h2>
          <p className="text-gray-400 text-lg">
            خارطة الطريق للمرحلة القادمة
          </p>
        </motion.div>

        {/* Vision Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* First Row - 3 cards */}
          {visionGoals.slice(0, 3).map((goal, index) => {
            const colors = getColorClasses(goal.color);
            const IconComponent = goal.icon;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-5 relative overflow-hidden group hover:shadow-xl transition-shadow`}
              >
                {/* Number Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <span className={`text-sm font-bold ${colors.text}`}>{goal.id}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{goal.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Second Row - 2 cards centered */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {visionGoals.slice(3).map((goal, index) => {
            const colors = getColorClasses(goal.color);
            const IconComponent = goal.icon;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-5 relative overflow-hidden group hover:shadow-xl transition-shadow`}
              >
                {/* Number Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <span className={`text-sm font-bold ${colors.text}`}>{goal.id}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{goal.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
            <RocketIcon className="w-6 h-6" />
            <span className="font-bold text-lg">نحو مستقبل إعلامي عربي مبتكر</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
