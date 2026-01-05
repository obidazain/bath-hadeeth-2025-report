import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const departments = [
  {
    title: 'مواقع إعلامية متخصصة',
    subtitle: '( عربي بوست وأسباب )',
    icon: 'globe', // Globe/world icon for media websites
  },
  {
    title: 'شبكة دعم وشراكة مع مواقع صديقة',
    subtitle: '',
    icon: 'network', // Connected nodes for partnerships
  },
  {
    title: 'حاضنة البودكاست',
    subtitle: '( بث حديث )',
    icon: 'mic', // Microphone for podcasts
  },
  {
    title: 'الإنتاج للمشاريع الشقيقة',
    subtitle: '',
    icon: 'film', // Film/video for production
  },
  {
    title: 'تشغيل وعمليات الطابق السادس',
    subtitle: '',
    icon: 'building', // Building for operations
  },
  {
    title: 'مكتب الأستاذ وضاح خنفر',
    subtitle: '',
    icon: 'briefcase', // Briefcase for executive office
  },
];

// SVG Icons as components
const icons: Record<string, ReactNode> = {
  globe: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="3" strokeWidth="2" />
      <circle cx="5" cy="19" r="3" strokeWidth="2" />
      <circle cx="19" cy="19" r="3" strokeWidth="2" />
      <path strokeWidth="2" d="M12 8v4m-5.5 3.5L10 14m4 0l3.5 1.5" />
    </svg>
  ),
  mic: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="9" y="2" width="6" height="11" rx="3" strokeWidth="2" />
      <path strokeWidth="2" d="M5 10a7 7 0 0 0 14 0M12 17v4m-4 0h8" />
    </svg>
  ),
  film: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M2 8h20M2 16h20M6 4v16M18 4v16" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="2" width="16" height="20" rx="1" strokeWidth="2" />
      <path strokeWidth="2" d="M9 22V12h6v10M8 6h2m4 0h2M8 10h2m4 0h2" />
    </svg>
  ),
  briefcase: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v2" />
    </svg>
  ),
};

export function IntegralAboutSlide() {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center z-10 max-w-5xl mx-auto w-full px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            ماهي شركة{' '}
            <span className="text-orange-500">انتجرال ميديا</span>
            {' '}اليوم؟
          </h2>
        </motion.div>

        {/* Team Count */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-2xl shadow-xl">
            <span className="text-6xl font-bold">80</span>
            <span className="text-3xl font-medium">مبدعاً</span>
          </div>
        </motion.div>

        {/* Departments Grid - 2 rows x 3 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-5"
        >
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-orange-300 hover:shadow-xl transition-all flex items-center gap-5"
            >
              {/* Icon */}
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                {icons[dept.icon]}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {dept.title}
                </h3>
                {dept.subtitle && (
                  <p className="text-base text-orange-500 font-medium mt-1">{dept.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
