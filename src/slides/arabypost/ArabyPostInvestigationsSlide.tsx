import { motion } from 'framer-motion';
import { investigationsData } from '../../data/arabypost-investigations-data';

export function ArabyPostInvestigationsSlide() {
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
            تحقيقات{' '}
            <span className="text-[#08b2e3]">مفتوحة المصدر</span>
          </h2>
          <p className="text-xl text-gray-500 mt-1" dir="ltr" style={{ textAlign: 'left' }}>Open Source Investigations</p>
          <p className="text-lg text-gray-400 mt-2">تحقيقات استقصائية حصرية من عربي بوست | Exclusive investigative reports from ArabicPost</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4">
          {investigationsData.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-[#08b2e3]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-[#08b2e3]/20', 'to-[#08b2e3]/5');
                  }}
                />
                {/* Viral Badge */}
                {'viral' in item && item.viral && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      انتشار واسع | Viral
                    </div>
                  </div>
                )}
                {/* Link Icon */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-[#08b2e3] text-white rounded-full p-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-800 text-right mb-1 group-hover:text-[#08b2e3] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 text-right line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-400">
            انقر على أي تحقيق لفتحه في نافذة جديدة | Click any investigation to open in a new tab
          </p>
        </motion.div>
      </div>
    </div>
  );
}
