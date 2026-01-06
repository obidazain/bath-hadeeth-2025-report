import { motion } from 'framer-motion';
import {
  Brain, Star, Globe2, Link, Users, Copyright,
  Radio, Antenna, Sprout, User, MapPin, Scale, Pencil, Handshake
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCard {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface StrategyPoint {
  icon: LucideIcon;
  text: string;
  highlight: string;
}

interface StrategyCard {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  points: StrategyPoint[];
}

const stats: StatCard[] = [
  { value: '2,053', label: 'حساب متعاون', icon: Handshake, color: 'purple' },
  { value: '8,570', label: 'حساب تم التواصل معه', icon: Link, color: 'purple' },
  { value: '100%', label: 'رخصة المشاع الإبداعي', icon: Copyright, color: 'purple' },
];

const strategies: StrategyCard[] = [
  {
    title: 'استراتيجية التوزيع',
    subtitle: 'التشاركية',
    icon: Brain,
    color: 'purple',
    points: [
      { icon: Link, text: 'النموذج الشبكي:', highlight: 'الإنتاج المركزي والتوزيع الشبكي اللامركزي' },
      { icon: Users, text: 'مخاطبة جمهورين:', highlight: 'السمعي والبصري التفاعلي' },
      { icon: Copyright, text: 'اعتماد نموذج', highlight: 'رخصة المشاع الإبداعي' },
      { icon: Antenna, text: 'التعاون مع', highlight: '854 منصة إعادة نشر كحسابات متعاونة' },
      { icon: Radio, text: 'شراكات مع', highlight: 'أكثر من 20 قناة وإذاعة' },
    ],
  },
  {
    title: 'استقطاب الضيوف',
    subtitle: 'المتميزين',
    icon: Star,
    color: 'purple',
    points: [
      { icon: Sprout, text: 'تصدير شخصيات رصينة ولكن مغمورة إعلامياً،', highlight: 'واستضافتها لأول مرة' },
      { icon: User, text: '', highlight: 'تقديم خبراء جدد للإعلام العربي' },
      { icon: Handshake, text: '', highlight: 'تبادل المنفعة: منصة مقابل خبرة بدون تكاليف مادية' },
    ],
  },
  {
    title: 'استراتيجية الانتشار',
    subtitle: 'الجغرافي',
    icon: Globe2,
    color: 'purple',
    points: [
      { icon: MapPin, text: '', highlight: 'استهداف مناطق جغرافية مهمشة إعلامياً' },
      { icon: Link, text: '', highlight: 'تغطية معمّقة لقضايا محليّة مع ربطها بسياق الأمة الأوسع' },
      { icon: Scale, text: 'تحقيق', highlight: 'التوازن بين القيمة المحتوى والانتشار' },
      { icon: Pencil, text: 'التركيز على', highlight: 'سقف تحريري أعلى' },
    ],
  },
];

export function ContentStrategySlide() {
  // توحيد الألوان - بنفسجي صلب بدون تدرجات
  const getColorClasses = () => {
    return {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-[#9a6dd7]',
      iconBg: 'bg-[#9a6dd7]'
    };
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
            const colors = getColorClasses();
            return (
              <div
                key={stat.label}
                className={`${colors.bg} border ${colors.border} rounded-xl p-3 text-center`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className={`w-5 h-5 ${colors.text}`} />
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
            const colors = getColorClasses();
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
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center shadow-lg`}>
                    <strategy.icon className="w-6 h-6 text-white" />
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
                      <div className={`w-7 h-7 ${colors.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <point.icon className="w-4 h-4 text-white" />
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
