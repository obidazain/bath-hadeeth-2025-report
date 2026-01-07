import { motion } from 'framer-motion';
import { reportData } from '../data/report-data';
import { reportData2024 } from '../data/report-data-2024';
import { formatNumber } from '../utils/formatters';

export function PodcastSlide() {
  const topPrograms = reportData.podcast.programDownloads.slice(0, 5);
  const topCountries = reportData.podcast.topCountries.slice(0, 5);

  // Get 2024 data for comparison
  const programs2024Map = new Map(
    reportData2024.podcast.programDownloads.map(p => [p.name, p.downloads])
  );

  const countries2024Map = new Map(
    reportData2024.podcast.topCountries.map(c => [c.country, c.downloads])
  );

  return (
    <div className="slide flex flex-col px-2 py-1" dir="rtl">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-5xl font-bold mb-2">
            <span className="text-gradient">المنصات الصوتية</span>
          </h2>
          <p className="text-notion-text-secondary text-lg" dir="ltr" style={{ textAlign: 'center' }}>Audio Platforms</p>
          <p className="text-notion-text-secondary text-base mt-1">
            البودكاست على Spotify و Apple Podcasts وغيرها
          </p>
        </motion.div>

        {/* Key Stats - Only 2 cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-3 max-w-xl mx-auto"
        >
          <div className="card-compact text-center py-4">
            <p className="text-5xl font-bold text-accent-green">
              {formatNumber(reportData.podcast.totalDownloads)}
            </p>
            <p className="text-base text-notion-text-secondary mt-1">تحميل 2025</p>
          </div>
          <div className="card-compact text-center py-4">
            <p className="text-5xl font-bold text-notion-text-secondary">
              {formatNumber(reportData2024.podcast.totalDownloads)}
            </p>
            <p className="text-base text-notion-text-secondary mt-1">تحميل 2024</p>
          </div>
        </motion.div>

        {/* Lists side by side */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Top Programs List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-compact p-4 flex flex-col h-full"
          >
            <h3 className="text-base font-semibold text-center mb-1 text-notion-text">
              أكثر البرامج استماعاً
            </h3>
            <p className="text-xs text-center text-gray-400 mb-3" dir="ltr">Top Programs by Listens</p>
            <div className="space-y-3 flex-1 flex flex-col justify-around">
              {topPrograms.map((program, index) => {
                const value2024 = programs2024Map.get(program.name) || 0;
                const maxValue = Math.max(topPrograms[0].downloads, programs2024Map.get(topPrograms[0].name) || 0);
                const barWidth2025 = (program.downloads / maxValue) * 100;
                const barWidth2024 = (value2024 / maxValue) * 100;
                return (
                  <div key={program.name} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent-green w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-base font-medium text-notion-text">{program.name}</span>
                      </div>
                      {/* 2025 Bar */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-accent-green w-8">2025</span>
                        <div className="flex-1 h-5 bg-notion-border/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-green rounded-full"
                            style={{ width: `${barWidth2025}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-accent-green w-16 text-left">{formatNumber(program.downloads)}</span>
                      </div>
                      {/* 2024 Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-notion-text-secondary w-8">2024</span>
                        <div className="flex-1 h-5 bg-notion-border/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-green/40 rounded-full"
                            style={{ width: `${barWidth2024}%` }}
                          />
                        </div>
                        <span className="text-sm text-notion-text-secondary w-16 text-left">{formatNumber(value2024)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Countries List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-compact p-4 flex flex-col h-full"
          >
            <h3 className="text-base font-semibold text-center mb-1 text-notion-text">
              أكثر الدول استماعاً
            </h3>
            <p className="text-xs text-center text-gray-400 mb-3" dir="ltr">Top Countries by Listens</p>
            <div className="space-y-3 flex-1 flex flex-col justify-around">
              {topCountries.map((country, index) => {
                const value2024 = countries2024Map.get(country.countryAr) || 0;
                const maxValue = Math.max(topCountries[0].downloads, countries2024Map.get(topCountries[0].countryAr) || 0);
                const barWidth2025 = (country.downloads / maxValue) * 100;
                const barWidth2024 = (value2024 / maxValue) * 100;
                return (
                  <div key={country.countryAr} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent-purple w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-base font-medium text-notion-text">{country.countryAr}</span>
                      </div>
                      {/* 2025 Bar */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-accent-purple w-8">2025</span>
                        <div className="flex-1 h-5 bg-notion-border/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-purple rounded-full"
                            style={{ width: `${barWidth2025}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-accent-purple w-16 text-left">{formatNumber(country.downloads)}</span>
                      </div>
                      {/* 2024 Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-notion-text-secondary w-8">2024</span>
                        <div className="flex-1 h-5 bg-notion-border/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-purple/40 rounded-full"
                            style={{ width: `${barWidth2024}%` }}
                          />
                        </div>
                        <span className="text-sm text-notion-text-secondary w-16 text-left">{formatNumber(value2024)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
