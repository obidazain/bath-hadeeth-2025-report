import { motion } from 'framer-motion';

interface StatCard {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface StrategyPoint {
  icon: string;
  text: string;
  highlight: string;
}

interface StrategyCard {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  points: StrategyPoint[];
}

const stats: StatCard[] = [
  { value: '2,053', label: 'حساب متعاون', icon: '🤝', color: 'purple' },
  { value: '8,570', label: 'حساب تم التواصل معه', icon: '🔗', color: 'pink' },
  { value: '100%', label: 'رخصة المشاع الإبداعي', icon: '©️', color: 'blue' },
];

const strategies: StrategyCard[] = [
  {
    title: 'استراتيجية التوزيع',
    subtitle: 'التشاركية',
    icon: '🧠',
    color: 'purple',
    points: [
      { icon: '🔗', text: 'النموذج الشبكي:', highlight: 'الإنتاج المركزي والتوزيع الشبكي اللامركزي' },
      { icon: '👥', text: 'مخاطبة جمهورين:', highlight: 'السمعي والبصري التفاعلي' },
      { icon: '©️', text: 'اعتماد نموذج', highlight: 'رخصة المشاع الإبداعي' },
      { icon: '📡', text: 'التعاون مع', highlight: '854 منصة إعادة نشر كحسابات متعاونة' },
      { icon: '📻', text: 'شراكات مع', highlight: 'أكثر من 20 قناة وإذاعة' },
    ],
  },
  {
    title: 'استقطاب الضيوف',
    subtitle: 'المتميزين',
    icon: '⭐',
    color: 'pink',
    points: [
      { icon: '🌱', text: 'تصدير شخصيات رصينة ولكن مغمورة إعلامياً،', highlight: 'واستضافتها لأول مرة' },
      { icon: '👤', text: '', highlight: 'تقديم خبراء جدد للإعلام العربي' },
      { icon: '🤝', text: '', highlight: 'تبادل المنفعة: منصة مقابل خبرة بدون تكاليف مادية' },
    ],
  },
  {
    title: 'استراتيجية الانتشار',
    subtitle: 'الجغرافي',
    icon: '🌍',
    color: 'orange',
    points: [
      { icon: '📍', text: '', highlight: 'استهداف مناطق جغرافية مهمشة إعلامياً' },
      { icon: '🔗', text: '', highlight: 'تغطية معمّقة لقضايا محليّة مع ربطها بسياق الأمة الأوسع' },
      { icon: '⚖️', text: 'تحقيق', highlight: 'التوازن بين القيمة المحتوى والانتشار' },
      { icon: '✏️', text: 'التركيز على', highlight: 'سقف تحريري أعلى' },
    ],
  },
];

export function ContentStrategySlide() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', gradient: 'from-pink-500 to-pink-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-1">
            <span className="text-gradient">استراتيجية المحتوى والانتشار لبث حديث</span>
          </h2>
          <p className="text-notion-text-secondary text-sm">
            استراتيجية مبتكرة لتجاوز حصار الخوارزمية
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => {
            const colors = getColorClasses(stat.color);
            return (
              <div
                key={stat.label}
                className={`${colors.bg} border ${colors.border} rounded-xl p-3 text-center`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xl">{stat.icon}</span>
                  <p className={`text-2xl font-bold ${colors.text}`}>{stat.value}</p>
                </div>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((strategy, stratIndex) => {
            const colors = getColorClasses(strategy.color);
            return (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + stratIndex * 0.1 }}
                className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-4 relative overflow-hidden`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{strategy.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{strategy.title}</h3>
                    <p className={`text-sm font-semibold ${colors.text}`}>{strategy.subtitle}</p>
                  </div>
                </div>

                {/* Strategy Points */}
                <div className="space-y-2">
                  {strategy.points.map((point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className={`flex items-start gap-2 p-2 bg-white/70 rounded-lg border-r-4 ${colors.border}`}
                    >
                      <div className={`w-7 h-7 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-sm">{point.icon}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {point.text}{' '}
                        <span className={`font-bold ${colors.text}`}>{point.highlight}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
