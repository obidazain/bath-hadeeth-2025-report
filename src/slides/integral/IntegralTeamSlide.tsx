import { motion } from 'framer-motion';

interface TeamYear {
  year: string;
  fullTime: number;
  contractors: number;
  total: number;
}

const teamData: TeamYear[] = [
  { year: '2023', fullTime: 49, contractors: 53, total: 102 },
  { year: '2024', fullTime: 75, contractors: 24, total: 99 },
  { year: '2025', fullTime: 63, contractors: 17, total: 80 },
];

// SVG Icons
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export function IntegralTeamSlide() {
  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
            فريق العمل
          </h2>
          <p className="text-gray-600 text-lg font-medium" dir="ltr">
            Human Resources Overview
          </p>
          <p className="text-gray-500 text-sm mt-1">
            تطور الموارد البشرية في انتجرال ميديا
            <span className="mx-2">|</span>
            <span dir="ltr">HR Evolution at Integral Media</span>
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {teamData.map((year, index) => {
            return (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`rounded-2xl p-5 border-2 ${
                  year.year === '2025'
                    ? 'bg-orange-50 border-orange-300 shadow-lg'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Year Badge */}
                <div className="text-center mb-4">
                  <div className={`inline-block px-6 py-2 rounded-full text-2xl font-bold ${
                    year.year === '2025'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {year.year}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {/* Full Time */}
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">
                          <BriefcaseIcon />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-600">موظفين بدوام كامل</span>
                          <span className="text-xs text-gray-400" dir="ltr">Full-time employees</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="text-2xl font-bold text-blue-600">{year.fullTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contractors */}
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600">
                          <UsersIcon />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-600">متعاونين</span>
                          <span className="text-xs text-gray-400" dir="ltr">Contributors / Freelancers</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="text-2xl font-bold text-purple-600">{year.contractors}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className={`rounded-xl p-3 border-2 ${
                    year.year === '2025'
                      ? 'bg-orange-100 border-orange-300'
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={year.year === '2025' ? 'text-orange-600' : 'text-gray-600'}>
                          <UserGroupIcon />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">المجموع</span>
                          <span className="text-xs text-gray-400" dir="ltr">Total</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className={`text-3xl font-bold ${
                          year.year === '2025' ? 'text-orange-600' : 'text-gray-700'
                        }`}>{year.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
