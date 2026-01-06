import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { facebookEngagementData } from '../../data/arabypost-stats-data';

export function ArabyPostEngagementSlide() {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-right">
            التفاعل على{' '}
            <span className="text-[#08b2e3]">فيسبوك</span>
          </h2>
          <p className="text-lg text-gray-500 mt-2 text-right">عدد التفاعلات الشهرية - مقارنة 2024 vs 2025</p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-50 rounded-3xl p-6 border border-gray-100 h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={facebookEngagementData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#08b2e3" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#08b2e3" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="monthEn"
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [`${(Number(value) / 1000).toFixed(1)}M تفاعل`, '']}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="year2024"
                name="2024"
                stroke="#9ca3af"
                strokeWidth={2}
                fill="url(#color2024)"
              />
              <Area
                type="monotone"
                dataKey="year2025"
                name="2025"
                stroke="#08b2e3"
                strokeWidth={3}
                fill="url(#color2025)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-8 mt-6"
        >
          <div className="text-center">
            <p className="text-sm text-gray-500">يناير 2024</p>
            <p className="text-2xl font-bold text-gray-400">300K تفاعل</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">ذروة سبتمبر 2025</p>
            <p className="text-2xl font-bold text-[#08b2e3]">1.8M تفاعل</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
