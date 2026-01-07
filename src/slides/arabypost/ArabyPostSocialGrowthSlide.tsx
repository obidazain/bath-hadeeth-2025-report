import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { instagramData, tiktokData } from '../../data/arabypost-stats-data';

export function ArabyPostSocialGrowthSlide() {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#08b2e3]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center z-10 max-w-6xl mx-auto w-full px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            نمو{' '}
            <span className="text-[#08b2e3]">السوشيال ميديا</span>
          </h2>
          <p className="text-xl text-gray-500 mt-1" dir="ltr" style={{ textAlign: 'left' }}>Social Media Growth</p>
          <p className="text-lg text-gray-400 mt-2">مشاهدات إنستجرام وتيكتوك | Instagram & TikTok Views</p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Instagram Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-5 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              إنستجرام | Instagram
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instagramData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="monthEn" stroke="#6b7280" fontSize={10} />
                  <YAxis stroke="#6b7280" fontSize={10} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${(Number(value) / 1000).toFixed(1)}M`, '']}
                  />
                  <Legend />
                  <Bar dataKey="year2024" name="2024" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="year2025" name="2025" fill="#08b2e3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* TikTok Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 rounded-3xl p-5 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              تيكتوك | TikTok
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tiktokData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="monthEn" stroke="#6b7280" fontSize={10} />
                  <YAxis stroke="#6b7280" fontSize={10} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${(Number(value) / 1000).toFixed(1)}M`, '']}
                  />
                  <Legend />
                  <Bar dataKey="year2024" name="2024" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="year2025" name="2025" fill="#08b2e3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-12 mt-6"
        >
          <div className="text-center">
            <p className="text-sm text-gray-500">ذروة إنستجرام 2025 | Peak Instagram 2025</p>
            <p className="text-xl font-bold text-[#08b2e3]">38.7 مليون مشاهدة | 38.7M views</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">ذروة تيكتوك 2024 | Peak TikTok 2024</p>
            <p className="text-xl font-bold text-gray-400">41.1 مليون مشاهدة | 41.1M views</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
