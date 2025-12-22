import { motion } from 'framer-motion';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos, programMonthlyData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';
import { PlatformIcon, platformColors } from '../config/platforms';

interface ProgramDetailSlideProps {
  programId: string;
}

export function ProgramDetailSlide({ programId }: ProgramDetailSlideProps) {
  const program = reportData.programs.find(p => p.id === programId);

  if (!program) {
    return <div className="slide flex items-center justify-center text-notion-text">برنامج غير موجود</div>;
  }

  const watchTimeEntry = reportData.watchTime.byProgram.find(w => w.name === program.name);
  const watchTime = watchTimeEntry?.hours || 0;

  const monthlyData = programMonthlyData[programId] || [];
  const totalYoutubeVideos = monthlyData.reduce((sum, m) => sum + m.youtubeVideos, 0);
  const totalYoutubeShorts = monthlyData.reduce((sum, m) => sum + m.youtubeShorts, 0);
  const totalYoutubeViews = totalYoutubeVideos + totalYoutubeShorts;

  const platformData = [
    { key: 'youtube' as const, name: 'يوتيوب', views: program.youtube.views, followers: program.youtube.subscribers },
    { key: 'tiktok' as const, name: 'تيك توك', views: program.tiktok.views, followers: program.tiktok.followers },
    { key: 'instagram' as const, name: 'إنستغرام', views: program.instagram.views, followers: program.instagram.followers },
    { key: 'facebook' as const, name: 'فيسبوك', views: program.facebook.views, followers: program.facebook.followers },
  ].filter(p => p.views > 0);

  const programRank = reportData.programs
    .sort((a, b) => b.totalViews - a.totalViews)
    .findIndex(p => p.id === programId) + 1;

  const logoPath = programLogos[programId];

  const monthLabels = monthlyData.filter(m => m.totalViews > 0).map(m => m.monthName.slice(0, 3));
  const monthlyViewsData = monthlyData.filter(m => m.totalViews > 0).map(m => m.totalViews);

  return (
    <div className="slide">
      {/* Header with Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 mb-2"
      >
        {logoPath && (
          <img src={logoPath} alt={program.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg shadow" />
        )}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <span className="tag tag-purple text-xs">#{programRank}</span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-notion-text">{program.name}</h2>
          </div>
          <p className="text-notion-text-secondary text-xs">{program.nameEn}</p>
        </div>
      </motion.div>

      <div className="slide-content max-w-6xl mx-auto w-full">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-3"
        >
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-primary">{formatNumber(program.totalViews)}</p>
            <p className="text-[10px] text-notion-text-secondary">مشاهدة</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-pink">{formatNumber(program.totalFollowers)}</p>
            <p className="text-[10px] text-notion-text-secondary">متابع</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-green">{formatNumber(program.newFollowers2025)}</p>
            <p className="text-[10px] text-notion-text-secondary">متابع جديد</p>
          </div>
          <div className="card-compact text-center">
            <p className="text-lg sm:text-xl font-bold text-accent-red">{formatNumber(watchTime)}</p>
            <p className="text-[10px] text-notion-text-secondary">ساعة مشاهدة</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
          {/* Platform Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-notion-text mb-2">توزيع المنصات</h3>
            <div className="chart-container flex-1">
              <DoughnutChart
                labels={platformData.map(p => p.name)}
                data={platformData.map(p => p.views)}
                colors={platformData.map(p => platformColors[p.key])}
              />
            </div>
          </motion.div>

          {/* Platform Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-notion-text mb-2">تفاصيل المنصات</h3>
            <div className="flex-1 flex flex-col justify-between gap-1 overflow-auto">
              {platformData.map((platform, index) => (
                <motion.div
                  key={platform.key}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-2 p-1.5 bg-notion-secondary/50 rounded"
                >
                  <PlatformIcon platform={platform.key} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-notion-text">{platform.name}</span>
                      <span className="text-primary font-bold">{formatNumber(platform.views)}</span>
                    </div>
                    <p className="text-[10px] text-notion-text-secondary">{formatNumber(platform.followers)} متابع</p>
                  </div>
                </motion.div>
              ))}
              {/* YouTube Shorts vs Videos */}
              {totalYoutubeViews > 0 && (
                <div className="mt-1 pt-1 border-t border-notion-border">
                  <p className="text-[10px] text-notion-text-secondary mb-1">يوتيوب: شورتس vs حلقات</p>
                  <div className="flex gap-2 text-xs">
                    <div className="flex-1 text-center bg-accent-orange/10 rounded p-1">
                      <span className="font-bold text-accent-orange">{formatNumber(totalYoutubeShorts)}</span>
                      <p className="text-[9px] text-notion-text-secondary">شورتس</p>
                    </div>
                    <div className="flex-1 text-center bg-accent-red/10 rounded p-1">
                      <span className="font-bold text-accent-red">{formatNumber(totalYoutubeVideos)}</span>
                      <p className="text-[9px] text-notion-text-secondary">حلقات</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Monthly Chart */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact flex flex-col"
          >
            <h3 className="text-sm font-semibold text-notion-text mb-2">النمو الشهري</h3>
            <div className="chart-container flex-1">
              {monthlyViewsData.length > 0 ? (
                <BarChart
                  labels={monthLabels}
                  datasets={[{
                    label: 'المشاهدات',
                    data: monthlyViewsData,
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                  }]}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-notion-text-secondary text-sm">
                  لا توجد بيانات شهرية
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Generate all program slides
export const programSlides = reportData.programs.map(program => ({
  id: program.id,
  name: program.name,
  component: () => <ProgramDetailSlide programId={program.id} />,
}));
