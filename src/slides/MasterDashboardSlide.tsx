import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos, programMonthlyData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon } from '../config/platforms';

type SortOption = 'views' | 'followers' | 'growth' | 'watchTime' | 'name';
type ViewMode = 'grid' | 'chart' | 'compare';
type MetricType = 'views' | 'watchTime' | 'followers';

interface Filters {
  platforms: {
    youtube: boolean;
    tiktok: boolean;
    instagram: boolean;
    facebook: boolean;
  };
  sortBy: SortOption;
  viewMode: ViewMode;
  selectedMonth: number; // 0 = all months, 1-11 = specific month
  metric: MetricType;
}

// Stopped programs that should appear dimmed
const stoppedPrograms = ['malaz', 'ghada'];

const months = [
  { value: 0, label: 'كل الأشهر' },
  { value: 1, label: 'يناير' },
  { value: 2, label: 'فبراير' },
  { value: 3, label: 'مارس' },
  { value: 4, label: 'أبريل' },
  { value: 5, label: 'مايو' },
  { value: 6, label: 'يونيو' },
  { value: 7, label: 'يوليو' },
  { value: 8, label: 'أغسطس' },
  { value: 9, label: 'سبتمبر' },
  { value: 10, label: 'أكتوبر' },
  { value: 11, label: 'نوفمبر' },
  { value: 12, label: 'ديسمبر' },
];

export function MasterDashboardSlide() {
  const [filters, setFilters] = useState<Filters>({
    platforms: {
      youtube: true,
      tiktok: true,
      instagram: true,
      facebook: true,
    },
    sortBy: 'views',
    viewMode: 'grid',
    selectedMonth: 0,
    metric: 'views',
  });

  // Calculate data based on filters
  const filteredPrograms = useMemo(() => {
    // Filter out falak and mawazen
    let programs = reportData.programs
      .filter(p => p.id !== 'falak' && p.id !== 'mawazen')
      .map(p => {
      let views = 0;
      let followers = 0;
      let watchTime = 0;
      let shorts = 0;
      let videos = 0;

      // Get monthly data for this program
      const monthlyData = programMonthlyData[p.id] || [];

      if (filters.selectedMonth === 0) {
        // All months - use total data
        if (filters.platforms.youtube) {
          views += p.youtube.views;
          followers += p.youtube.subscribers;
          // Sum watch time from monthly data
          watchTime += monthlyData.reduce((sum, m) => sum + m.youtubeWatchTime, 0);
          shorts += monthlyData.reduce((sum, m) => sum + m.youtubeShorts, 0);
          videos += monthlyData.reduce((sum, m) => sum + m.youtubeVideos, 0);
        }
        if (filters.platforms.tiktok) {
          views += p.tiktok.views;
          followers += p.tiktok.followers;
        }
        if (filters.platforms.instagram) {
          views += p.instagram.views;
          followers += p.instagram.followers;
        }
        if (filters.platforms.facebook) {
          views += p.facebook.views;
          followers += p.facebook.followers;
        }
      } else {
        // Specific month
        const monthData = monthlyData.find(m => m.month === filters.selectedMonth);
        if (monthData) {
          if (filters.platforms.youtube) {
            views += monthData.youtubeViews;
            followers += monthData.newYoutubeSubscribers;
            watchTime += monthData.youtubeWatchTime;
            shorts += monthData.youtubeShorts;
            videos += monthData.youtubeVideos;
          }
          if (filters.platforms.tiktok) {
            views += monthData.tiktokViews;
            followers += monthData.newTiktokFollowers;
          }
          if (filters.platforms.instagram) {
            views += monthData.instagramViews;
            followers += monthData.newInstagramFollowers;
          }
        }
      }

      return {
        ...p,
        filteredViews: views,
        filteredFollowers: followers,
        filteredWatchTime: watchTime,
        filteredShorts: shorts,
        filteredVideos: videos,
      };
    });

    // Sort programs
    switch (filters.sortBy) {
      case 'views':
        programs.sort((a, b) => b.filteredViews - a.filteredViews);
        break;
      case 'followers':
        programs.sort((a, b) => b.filteredFollowers - a.filteredFollowers);
        break;
      case 'growth':
        programs.sort((a, b) => b.newFollowers2025 - a.newFollowers2025);
        break;
      case 'watchTime':
        programs.sort((a, b) => b.filteredWatchTime - a.filteredWatchTime);
        break;
      case 'name':
        programs.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        break;
    }

    return programs;
  }, [filters]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredPrograms.reduce(
      (acc, p) => ({
        views: acc.views + p.filteredViews,
        followers: acc.followers + p.filteredFollowers,
        watchTime: acc.watchTime + p.filteredWatchTime,
        shorts: acc.shorts + p.filteredShorts,
        videos: acc.videos + p.filteredVideos,
      }),
      { views: 0, followers: 0, watchTime: 0, shorts: 0, videos: 0 }
    );
  }, [filteredPrograms]);

  const togglePlatform = (platform: keyof typeof filters.platforms) => {
    setFilters(prev => ({
      ...prev,
      platforms: { ...prev.platforms, [platform]: !prev.platforms[platform] },
    }));
  };

  return (
    <div className="slide">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="text-gradient">بث حديث</span>
        </h2>
        <p className="text-notion-text-secondary text-sm sm:text-base mb-1">
          حاضنة البودكاست العربي
        </p>
        <p className="text-notion-text-secondary text-sm sm:text-base">
          لوحة البيانات التفاعلية
          {filters.selectedMonth > 0 && (
            <span className="text-primary font-medium mr-2">
              - {months[filters.selectedMonth].label}
            </span>
          )}
        </p>
      </motion.div>

      <div className="slide-content max-w-7xl mx-auto w-full">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3"
        >
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-primary">{formatNumber(totals.views)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">مشاهدة</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-accent-pink">{formatNumber(totals.followers)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">متابع</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-primary">{filteredPrograms.length}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">برنامج</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-accent-pink">{formatNumber(totals.watchTime)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">ساعة مشاهدة</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-primary">{formatNumber(totals.shorts)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">Shorts</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-accent-pink">{formatNumber(51000)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">منشور فيديو</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-primary">60</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">حساب تواصل</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-accent-pink">50</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">منصة بودكاست</p>
          </div>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-2 mb-3"
        >
          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <select
              value={filters.selectedMonth}
              onChange={(e) => setFilters(prev => ({ ...prev, selectedMonth: parseInt(e.target.value) }))}
              className="px-2 py-1.5 rounded-lg border border-notion-border text-xs bg-white font-medium"
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            {/* Platform Toggles */}
            <div className="flex gap-1 bg-notion-secondary rounded-lg p-1">
              {(['youtube', 'tiktok', 'instagram', 'facebook'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`p-1.5 rounded-md transition-all ${
                    filters.platforms[platform]
                      ? 'bg-white shadow-sm'
                      : 'opacity-30 hover:opacity-60'
                  }`}
                  title={platform}
                >
                  <PlatformIcon platform={platform} size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
              className="px-2 py-1.5 rounded-lg border border-notion-border text-xs bg-white"
            >
              <option value="views">المشاهدات</option>
              <option value="followers">المتابعين</option>
              <option value="growth">النمو 2025</option>
              <option value="watchTime">وقت المشاهدة</option>
              <option value="name">الاسم</option>
            </select>

            <div className="flex gap-0.5 bg-notion-secondary rounded-lg p-0.5">
              <button
                onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  filters.viewMode === 'grid' ? 'bg-white shadow-sm font-medium' : ''
                }`}
              >
                شبكة
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, viewMode: 'chart' }))}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  filters.viewMode === 'chart' ? 'bg-white shadow-sm font-medium' : ''
                }`}
              >
                رسم
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, viewMode: 'compare' }))}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  filters.viewMode === 'compare' ? 'bg-white shadow-sm font-medium' : ''
                }`}
              >
                مقارنة
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {filters.viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 content-start overflow-auto"
            >
              {filteredPrograms.map((program, index) => {
                const logoPath = programLogos[program.id];
                const maxViews = filteredPrograms[0]?.filteredViews || 1;
                const isStopped = stoppedPrograms.includes(program.id);
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`card-compact p-3 cursor-pointer hover:shadow-md transition-all ${isStopped ? 'opacity-50 grayscale' : ''}`}
                  >
                    {/* Header with rank, logo and name */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Rank Badge */}
                      <span className={`w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-sm flex-shrink-0 ${
                        isStopped ? 'bg-gray-400' : 'bg-[#9a6dd7]'
                      }`}>
                        {index + 1}
                      </span>
                      {logoPath ? (
                        <img src={logoPath} alt="" className="w-10 h-10 rounded-lg object-contain shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-notion-secondary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm text-notion-text block truncate">
                          {program.name}
                        </span>
                        {isStopped && (
                          <span className="text-[10px] text-red-500 font-medium">برنامج متوقف</span>
                        )}
                      </div>
                    </div>

                    {/* Main metric */}
                    <div className="mb-2">
                      <p className="text-2xl font-bold text-primary">
                        {formatNumber(program.filteredViews)}
                      </p>
                      <p className="text-xs text-notion-text-secondary">مشاهدة</p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-notion-secondary rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (program.filteredViews / maxViews) * 100)}%` }}
                        transition={{ duration: 0.8, delay: index * 0.03 }}
                        className="h-full bg-[#9a6dd7] rounded-full"
                      />
                    </div>

                    {/* Secondary metrics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-notion-text-secondary text-[10px]">متابعين</p>
                        <p className="font-bold text-accent-pink text-base">{formatNumber(program.filteredFollowers)}</p>
                      </div>
                      {program.filteredWatchTime > 0 && (
                        <div>
                          <p className="text-notion-text-secondary text-[10px]">ساعات</p>
                          <p className="font-bold text-primary text-base">{formatNumber(program.filteredWatchTime)}</p>
                        </div>
                      )}
                      {program.filteredShorts > 0 && (
                        <div>
                          <p className="text-notion-text-secondary text-[10px]">مشاهدات Shorts</p>
                          <p className="font-bold text-accent-pink text-base">{formatNumber(program.filteredShorts)}</p>
                        </div>
                      )}
                      {program.filteredVideos > 0 && (
                        <div>
                          <p className="text-notion-text-secondary text-[10px]">حلقات طويلة</p>
                          <p className="font-bold text-primary text-base">{formatNumber(program.filteredVideos)}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : filters.viewMode === 'chart' ? (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-compact flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-notion-text text-sm">ترتيب البرامج</h3>
                <select
                  value={filters.metric}
                  onChange={(e) => setFilters(prev => ({ ...prev, metric: e.target.value as MetricType }))}
                  className="px-2 py-1 rounded border border-notion-border text-xs bg-white"
                >
                  <option value="views">المشاهدات</option>
                  <option value="watchTime">وقت المشاهدة</option>
                  <option value="followers">المتابعين</option>
                </select>
              </div>
              <div className="chart-container flex-1">
                <BarChart
                  labels={filteredPrograms.slice(0, 10).map(p => p.name)}
                  datasets={[
                    {
                      label: filters.metric === 'views' ? 'المشاهدات' :
                             filters.metric === 'watchTime' ? 'ساعات المشاهدة' : 'المتابعين',
                      data: filteredPrograms.slice(0, 10).map(p =>
                        filters.metric === 'views' ? p.filteredViews :
                        filters.metric === 'watchTime' ? p.filteredWatchTime :
                        p.filteredFollowers
                      ),
                      backgroundColor: filters.metric === 'views' ? 'rgba(124, 58, 237, 0.7)' :
                                       filters.metric === 'watchTime' ? 'rgba(59, 130, 246, 0.7)' :
                                       'rgba(236, 72, 153, 0.7)',
                    },
                  ]}
                  horizontal={true}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compare"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-compact flex-1 flex flex-col overflow-auto"
            >
              <h3 className="font-semibold text-notion-text text-base mb-4">مقارنة شاملة - أعلى 10 برامج</h3>

              {/* Comparison Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="border-b-2 border-notion-border bg-notion-secondary/30">
                      <th className="text-center py-3 px-3 font-bold text-notion-text w-16">#</th>
                      <th className="text-right py-3 px-3 font-bold text-notion-text w-40">البرنامج</th>
                      <th className="text-center py-3 px-3 font-bold text-primary w-32">المشاهدات</th>
                      <th className="text-center py-3 px-3 font-bold text-accent-pink w-24">المتابعين</th>
                      <th className="text-center py-3 px-3 font-bold text-primary w-24">الساعات</th>
                      <th className="text-center py-3 px-3 font-bold text-accent-pink w-24">Shorts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.slice(0, 10).map((program, index) => {
                      const logoPath = programLogos[program.id];
                      return (
                        <tr key={program.id} className="border-b border-notion-border/30 hover:bg-notion-secondary/20 transition-colors">
                          <td className="py-3 px-3 text-center">
                            <span className="w-8 h-8 rounded-full text-white text-sm font-bold inline-flex items-center justify-center bg-[#9a6dd7]">
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              {logoPath && (
                                <img src={logoPath} alt="" className="w-10 h-10 rounded-lg object-contain flex-shrink-0" />
                              )}
                              <span className="font-bold text-notion-text text-base">{program.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="font-bold text-primary text-base">{formatNumber(program.filteredViews)}</span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-accent-pink text-base">{formatNumber(program.filteredFollowers)}</td>
                          <td className="py-3 px-3 text-center font-bold text-primary text-base">{formatNumber(program.filteredWatchTime)}</td>
                          <td className="py-3 px-3 text-center font-bold text-accent-pink text-base">{formatNumber(program.filteredShorts)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
