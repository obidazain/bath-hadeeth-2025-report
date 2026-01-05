import { motion } from 'framer-motion';
import { StatCard } from '../components/common/StatCard';
import { useTotals } from '../store/dataStore';
import { reportData2024, calculateGrowth } from '../data/report-data-2024';

export function KeyNumbersSlide() {
  const totals = useTotals();

  // Calculate growth percentages
  const viewsGrowth = calculateGrowth(reportData2024.totals.totalViews, totals.viewsWithFacebook);
  const followersGrowth = calculateGrowth(reportData2024.totals.totalFollowers, totals.totalFollowers);

  const stats = [
    {
      title: 'إجمالي المشاهدات',
      value: totals.viewsWithFacebook,
      color: '#a855f7',
      value2024: reportData2024.totals.totalViews,
      growth: viewsGrowth,
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'إجمالي المتابعين',
      value: totals.totalFollowers,
      color: '#ec4899',
      value2024: reportData2024.totals.totalFollowers,
      growth: followersGrowth,
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'عدد المنشورات 2025',
      value: totals.postsCount2025,
      color: '#f97316',
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      title: 'عدد الحلقات',
      value: totals.totalEpisodes,
      color: '#10b981',
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'ساعات التصوير',
      value: totals.totalFilmingHours,
      color: '#3b82f6',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'الدول الوصول إليها',
      value: totals.countriesReached,
      color: '#8b5cf6',
      icon: (
        <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="slide">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4"
      >
        <span className="text-gradient">الأرقام الرئيسية</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-notion-text-secondary text-center text-sm mb-6"
      >
        إنجازات بث حديث خلال عام 2025
      </motion.p>

      <div className="slide-content max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 flex-1 content-center">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
              delay={index * 0.1}
              value2024={'value2024' in stat ? stat.value2024 : undefined}
              growth={'growth' in stat ? stat.growth : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
