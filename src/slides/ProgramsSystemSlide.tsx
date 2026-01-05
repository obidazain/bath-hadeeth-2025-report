import { motion } from 'framer-motion';
import { programLogos } from '../data/report-data';

interface ProgramItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'stopped';
}

interface CategoryData {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  programs: ProgramItem[];
}

const categories: CategoryData[] = [
  {
    title: 'المحتوى المحلي',
    subtitle: 'تغطية محلية متخصصة',
    icon: '🗺️',
    color: 'purple',
    programs: [
      { id: 'syria', name: 'سوريا بودكاست', description: 'نشط', status: 'active' },
      { id: 'yemen', name: 'اليمن بودكاست', description: 'نشط', status: 'active' },
      { id: 'sudan', name: 'السودان بودكاست', description: 'نشط', status: 'active' },
      { id: 'iran', name: 'إيران بودكاست', description: 'نشط', status: 'active' },
      { id: 'iraq', name: 'العراق بودكاست', description: 'متوقف حالياً', status: 'stopped' },
    ],
  },
  {
    title: 'المحتوى المتخصص',
    subtitle: 'برامج تخصصية متعمقة',
    icon: '🎓',
    color: 'pink',
    programs: [
      { id: 'bast', name: 'بسط بودكاست', description: 'الدين والفكر والواقع', status: 'active' },
      { id: 'shahada', name: 'شهادة بودكاست', description: 'شهادات من الواقع', status: 'active' },
      { id: 'duetto', name: 'الدويتو', description: 'رياضة وسياسة', status: 'active' },
      { id: 'malaz', name: 'ملاذ بودكاست', description: 'علم النفس والصحة العامة', status: 'stopped' },
      { id: 'ghada', name: 'غادة بودكاست', description: 'برنامج نسائي', status: 'stopped' },
    ],
  },
  {
    title: 'المحتوى العام',
    subtitle: 'تغطية شاملة ومتنوعة',
    icon: '🌐',
    color: 'blue',
    programs: [
      { id: 'ehata', name: 'إحاطة', description: 'خبري نخبوي', status: 'active' },
      { id: 'arabypost', name: 'عربي بوست', description: 'اخباري ومنوع', status: 'active' },
      { id: 'sharq', name: 'الشرق بودكاست', description: 'السرديات والصورة الكبيرة للمنطقة والعالم', status: 'active' },
    ],
  },
  {
    title: 'إنتاجات أخرى',
    subtitle: 'منتجات نقدمها للمؤسسات الرديفة',
    icon: '⭐',
    color: 'orange',
    programs: [
      { id: 'mawazen', name: 'موازين', description: 'جيوبولتيك العالم', status: 'active' },
      { id: 'rabee', name: 'الربيع الأول', description: 'نظرة استراتيجية في السيرة النبوية', status: 'active' },
      { id: 'falak', name: 'فلك', description: 'منصات النشر الخاصة', status: 'active' },
      { id: 'motalaat', name: 'مطالعات استراتيجية', description: 'أسباب للشؤون الاستراتيجية', status: 'active' },
      { id: 'academia', name: 'الشرق أكاديميا', description: 'المحتوى الأكاديمي', status: 'active' },
      { id: 'diwan', name: 'ديوان الشرق', description: 'بث ونشر جلسات الديوان', status: 'active' },
    ],
  },
];

const stats = [
  { value: '10', label: 'برنامج نشط', color: 'purple' },
  { value: '3', label: 'برنامج متوقف', color: 'gray' },
  { value: '839', label: 'حلقة منشورة منذ نوفمبر 2023', color: 'purple' },
];

export function ProgramsSystemSlide() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'bg-purple-500' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', icon: 'bg-pink-500' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'bg-blue-500' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'bg-orange-500' },
      gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', icon: 'bg-gray-500' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="slide bg-white" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">منظومة البرامج المتكاملة</span>
          </h2>
          <p className="text-notion-text-secondary text-base">
            شبكة متنوعة من البرامج تغطي المنطقة والتخصصات المختلفة
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center"
            >
              <p className={`text-3xl font-bold ${stat.color === 'purple' ? 'text-primary' : 'text-gray-500'}`}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, catIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
                className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-4`}
              >
                {/* Category Header */}
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className={`text-lg font-bold ${colors.text}`}>{category.title}</h3>
                  <p className="text-xs text-gray-500">{category.subtitle}</p>
                </div>

                {/* Programs List */}
                <div className="space-y-2">
                  {category.programs.map((program) => {
                    const logoPath = programLogos[program.id];
                    // موازين وفلك نعرضهم كحروف فقط
                    const showAsLetter = program.id === 'mawazen' || program.id === 'falak' || !logoPath || !logoPath.endsWith('.png');
                    const isActive = program.status === 'active';
                    return (
                      <div
                        key={program.id}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isActive
                            ? 'bg-white/80 border border-gray-100'
                            : 'bg-gray-100/50 border border-dashed border-gray-300 opacity-60'
                        }`}
                      >
                        {!showAsLetter && logoPath ? (
                          <img
                            src={logoPath}
                            alt={program.name}
                            className={`w-8 h-8 rounded-lg object-contain ${!isActive ? 'grayscale' : ''}`}
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-lg ${isActive ? colors.icon : 'bg-gray-400'} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">
                              {program.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                            {program.name}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">{program.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
