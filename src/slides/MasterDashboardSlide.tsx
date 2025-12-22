import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos, programMonthlyData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon } from '../config/platforms';

type SortOption = 'views' | 'followers' | 'growth' | 'watchTime' | 'engagement' | 'name';
type ViewMode = 'grid' | 'chart' | 'compare';
type MetricType = 'views' | 'watchTime' | 'engagement' | 'followers';

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
    let programs = reportData.programs.map(p => {
      let views = 0;
      let followers = 0;
      let watchTime = 0;
      let engagement = 0;
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
          engagement += monthlyData.reduce((sum, m) => sum + m.tiktokEngagement, 0);
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
            engagement += monthData.tiktokEngagement;
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
        filteredEngagement: engagement,
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
      case 'engagement':
        programs.sort((a, b) => b.filteredEngagement - a.filteredEngagement);
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
        engagement: acc.engagement + p.filteredEngagement,
        shorts: acc.shorts + p.filteredShorts,
        videos: acc.videos + p.filteredVideos,
      }),
      { views: 0, followers: 0, watchTime: 0, engagement: 0, shorts: 0, videos: 0 }
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
        className="text-center mb-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          <span className="text-gradient">منظومة بث حديث 2025</span>
        </h2>
        <p className="text-notion-text-secondary text-xs sm:text-sm">
          لوحة التحكم الرئيسية
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
          className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3"
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
            <p className="text-xs sm:text-sm font-bold text-accent-purple">{filteredPrograms.length}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">برنامج</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-blue-500">{formatNumber(totals.watchTime)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">ساعة مشاهدة</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-green-500">{formatNumber(totals.engagement)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">تفاعل TikTok</p>
          </div>
          <div className="card-compact px-2 py-2 text-center">
            <p className="text-xs sm:text-sm font-bold text-orange-500">{formatNumber(totals.shorts)}</p>
            <p className="text-[9px] sm:text-[10px] text-notion-text-secondary">Shorts</p>
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
              <option value="engagement">التفاعل</option>
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-1 content-start overflow-auto"
            >
              {filteredPrograms.map((program, index) => {
                const logoPath = programLogos[program.id];
                const maxViews = filteredPrograms[0]?.filteredViews || 1;
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="card-compact cursor-pointer hover:shadow-md transition-all"
                  >
                    {/* Header with logo and name */}
                    <div className="flex items-center gap-2 mb-2">
                      {logoPath ? (
                        <img src={logoPath} alt="" className="w-8 h-8 rounded-lg object-contain shadow-sm" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-notion-secondary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-xs sm:text-sm text-notion-text block truncate">
                          {program.name}
                        </span>
                        <span className="text-[10px] text-notion-text-secondary">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Main metric */}
                    <div className="mb-2">
                      <p className="text-lg font-bold text-primary">
                        {formatNumber(program.filteredViews)}
                      </p>
                      <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-notion-secondary rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (program.filteredViews / maxViews) * 100)}%` }}
                        transition={{ duration: 0.8, delay: index * 0.03 }}
                        className="h-full bg-gradient-to-r from-primary to-accent-pink rounded-full"
                      />
                    </div>

                    {/* Secondary metrics */}
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <span className="text-notion-text-secondary">متابعين: </span>
                        <span className="font-medium text-accent-pink">{formatNumber(program.filteredFollowers)}</span>
                      </div>
                      {program.filteredWatchTime > 0 && (
                        <div>
                          <span className="text-notion-text-secondary">ساعات: </span>
                          <span className="font-medium text-blue-500">{formatNumber(program.filteredWatchTime)}</span>
                        </div>
                      )}
                      {program.filteredEngagement > 0 && (
                        <div>
                          <span className="text-notion-text-secondary">تفاعل: </span>
                          <span className="font-medium text-green-500">{formatNumber(program.filteredEngagement)}</span>
                        </div>
                      )}
                      {program.filteredShorts > 0 && (
                        <div>
                          <span className="text-notion-text-secondary">Shorts: </span>
                          <span className="font-medium text-orange-500">{formatNumber(program.filteredShorts)}</span>
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
                  <option value="engagement">التفاعل</option>
                  <option value="followers">المتابعين</option>
                </select>
              </div>
              <div className="chart-container flex-1">
                <BarChart
                  labels={filteredPrograms.slice(0, 10).map(p => p.name)}
                  datasets={[
                    {
                      label: filters.metric === 'views' ? 'المشاهدات' :
                             filters.metric === 'watchTime' ? 'ساعات المشاهدة' :
                             filters.metric === 'engagement' ? 'التفاعل' : 'المتابعين',
                      data: filteredPrograms.slice(0, 10).map(p =>
                        filters.metric === 'views' ? p.filteredViews :
                        filters.metric === 'watchTime' ? p.filteredWatchTime :
                        filters.metric === 'engagement' ? p.filteredEngagement :
                        p.filteredFollowers
                      ),
                      backgroundColor: filters.metric === 'views' ? 'rgba(124, 58, 237, 0.7)' :
                                       filters.metric === 'watchTime' ? 'rgba(59, 130, 246, 0.7)' :
                                       filters.metric === 'engagement' ? 'rgba(16, 185, 129, 0.7)' :
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
              className="card-compact flex-1 flex flex-col"
            >
              <h3 className="font-semibold text-notion-text text-sm mb-3">مقارنة شاملة - أعلى 8 برامج</h3>
              <div className="chart-container flex-1">
                <BarChart
                  labels={filteredPrograms.slice(0, 8).map(p => p.name)}
                  datasets={[
                    {
                      label: 'المشاهدات (M)',
                      data: filteredPrograms.slice(0, 8).map(p => Math.round(p.filteredViews / 1000000)),
                      backgroundColor: 'rgba(124, 58, 237, 0.8)',
                    },
                    {
                      label: 'المتابعين (K)',
                      data: filteredPrograms.slice(0, 8).map(p => Math.round(p.filteredFollowers / 1000)),
                      backgroundColor: 'rgba(236, 72, 153, 0.8)',
                    },
                    {
                      label: 'ساعات المشاهدة (K)',
                      data: filteredPrograms.slice(0, 8).map(p => Math.round(p.filteredWatchTime / 1000)),
                      backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    },
                  ]}
                  horizontal={false}
                  stacked={false}
                />
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[rgba(124,58,237,0.8)]"></div>
                  <span className="text-notion-text-secondary">المشاهدات (مليون)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[rgba(236,72,153,0.8)]"></div>
                  <span className="text-notion-text-secondary">المتابعين (ألف)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[rgba(59,130,246,0.8)]"></div>
                  <span className="text-notion-text-secondary">ساعات المشاهدة (ألف)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
