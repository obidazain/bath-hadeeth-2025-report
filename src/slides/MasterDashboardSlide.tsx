import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon } from '../config/platforms';

type SortOption = 'views' | 'followers' | 'growth' | 'name';
type ViewMode = 'grid' | 'chart';

interface Filters {
  platforms: {
    youtube: boolean;
    tiktok: boolean;
    instagram: boolean;
    facebook: boolean;
  };
  sortBy: SortOption;
  viewMode: ViewMode;
}

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
  });

  const filteredPrograms = useMemo(() => {
    let programs = reportData.programs.map(p => {
      let views = 0;
      let followers = 0;

      if (filters.platforms.youtube) {
        views += p.youtube.views;
        followers += p.youtube.subscribers;
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

      return { ...p, filteredViews: views, filteredFollowers: followers };
    });

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
      case 'name':
        programs.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        break;
    }

    return programs;
  }, [filters]);

  const totals = useMemo(() => {
    return filteredPrograms.reduce(
      (acc, p) => ({
        views: acc.views + p.filteredViews,
        followers: acc.followers + p.filteredFollowers,
      }),
      { views: 0, followers: 0 }
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
        <p className="text-notion-text-secondary text-xs sm:text-sm">لوحة التحكم الرئيسية</p>
      </motion.div>

      <div className="slide-content max-w-7xl mx-auto w-full">
        {/* Top Stats & Filters Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-2 mb-3"
        >
          {/* Stats */}
          <div className="flex gap-2">
            <div className="card-compact px-3 py-1.5 text-center">
              <p className="text-sm font-bold text-primary">{formatNumber(totals.views)}</p>
              <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
            </div>
            <div className="card-compact px-3 py-1.5 text-center">
              <p className="text-sm font-bold text-accent-pink">{formatNumber(totals.followers)}</p>
              <p className="text-[10px] text-notion-text-secondary">متابع</p>
            </div>
            <div className="card-compact px-3 py-1.5 text-center">
              <p className="text-sm font-bold text-accent-purple">{filteredPrograms.length}</p>
              <p className="text-[10px] text-notion-text-secondary">برنامج</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform Toggles */}
            <div className="flex gap-1">
              {(['youtube', 'tiktok', 'instagram', 'facebook'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`p-1.5 rounded-lg transition-all ${
                    filters.platforms[platform]
                      ? 'bg-notion-secondary'
                      : 'opacity-30 hover:opacity-60'
                  }`}
                >
                  <PlatformIcon platform={platform} size="sm" />
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
              className="px-2 py-1 rounded-lg border border-notion-border text-xs bg-white"
            >
              <option value="views">المشاهدات</option>
              <option value="followers">المتابعين</option>
              <option value="growth">النمو</option>
              <option value="name">الاسم</option>
            </select>

            <div className="flex gap-0.5 bg-notion-secondary rounded-lg p-0.5">
              <button
                onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  filters.viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                }`}
              >
                شبكة
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, viewMode: 'chart' }))}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  filters.viewMode === 'chart' ? 'bg-white shadow-sm' : ''
                }`}
              >
                رسم
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
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 flex-1 content-start overflow-auto"
            >
              {filteredPrograms.map((program, index) => {
                const logoPath = programLogos[program.id];
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    className="card-compact cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {logoPath ? (
                        <img src={logoPath} alt="" className="w-6 h-6 rounded object-contain" />
                      ) : (
                        <div className="w-6 h-6 rounded bg-notion-secondary" />
                      )}
                      <span className="font-medium text-[10px] sm:text-xs text-notion-text truncate flex-1">
                        {program.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-notion-text-secondary">
                      <span className="text-primary font-semibold">{formatNumber(program.filteredViews)}</span>
                    </div>
                    <div className="h-1 bg-notion-secondary rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent-pink rounded-full"
                        style={{
                          width: `${Math.min(100, (program.filteredViews / (filteredPrograms[0]?.filteredViews || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-compact flex-1 flex flex-col"
            >
              <h3 className="font-semibold text-notion-text text-sm mb-2">مقارنة البرامج</h3>
              <div className="chart-container flex-1">
                <BarChart
                  labels={filteredPrograms.slice(0, 10).map(p => p.name)}
                  datasets={[
                    {
                      label: 'المشاهدات',
                      data: filteredPrograms.slice(0, 10).map(p => p.filteredViews),
                      backgroundColor: 'rgba(124, 58, 237, 0.7)',
                    },
                  ]}
                  horizontal={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
