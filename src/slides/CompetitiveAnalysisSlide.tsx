import { motion } from 'framer-motion';
import { Play, Users, Eye, Ban } from 'lucide-react';

const platforms = [
  {
    name: 'ثمانية',
    launchDate: 'سبتمبر 2016',
    subscribers: 6.65,
    episodes: 1761,
    views: 916492798,
    color: '#1a1a2e',
  },
  {
    name: 'بث حديث',
    launchDate: '١٧ أكتوبر ٢٠٢٣',
    subscribers: 2.48,
    episodes: 839,
    views: 278787403,
    color: '#9a6dd7',
  },
  {
    name: 'أثير',
    launchDate: '٢٨ سبتمبر ٢٠٢٣',
    subscribers: 1.84,
    episodes: 361,
    views: 209809931,
    color: '#ef4444',
  },
];

const formatViews = (num: number) => {
  return (num / 1000000).toFixed(1);
};

const getBarHeight = (value: number, max: number) => {
  return Math.max((value / max) * 100, 20);
};

export function CompetitiveAnalysisSlide() {
  const maxEpisodes = Math.max(...platforms.map(p => p.episodes));
  const maxSubscribers = Math.max(...platforms.map(p => p.subscribers));
  const maxViews = Math.max(...platforms.map(p => p.views));

  return (
    <div className="slide bg-notion-bg flex flex-col justify-center items-center min-h-screen px-2 py-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-2">
          <span className="text-gradient">تحليل المشهد التنافسي</span>
        </h2>
        <p className="text-notion-text-secondary text-lg">
          مقارنة شاملة مع المنافسين الرئيسيين في السوق
        </p>
        <p className="text-gray-500 text-sm">
          المقارنة وفق مشاهدات يوتيوب منذ تأسيس كل منصة
        </p>
      </motion.div>

      <div className="w-full max-w-[85%] mx-auto flex flex-col justify-center">
        {/* Charts Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Episodes Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-notion-card border-2 border-notion-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <h3 className="text-xl font-bold text-notion-text">الحلقات</h3>
              <Play className="w-5 h-5 text-green-500" fill="#22c55e" />
            </div>

            <div className="flex items-end justify-center gap-8 h-56 mb-4">
              {platforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${getBarHeight(platform.episodes, maxEpisodes) * 2}px` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="w-16 rounded-t-lg flex items-center justify-center"
                    style={{ backgroundColor: platform.color }}
                  >
                    <span className="text-white font-bold text-sm">{platform.episodes}</span>
                  </motion.div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">{platform.name}</span>
                  <span className="text-[10px] text-gray-400">{platform.launchDate}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Subscribers Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-notion-card border-2 border-notion-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <h3 className="text-xl font-bold text-notion-text">عدد المتابعين</h3>
              <Users className="w-5 h-5 text-pink-500" />
            </div>

            <div className="flex items-end justify-center gap-8 h-56 mb-4">
              {platforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${getBarHeight(platform.subscribers, maxSubscribers) * 2}px` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="w-16 rounded-t-lg flex items-center justify-center"
                    style={{ backgroundColor: platform.color }}
                  >
                    <span className="text-white font-bold text-sm">{platform.subscribers}</span>
                  </motion.div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">{platform.name}</span>
                  <span className="text-[10px] text-gray-400">{platform.launchDate}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Views Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-notion-card border-2 border-notion-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <h3 className="text-xl font-bold text-notion-text">عدد المشاهدات</h3>
              <Eye className="w-5 h-5 text-purple-500" />
            </div>

            <div className="flex items-end justify-center gap-8 h-56 mb-4">
              {platforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${getBarHeight(platform.views, maxViews) * 2}px` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="w-16 rounded-t-lg flex items-center justify-center"
                    style={{ backgroundColor: platform.color }}
                  >
                    <span className="text-white font-bold text-[10px]">{formatViews(platform.views)}</span>
                  </motion.div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">{platform.name}</span>
                  <span className="text-[10px] text-gray-400">{platform.launchDate}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* No Ads Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#9a6dd7] rounded-2xl px-16 py-5 text-center mx-auto"
        >
          <Ban className="w-12 h-12 text-[#9a6dd7] bg-white rounded-full p-2 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white mb-1">نمو بث حديث بدون إعلانات</h3>
          <p className="text-purple-100 text-base">
            نمو طبيعي مقابل نمو مدفوع بميزانيات (أكثر من 500 ألف دولار)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
