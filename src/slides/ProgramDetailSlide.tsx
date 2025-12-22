import { motion } from 'framer-motion';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { BarChart } from '../components/charts/BarChart';
import { reportData, programLogos, programMonthlyData } from '../data/report-data';
import { formatNumber } from '../utils/formatters';

interface ProgramDetailSlideProps {
  programId: string;
}

export function ProgramDetailSlide({ programId }: ProgramDetailSlideProps) {
  const program = reportData.programs.find(p => p.id === programId);

  if (!program) {
    return <div className="min-h-screen flex items-center justify-center text-notion-text">برنامج غير موجود</div>;
  }

  // Find watch time for this program
  const watchTimeEntry = reportData.watchTime.byProgram.find(w => w.name === program.name);
  const watchTime = watchTimeEntry?.hours || 0;

  // Find podcast downloads
  const podcastEntry = reportData.podcast.programDownloads.find(p =>
    p.name.includes(program.name) || p.nameEn.toLowerCase().includes(program.nameEn.toLowerCase())
  );
  const podcastDownloads = podcastEntry?.downloads || 0;

  // Get monthly data for this program
  const monthlyData = programMonthlyData[programId] || [];

  // Calculate YouTube Shorts vs Videos totals
  const totalYoutubeVideos = monthlyData.reduce((sum, m) => sum + m.youtubeVideos, 0);
  const totalYoutubeShorts = monthlyData.reduce((sum, m) => sum + m.youtubeShorts, 0);
  const totalYoutubeViews = totalYoutubeVideos + totalYoutubeShorts;

  // Platform breakdown
  const platformData = [
    { name: 'يوتيوب', views: program.youtube.views, color: 'rgba(235, 87, 87, 0.85)' },
    { name: 'تيك توك', views: program.tiktok.views, color: 'rgba(55, 53, 47, 0.85)' },
    { name: 'انستجرام', views: program.instagram.views, color: 'rgba(226, 85, 161, 0.85)' },
    { name: 'فيسبوك', views: program.facebook.views, color: 'rgba(82, 156, 202, 0.85)' },
  ].filter(p => p.views > 0);

  // Calculate program rank
  const programRank = reportData.programs
    .sort((a, b) => b.totalViews - a.totalViews)
    .findIndex(p => p.id === programId) + 1;

  // Get program logo
  const logoPath = programLogos[programId];

  // Prepare monthly chart data
  const monthLabels = monthlyData.filter(m => m.totalViews > 0).map(m => m.monthName);
  const monthlyViewsData = monthlyData.filter(m => m.totalViews > 0).map(m => m.totalViews);

  return (
    <div className="min-h-screen p-6 md:p-8 bg-notion-bg pb-32">
      {/* Program Header with Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          {logoPath && (
            <img
              src={logoPath}
              alt={program.name}
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl shadow-md"
            />
          )}
          <div>
            <div className="inline-flex items-center gap-2 tag tag-purple mb-2">
              <span>#{programRank}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-notion-text">
              {program.name}
            </h2>
            <p className="text-notion-text-secondary">{program.nameEn}</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-4 text-center"
          >
            <p className="text-notion-text-secondary text-sm mb-1">إجمالي المشاهدات</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {formatNumber(program.totalViews)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card p-4 text-center"
          >
            <p className="text-notion-text-secondary text-sm mb-1">إجمالي المتابعين</p>
            <p className="text-2xl md:text-3xl font-bold text-accent-pink">
              {formatNumber(program.totalFollowers)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-4 text-center"
          >
            <p className="text-notion-text-secondary text-sm mb-1">متابعين جدد 2025</p>
            <p className="text-2xl md:text-3xl font-bold text-accent-green">
              {formatNumber(program.newFollowers2025)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card p-4 text-center"
          >
            <p className="text-notion-text-secondary text-sm mb-1">ساعات المشاهدة</p>
            <p className="text-2xl md:text-3xl font-bold text-accent-red">
              {formatNumber(watchTime)}
            </p>
          </motion.div>
        </div>

        {/* YouTube Shorts vs Videos Section */}
        {totalYoutubeViews > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-notion-text mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-red"></div>
              يوتيوب: الحلقات الطويلة vs المقاطع القصيرة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Videos (Long-form) */}
              <div className="card-secondary p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-accent-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  <span className="font-medium text-notion-text">حلقات طويلة</span>
                </div>
                <p className="text-2xl font-bold text-accent-red mb-1">
                  {formatNumber(totalYoutubeVideos)}
                </p>
                <p className="text-sm text-notion-text-secondary">
                  {totalYoutubeViews > 0 ? ((totalYoutubeVideos / totalYoutubeViews) * 100).toFixed(1) : 0}%
                </p>
              </div>

              {/* Shorts */}
              <div className="card-secondary p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-accent-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z"/>
                  </svg>
                  <span className="font-medium text-notion-text">شورتس</span>
                </div>
                <p className="text-2xl font-bold text-accent-orange mb-1">
                  {formatNumber(totalYoutubeShorts)}
                </p>
                <p className="text-sm text-notion-text-secondary">
                  {totalYoutubeViews > 0 ? ((totalYoutubeShorts / totalYoutubeViews) * 100).toFixed(1) : 0}%
                </p>
              </div>

              {/* Total YouTube */}
              <div className="card-secondary p-4 rounded-lg text-center bg-accent-red/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-accent-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-medium text-notion-text">إجمالي يوتيوب</span>
                </div>
                <p className="text-2xl font-bold text-accent-red mb-1">
                  {formatNumber(totalYoutubeViews)}
                </p>
                <p className="text-sm text-notion-text-secondary">مشاهدة</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-notion-text mb-4">
              توزيع المشاهدات حسب المنصة
            </h3>
            <div className="h-64">
              <DoughnutChart
                labels={platformData.map(p => p.name)}
                data={platformData.map(p => p.views)}
                colors={platformData.map(p => p.color)}
              />
            </div>
          </motion.div>

          {/* Platform Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-notion-text mb-4">
              تفاصيل المنصات
            </h3>
            <div className="space-y-3">
              {/* YouTube */}
              <div className="card-secondary p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-red"></div>
                    <span className="font-medium text-notion-text">يوتيوب</span>
                  </div>
                  <span className="tag tag-red text-xs">{formatNumber(program.youtube.views)} مشاهدة</span>
                </div>
                <div className="text-sm text-notion-text-secondary">
                  {formatNumber(program.youtube.subscribers)} مشترك
                </div>
              </div>

              {/* TikTok */}
              {program.tiktok.views > 0 && (
                <div className="card-secondary p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-notion-text"></div>
                      <span className="font-medium text-notion-text">تيك توك</span>
                    </div>
                    <span className="tag tag-gray text-xs">{formatNumber(program.tiktok.views)} مشاهدة</span>
                  </div>
                  <div className="text-sm text-notion-text-secondary">
                    {formatNumber(program.tiktok.followers)} متابع
                  </div>
                </div>
              )}

              {/* Instagram */}
              <div className="card-secondary p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-pink"></div>
                    <span className="font-medium text-notion-text">انستجرام</span>
                  </div>
                  <span className="tag tag-pink text-xs">{formatNumber(program.instagram.views)} مشاهدة</span>
                </div>
                <div className="text-sm text-notion-text-secondary">
                  {formatNumber(program.instagram.followers)} متابع
                </div>
              </div>

              {/* Facebook */}
              {program.facebook.views > 0 && (
                <div className="card-secondary p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent-blue"></div>
                      <span className="font-medium text-notion-text">فيسبوك</span>
                    </div>
                    <span className="tag tag-blue text-xs">{formatNumber(program.facebook.views)} مشاهدة</span>
                  </div>
                  <div className="text-sm text-notion-text-secondary">
                    {formatNumber(program.facebook.followers)} متابع
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Monthly Trend Chart */}
        {monthlyViewsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6"
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-notion-text mb-4">
                النمو الشهري للمشاهدات
              </h3>
              <div className="h-64">
                <BarChart
                  labels={monthLabels}
                  datasets={[{
                    label: 'المشاهدات',
                    data: monthlyViewsData,
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                  }]}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Stats */}
        {podcastDownloads > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div className="card-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-green/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-notion-text">تحميلات البودكاست</p>
                  <p className="text-sm text-notion-text-secondary">عبر المنصات الصوتية</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-accent-green">{formatNumber(podcastDownloads)}</p>
            </div>
          </motion.div>
        )}
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
