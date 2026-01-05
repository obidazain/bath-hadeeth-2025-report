import { useState, useRef } from 'react';
import { useDataStore } from '../store/dataStore';
import { NumberInput } from '../components/admin/inputs/NumberInput';
import { Link } from 'react-router-dom';
import {
  generateTotalsTemplate,
  generatePlatformsTemplate,
  generateProgramsTemplate,
  generateMonthlyTemplate,
  generateProductionTemplate,
  generateWatchTimeTemplate,
  exportTotalsToCSV,
  exportPlatformsToCSV,
  exportProgramsToCSV,
  exportMonthlyToCSV,
  exportProductionToCSV,
  exportWatchTimeToCSV,
  importTotalsFromCSV,
  importPlatformsFromCSV,
  importProgramsFromCSV,
  importMonthlyFromCSV,
  importProductionFromCSV,
  importWatchTimeFromCSV,
  downloadCSV,
  readCSVFile,
} from '../utils/csvUtils';

type Section = 'dashboard' | 'totals' | 'platforms' | 'programs' | 'monthly' | 'watchtime' | 'podcast' | 'production';

const sections: { id: Section; name: string; icon: string }[] = [
  { id: 'dashboard', name: 'الرئيسية', icon: '📊' },
  { id: 'totals', name: 'الإجماليات', icon: '📈' },
  { id: 'platforms', name: 'المنصات', icon: '📱' },
  { id: 'programs', name: 'البرامج', icon: '📺' },
  { id: 'monthly', name: 'الشهري', icon: '📅' },
  { id: 'watchtime', name: 'مدة المشاهدة', icon: '⏱️' },
  { id: 'production', name: 'الإنتاج', icon: '🎬' },
];

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    totals,
    platforms,
    programs,
    programMonthlyData,
    watchTime,
    productionData,
    updateTotal,
    updatePlatform,
    updateProgram,
    updateProgramMonthly,
    updateWatchTime,
    updateProduction,
    exportData,
    importData,
    resetToDefault,
  } = useDataStore();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bath-hadeeth-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        alert('تم استيراد البيانات بنجاح!');
      } else {
        alert('فشل استيراد البيانات. تأكد من صحة الملف.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد؟ سيتم إعادة جميع البيانات للقيم الافتراضية.')) {
      resetToDefault();
      alert('تم إعادة البيانات للقيم الافتراضية');
    }
  };

  // CSV Template Downloads
  const downloadTemplate = (type: string) => {
    const date = new Date().toISOString().split('T')[0];
    switch (type) {
      case 'totals':
        downloadCSV(generateTotalsTemplate(), `template-totals-${date}.csv`);
        break;
      case 'platforms':
        downloadCSV(generatePlatformsTemplate(), `template-platforms-${date}.csv`);
        break;
      case 'programs':
        downloadCSV(generateProgramsTemplate(programs), `template-programs-${date}.csv`);
        break;
      case 'monthly':
        downloadCSV(generateMonthlyTemplate(programs), `template-monthly-${date}.csv`);
        break;
      case 'production':
        downloadCSV(generateProductionTemplate(programs), `template-production-${date}.csv`);
        break;
      case 'watchtime':
        downloadCSV(generateWatchTimeTemplate(watchTime.byProgram), `template-watchtime-${date}.csv`);
        break;
    }
  };

  // CSV Export
  const exportCSV = (type: string) => {
    const date = new Date().toISOString().split('T')[0];
    switch (type) {
      case 'totals':
        downloadCSV(exportTotalsToCSV(totals as any), `export-totals-${date}.csv`);
        break;
      case 'platforms':
        downloadCSV(exportPlatformsToCSV(platforms), `export-platforms-${date}.csv`);
        break;
      case 'programs':
        downloadCSV(exportProgramsToCSV(programs), `export-programs-${date}.csv`);
        break;
      case 'monthly':
        downloadCSV(exportMonthlyToCSV(programs, programMonthlyData), `export-monthly-${date}.csv`);
        break;
      case 'production':
        downloadCSV(exportProductionToCSV(programs, productionData), `export-production-${date}.csv`);
        break;
      case 'watchtime':
        downloadCSV(exportWatchTimeToCSV(watchTime), `export-watchtime-${date}.csv`);
        break;
    }
  };

  // Download All Templates
  const downloadAllTemplates = () => {
    const date = new Date().toISOString().split('T')[0];
    // Download each template with a small delay to avoid browser blocking
    const templates = [
      { type: 'totals', name: `template-totals-${date}.csv` },
      { type: 'platforms', name: `template-platforms-${date}.csv` },
      { type: 'programs', name: `template-programs-${date}.csv` },
      { type: 'monthly', name: `template-monthly-${date}.csv` },
      { type: 'production', name: `template-production-${date}.csv` },
      { type: 'watchtime', name: `template-watchtime-${date}.csv` },
    ];

    templates.forEach((template, index) => {
      setTimeout(() => {
        downloadTemplate(template.type);
      }, index * 300); // 300ms delay between downloads
    });

    alert('جاري تحميل جميع القوالب...');
  };

  // Export All Data
  const exportAllCSV = () => {
    const date = new Date().toISOString().split('T')[0];
    const exports = [
      { type: 'totals', name: `export-totals-${date}.csv` },
      { type: 'platforms', name: `export-platforms-${date}.csv` },
      { type: 'programs', name: `export-programs-${date}.csv` },
      { type: 'monthly', name: `export-monthly-${date}.csv` },
      { type: 'production', name: `export-production-${date}.csv` },
      { type: 'watchtime', name: `export-watchtime-${date}.csv` },
    ];

    exports.forEach((exp, index) => {
      setTimeout(() => {
        exportCSV(exp.type);
      }, index * 300); // 300ms delay between exports
    });

    alert('جاري تصدير جميع البيانات...');
  };

  // CSV Import
  const handleCSVImport = async (type: string, file: File) => {
    try {
      const content = await readCSVFile(file);
      let success = false;

      switch (type) {
        case 'totals': {
          const data = importTotalsFromCSV(content);
          if (data) {
            Object.entries(data).forEach(([key, value]) => {
              updateTotal(key as any, value);
            });
            success = true;
          }
          break;
        }
        case 'platforms': {
          const data = importPlatformsFromCSV(content);
          if (data) {
            Object.entries(data).forEach(([platform, values]) => {
              Object.entries(values as Record<string, number>).forEach(([key, value]) => {
                updatePlatform(platform, key, value as number);
              });
            });
            success = true;
          }
          break;
        }
        case 'programs': {
          const data = importProgramsFromCSV(content);
          if (data) {
            data.forEach((program) => {
              updateProgram(program.id, 'totalViews', program.totalViews);
              updateProgram(program.id, 'totalViewsNoFB', program.totalViewsNoFB);
              updateProgram(program.id, 'totalFollowers', program.totalFollowers);
              updateProgram(program.id, 'newFollowers2025', program.newFollowers2025);
              updateProgram(program.id, 'youtube.views', program.youtube.views);
              updateProgram(program.id, 'youtube.subscribers', program.youtube.subscribers);
              updateProgram(program.id, 'tiktok.views', program.tiktok.views);
              updateProgram(program.id, 'tiktok.followers', program.tiktok.followers);
              updateProgram(program.id, 'instagram.views', program.instagram.views);
              updateProgram(program.id, 'instagram.followers', program.instagram.followers);
              updateProgram(program.id, 'facebook.views', program.facebook.views);
              updateProgram(program.id, 'facebook.followers', program.facebook.followers);
            });
            success = true;
          }
          break;
        }
        case 'monthly': {
          const data = importMonthlyFromCSV(content);
          if (data) {
            Object.entries(data).forEach(([programId, months]) => {
              months.forEach((monthData, index) => {
                Object.entries(monthData).forEach(([key, value]) => {
                  if (key !== 'month') {
                    updateProgramMonthly(programId, index, key as any, value as number);
                  }
                });
              });
            });
            success = true;
          }
          break;
        }
        case 'production': {
          const data = importProductionFromCSV(content);
          if (data) {
            Object.entries(data).forEach(([programId, months]) => {
              months.forEach((monthData, index) => {
                updateProduction(programId, index, 'episodes', monthData.episodes);
                updateProduction(programId, index, 'hours', monthData.hours);
              });
            });
            success = true;
          }
          break;
        }
        case 'watchtime': {
          const data = importWatchTimeFromCSV(content);
          if (data) {
            data.forEach((item, index) => {
              updateWatchTime(`byProgram.${index}`, item.hours);
            });
            success = true;
          }
          break;
        }
      }

      if (success) {
        alert('تم استيراد البيانات بنجاح!');
      } else {
        alert('فشل استيراد البيانات. تأكد من صحة صيغة الملف.');
      }
    } catch (error) {
      alert('حدث خطأ أثناء قراءة الملف.');
      console.error(error);
    }
  };

  // Import Multiple CSV Files
  const handleMultipleCSVImport = async (files: FileList) => {
    const fileArray = Array.from(files);
    let successCount = 0;
    let failCount = 0;

    for (const file of fileArray) {
      const fileName = file.name.toLowerCase();
      let type = '';

      // Detect file type from filename
      if (fileName.includes('totals')) type = 'totals';
      else if (fileName.includes('platforms')) type = 'platforms';
      else if (fileName.includes('programs')) type = 'programs';
      else if (fileName.includes('monthly')) type = 'monthly';
      else if (fileName.includes('production')) type = 'production';
      else if (fileName.includes('watchtime')) type = 'watchtime';

      if (type) {
        try {
          await handleCSVImport(type, file);
          successCount++;
        } catch {
          failCount++;
        }
      } else {
        failCount++;
      }
    }

    alert(`تم استيراد ${successCount} ملف بنجاح. فشل ${failCount} ملف.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">لوحة التحكم</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">بث حديث 2025</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span>🎬</span>
            <span>عرض التقديم</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {sections.find((s) => s.id === activeSection)?.name}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              تصدير JSON
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              استيراد JSON
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              إعادة تعيين
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeSection === 'dashboard' && (
            <DashboardSection
              totals={totals}
              onDownloadAllTemplates={downloadAllTemplates}
              onExportAll={exportAllCSV}
              onImportMultiple={handleMultipleCSVImport}
            />
          )}
          {activeSection === 'totals' && (
            <TotalsSection
              totals={totals}
              onUpdate={updateTotal}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
          {activeSection === 'platforms' && (
            <PlatformsSection
              platforms={platforms}
              onUpdate={updatePlatform}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
          {activeSection === 'programs' && (
            <ProgramsSection
              programs={programs}
              onUpdate={updateProgram}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
          {activeSection === 'watchtime' && (
            <WatchTimeSection
              watchTime={watchTime}
              onUpdate={updateWatchTime}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
          {activeSection === 'monthly' && (
            <MonthlySection
              programs={programs}
              programMonthlyData={programMonthlyData}
              onUpdate={updateProgramMonthly}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
          {activeSection === 'production' && (
            <ProductionSection
              programs={programs}
              productionData={productionData}
              onUpdate={updateProduction}
              onDownloadTemplate={downloadTemplate}
              onExport={exportCSV}
              onImport={handleCSVImport}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// CSV Actions Component
function CSVActions({
  sectionType,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  sectionType: string;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(sectionType, file);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onDownloadTemplate(sectionType)}
        className="px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs font-medium"
        title="تحميل قالب CSV فارغ"
      >
        📄 قالب CSV
      </button>
      <button
        onClick={() => onExport(sectionType)}
        className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs font-medium"
        title="تصدير البيانات الحالية كـ CSV"
      >
        📤 تصدير CSV
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
        title="استيراد بيانات من ملف CSV"
      >
        📥 استيراد CSV
      </button>
    </div>
  );
}

// Dashboard Section
function DashboardSection({
  totals,
  onDownloadAllTemplates,
  onExportAll,
  onImportMultiple,
}: {
  totals: any;
  onDownloadAllTemplates: () => void;
  onExportAll: () => void;
  onImportMultiple: (files: FileList) => void;
}) {
  const formatNum = (n: number) => n.toLocaleString('en-US');
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const handleMultiFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImportMultiple(files);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="إجمالي المشاهدات" value={formatNum(totals.viewsWithFacebook)} color="blue" />
        <StatCard title="إجمالي المتابعين" value={formatNum(totals.totalFollowers)} color="green" />
        <StatCard title="ساعات المشاهدة" value={formatNum(totals.totalWatchTimeHours)} color="red" />
        <StatCard title="تحميلات البودكاست" value={formatNum(totals.podcastDownloads)} color="purple" />
      </div>

      {/* CSV Bulk Operations */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">📦</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">إدارة CSV الشاملة</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">تحميل جميع القوالب أو تصدير/استيراد كل البيانات دفعة واحدة</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Download All Templates */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">📄</div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">قوالب CSV الفارغة</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">جميع القوالب (6 ملفات)</p>
            </div>
            <button
              onClick={onDownloadAllTemplates}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
            >
              تحميل جميع القوالب
            </button>
          </div>

          {/* Export All Data */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">📤</div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">تصدير كل البيانات</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">نسخة احتياطية كاملة</p>
            </div>
            <button
              onClick={onExportAll}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              تصدير الكل (CSV)
            </button>
          </div>

          {/* Import Multiple Files */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">📥</div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">استيراد عدة ملفات</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">اختر ملفات متعددة</p>
            </div>
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={handleMultiFileSelect}
              accept=".csv"
              multiple
              className="hidden"
            />
            <button
              onClick={() => multiFileInputRef.current?.click()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              استيراد ملفات CSV
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-500 text-lg">💡</span>
            <div className="text-xs text-yellow-800 dark:text-yellow-300">
              <p className="font-semibold mb-1">نصائح للاستيراد المتعدد:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>تأكد أن أسماء الملفات تحتوي على الكلمات المفتاحية (totals, platforms, programs, monthly, production, watchtime)</li>
                <li>يمكنك اختيار جميع الملفات دفعة واحدة من نافذة اختيار الملفات</li>
                <li>سيتم التعرف على نوع كل ملف تلقائياً من اسمه</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">ملخص سريع</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">عدد البرامج:</span>
            <span className="font-bold mr-2">{totals.programsCount}</span>
          </div>
          <div>
            <span className="text-gray-500">الدول:</span>
            <span className="font-bold mr-2">{totals.countriesReached}</span>
          </div>
          <div>
            <span className="text-gray-500">الحلقات:</span>
            <span className="font-bold mr-2">{totals.totalEpisodes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`rounded-xl p-4 border ${colorClasses[color]}`}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1" dir="ltr">
        {value}
      </p>
    </div>
  );
}

// Totals Section
function TotalsSection({
  totals,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  totals: any;
  onUpdate: (key: any, value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const fields = [
    { key: 'viewsWithFacebook', label: 'إجمالي المشاهدات (مع فيسبوك)', labelEn: 'viewsWithFacebook' },
    { key: 'viewsWithoutFacebook', label: 'إجمالي المشاهدات (بدون فيسبوك)', labelEn: 'viewsWithoutFacebook' },
    { key: 'totalFollowers', label: 'إجمالي المتابعين', labelEn: 'totalFollowers' },
    { key: 'newFollowers2025', label: 'المتابعين الجدد 2025', labelEn: 'newFollowers2025' },
    { key: 'podcastDownloads', label: 'تحميلات البودكاست', labelEn: 'podcastDownloads' },
    { key: 'countriesReached', label: 'عدد الدول', labelEn: 'countriesReached' },
    { key: 'programsCount', label: 'عدد البرامج', labelEn: 'programsCount' },
    { key: 'totalWatchTimeHours', label: 'ساعات المشاهدة', labelEn: 'totalWatchTimeHours' },
    { key: 'totalTikTokEngagement', label: 'تفاعل تيك توك', labelEn: 'totalTikTokEngagement' },
    { key: 'totalYoutubeVideos', label: 'مشاهدات الحلقات الطويلة', labelEn: 'totalYoutubeVideos' },
    { key: 'totalYoutubeShorts', label: 'مشاهدات الشورتس', labelEn: 'totalYoutubeShorts' },
    { key: 'postsCount2025', label: 'عدد المنشورات', labelEn: 'postsCount2025' },
    { key: 'totalEpisodes', label: 'عدد الحلقات', labelEn: 'totalEpisodes' },
    { key: 'totalFilmingHours', label: 'ساعات التصوير', labelEn: 'totalFilmingHours' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">الإجماليات الرئيسية</h3>
        <CSVActions
          sectionType="totals"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((field) => (
          <NumberInput
            key={field.key}
            label={field.label}
            labelEn={field.labelEn}
            value={totals[field.key]}
            onChange={(v) => onUpdate(field.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

// Platforms Section
function PlatformsSection({
  platforms,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  platforms: any;
  onUpdate: (platform: string, key: string, value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const platformKeys = ['youtube', 'tiktok', 'instagram', 'facebook'];
  const platformNames: Record<string, string> = {
    youtube: 'يوتيوب',
    tiktok: 'تيك توك',
    instagram: 'انستغرام',
    facebook: 'فيسبوك',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <CSVActions
          sectionType="platforms"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      {platformKeys.map((key) => {
        const platform = platforms[key];
        if (!platform) return null;

        return (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {platformNames[key]}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <NumberInput
                label="إجمالي المشاهدات"
                value={platform.totalViews || 0}
                onChange={(v) => onUpdate(key, 'totalViews', v)}
              />
              {key === 'youtube' ? (
                <>
                  <NumberInput
                    label="إجمالي المشتركين"
                    value={platform.totalSubscribers || 0}
                    onChange={(v) => onUpdate(key, 'totalSubscribers', v)}
                  />
                  <NumberInput
                    label="المشتركين الجدد"
                    value={platform.newSubscribers2025 || 0}
                    onChange={(v) => onUpdate(key, 'newSubscribers2025', v)}
                  />
                  <NumberInput
                    label="مشاهدات الحلقات"
                    value={platform.videosViews || 0}
                    onChange={(v) => onUpdate(key, 'videosViews', v)}
                  />
                  <NumberInput
                    label="مشاهدات الشورتس"
                    value={platform.shortsViews || 0}
                    onChange={(v) => onUpdate(key, 'shortsViews', v)}
                  />
                </>
              ) : (
                <>
                  <NumberInput
                    label="إجمالي المتابعين"
                    value={platform.totalFollowers || 0}
                    onChange={(v) => onUpdate(key, 'totalFollowers', v)}
                  />
                  <NumberInput
                    label="المتابعين الجدد"
                    value={platform.newFollowers2025 || 0}
                    onChange={(v) => onUpdate(key, 'newFollowers2025', v)}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Programs Section
function ProgramsSection({
  programs,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  programs: any[];
  onUpdate: (programId: string, path: string, value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <CSVActions
          sectionType="programs"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {programs.map((program) => (
          <button
            key={program.id}
            onClick={() => setSelectedProgram(program.id === selectedProgram ? null : program.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedProgram === program.id
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {program.name}
          </button>
        ))}
      </div>

      {selectedProgram && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          {(() => {
            const program = programs.find((p) => p.id === selectedProgram);
            if (!program) return null;

            return (
              <>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {program.name}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">الإجماليات</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <NumberInput
                        label="إجمالي المشاهدات"
                        value={program.totalViews}
                        onChange={(v) => onUpdate(program.id, 'totalViews', v)}
                      />
                      <NumberInput
                        label="المشاهدات (بدون FB)"
                        value={program.totalViewsNoFB}
                        onChange={(v) => onUpdate(program.id, 'totalViewsNoFB', v)}
                      />
                      <NumberInput
                        label="إجمالي المتابعين"
                        value={program.totalFollowers}
                        onChange={(v) => onUpdate(program.id, 'totalFollowers', v)}
                      />
                      <NumberInput
                        label="المتابعين الجدد"
                        value={program.newFollowers2025}
                        onChange={(v) => onUpdate(program.id, 'newFollowers2025', v)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {/* YouTube */}
                    <div>
                      <h4 className="text-sm font-medium text-red-500 mb-3">يوتيوب</h4>
                      <div className="space-y-3">
                        <NumberInput
                          label="المشاهدات"
                          value={program.youtube.views}
                          onChange={(v) => onUpdate(program.id, 'youtube.views', v)}
                        />
                        <NumberInput
                          label="المشتركين"
                          value={program.youtube.subscribers}
                          onChange={(v) => onUpdate(program.id, 'youtube.subscribers', v)}
                        />
                      </div>
                    </div>

                    {/* TikTok */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-3">تيك توك</h4>
                      <div className="space-y-3">
                        <NumberInput
                          label="المشاهدات"
                          value={program.tiktok.views}
                          onChange={(v) => onUpdate(program.id, 'tiktok.views', v)}
                        />
                        <NumberInput
                          label="المتابعين"
                          value={program.tiktok.followers}
                          onChange={(v) => onUpdate(program.id, 'tiktok.followers', v)}
                        />
                      </div>
                    </div>

                    {/* Instagram */}
                    <div>
                      <h4 className="text-sm font-medium text-pink-500 mb-3">انستغرام</h4>
                      <div className="space-y-3">
                        <NumberInput
                          label="المشاهدات"
                          value={program.instagram.views}
                          onChange={(v) => onUpdate(program.id, 'instagram.views', v)}
                        />
                        <NumberInput
                          label="المتابعين"
                          value={program.instagram.followers}
                          onChange={(v) => onUpdate(program.id, 'instagram.followers', v)}
                        />
                      </div>
                    </div>

                    {/* Facebook */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-500 mb-3">فيسبوك</h4>
                      <div className="space-y-3">
                        <NumberInput
                          label="المشاهدات"
                          value={program.facebook.views}
                          onChange={(v) => onUpdate(program.id, 'facebook.views', v)}
                        />
                        <NumberInput
                          label="المتابعين"
                          value={program.facebook.followers}
                          onChange={(v) => onUpdate(program.id, 'facebook.followers', v)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// Watch Time Section
function WatchTimeSection({
  watchTime,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  watchTime: any;
  onUpdate: (path: string, value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <CSVActions
          sectionType="watchtime"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">الإجمالي</h3>
        <NumberInput
          label="إجمالي ساعات المشاهدة"
          value={watchTime.total}
          onChange={(v) => onUpdate('total', v)}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">حسب البرنامج</h3>
        <div className="grid grid-cols-4 gap-4">
          {watchTime.byProgram.map((program: any, index: number) => (
            <NumberInput
              key={program.name}
              label={program.name}
              value={program.hours}
              onChange={(v) => onUpdate(`byProgram.${index}`, v)}
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">حسب الشهر</h3>
        <div className="grid grid-cols-4 gap-4">
          {watchTime.monthly.map((month: any, index: number) => (
            <NumberInput
              key={month.month}
              label={month.monthName}
              value={month.hours}
              onChange={(v) => onUpdate(`monthly.${index}`, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Monthly Section - Program Monthly Data (Table Format)
function MonthlySection({
  programs,
  programMonthlyData,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  programs: any[];
  programMonthlyData: Record<string, any[]>;
  onUpdate: (programId: string, monthIndex: number, key: any, value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState(programs[0]?.id || '');
  const [viewMode, setViewMode] = useState<'youtube' | 'tiktok' | 'followers'>('youtube');

  const monthlyData = programMonthlyData[selectedProgram] || [];

  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر'
  ];

  // Calculate totals
  const totals = {
    youtubeViews: monthlyData.reduce((sum, m) => sum + (m?.youtubeViews || 0), 0),
    youtubeVideos: monthlyData.reduce((sum, m) => sum + (m?.youtubeVideos || 0), 0),
    youtubeShorts: monthlyData.reduce((sum, m) => sum + (m?.youtubeShorts || 0), 0),
    youtubeWatchTime: monthlyData.reduce((sum, m) => sum + (m?.youtubeWatchTime || 0), 0),
    tiktokViews: monthlyData.reduce((sum, m) => sum + (m?.tiktokViews || 0), 0),
    tiktokEngagement: monthlyData.reduce((sum, m) => sum + (m?.tiktokEngagement || 0), 0),
    instagramViews: monthlyData.reduce((sum, m) => sum + (m?.instagramViews || 0), 0),
    newYoutubeSubscribers: monthlyData.reduce((sum, m) => sum + (m?.newYoutubeSubscribers || 0), 0),
    newTiktokFollowers: monthlyData.reduce((sum, m) => sum + (m?.newTiktokFollowers || 0), 0),
    newInstagramFollowers: monthlyData.reduce((sum, m) => sum + (m?.newInstagramFollowers || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <CSVActions
          sectionType="monthly"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اختر البرنامج</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('youtube')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'youtube'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              📺 يوتيوب
            </button>
            <button
              onClick={() => setViewMode('tiktok')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'tiktok'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              🎵 تيك توك + انستا
            </button>
            <button
              onClick={() => setViewMode('followers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'followers'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              👥 المتابعين
            </button>
          </div>
        </div>

        {/* YouTube Table */}
        {viewMode === 'youtube' && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-50 dark:bg-red-900/20">
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">الشهر</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b">المشاهدات</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b">الحلقات</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b">الشورتس</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b">ساعات المشاهدة</th>
                </tr>
              </thead>
              <tbody>
                {months.map((monthName, index) => {
                  const m = monthlyData[index] || {};
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">{monthName}</td>
                      <td className="px-2 py-1"><TableInput value={m.youtubeViews || 0} onChange={(v) => onUpdate(selectedProgram, index, 'youtubeViews', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.youtubeVideos || 0} onChange={(v) => onUpdate(selectedProgram, index, 'youtubeVideos', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.youtubeShorts || 0} onChange={(v) => onUpdate(selectedProgram, index, 'youtubeShorts', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.youtubeWatchTime || 0} onChange={(v) => onUpdate(selectedProgram, index, 'youtubeWatchTime', v)} /></td>
                    </tr>
                  );
                })}
                <tr className="bg-red-50 dark:bg-red-900/20 font-bold">
                  <td className="px-4 py-3 text-sm">الإجمالي</td>
                  <td className="px-4 py-3 text-center text-sm text-red-600">{totals.youtubeViews.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-red-600">{totals.youtubeVideos.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-red-600">{totals.youtubeShorts.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-red-600">{totals.youtubeWatchTime.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TikTok + Instagram Table */}
        {viewMode === 'tiktok' && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">الشهر</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-800 border-b">تيك توك (مشاهدات)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-800 border-b">تيك توك (تفاعل)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-pink-600 border-b">انستا (مشاهدات)</th>
                </tr>
              </thead>
              <tbody>
                {months.map((monthName, index) => {
                  const m = monthlyData[index] || {};
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">{monthName}</td>
                      <td className="px-2 py-1"><TableInput value={m.tiktokViews || 0} onChange={(v) => onUpdate(selectedProgram, index, 'tiktokViews', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.tiktokEngagement || 0} onChange={(v) => onUpdate(selectedProgram, index, 'tiktokEngagement', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.instagramViews || 0} onChange={(v) => onUpdate(selectedProgram, index, 'instagramViews', v)} /></td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                  <td className="px-4 py-3 text-sm">الإجمالي</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-800">{totals.tiktokViews.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-800">{totals.tiktokEngagement.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-pink-600">{totals.instagramViews.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Followers Table */}
        {viewMode === 'followers' && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">الشهر</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b">يوتيوب (مشتركين)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-800 border-b">تيك توك (متابعين)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-pink-600 border-b">انستا (متابعين)</th>
                </tr>
              </thead>
              <tbody>
                {months.map((monthName, index) => {
                  const m = monthlyData[index] || {};
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">{monthName}</td>
                      <td className="px-2 py-1"><TableInput value={m.newYoutubeSubscribers || 0} onChange={(v) => onUpdate(selectedProgram, index, 'newYoutubeSubscribers', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.newTiktokFollowers || 0} onChange={(v) => onUpdate(selectedProgram, index, 'newTiktokFollowers', v)} /></td>
                      <td className="px-2 py-1"><TableInput value={m.newInstagramFollowers || 0} onChange={(v) => onUpdate(selectedProgram, index, 'newInstagramFollowers', v)} /></td>
                    </tr>
                  );
                })}
                <tr className="bg-green-50 dark:bg-green-900/20 font-bold">
                  <td className="px-4 py-3 text-sm">الإجمالي</td>
                  <td className="px-4 py-3 text-center text-sm text-red-600">{totals.newYoutubeSubscribers.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-800">{totals.newTiktokFollowers.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-pink-600">{totals.newInstagramFollowers.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Table Input Component
function TableInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  const handleBlur = () => {
    setEditing(false);
    const num = parseFloat(tempValue.replace(/,/g, '')) || 0;
    onChange(num);
  };

  const handleFocus = () => {
    setEditing(true);
    setTempValue(value.toString());
  };

  return (
    <input
      type="text"
      value={editing ? tempValue : value.toLocaleString('en-US')}
      onChange={(e) => setTempValue(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="w-full px-2 py-1.5 text-center text-sm border-0 bg-transparent focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 rounded transition-all"
      dir="ltr"
    />
  );
}

// Production Section - Table Format
function ProductionSection({
  programs,
  productionData,
  onUpdate,
  onDownloadTemplate,
  onExport,
  onImport,
}: {
  programs: any[];
  productionData: Record<string, any[]>;
  onUpdate: (programId: string, monthIndex: number, key: 'episodes' | 'hours', value: number) => void;
  onDownloadTemplate: (type: string) => void;
  onExport: (type: string) => void;
  onImport: (type: string, file: File) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState(programs[0]?.id || '');

  const programProduction = productionData[selectedProgram] || [];

  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر'
  ];

  // Calculate totals
  const totalEpisodes = programProduction.reduce((sum, m) => sum + (m?.episodes || 0), 0);
  const totalHours = programProduction.reduce((sum, m) => sum + (m?.hours || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <CSVActions
          sectionType="production"
          onDownloadTemplate={onDownloadTemplate}
          onExport={onExport}
          onImport={onImport}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Header with Program Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اختر البرنامج</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">{totalEpisodes}</p>
              <p className="text-xs text-green-500">إجمالي الحلقات</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}</p>
              <p className="text-xs text-blue-500">ساعات التصوير</p>
            </div>
          </div>
        </div>

        {/* Production Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">الشهر</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-green-600 border-b dark:border-gray-600">عدد الحلقات</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-blue-600 border-b dark:border-gray-600">ساعات التصوير</th>
              </tr>
            </thead>
            <tbody>
              {months.map((monthName, index) => {
                const monthData = programProduction[index] || { episodes: 0, hours: 0 };
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">{monthName}</td>
                    <td className="px-2 py-1">
                      <TableInput
                        value={monthData.episodes}
                        onChange={(v) => onUpdate(selectedProgram, index, 'episodes', v)}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <TableInput
                        value={monthData.hours}
                        onChange={(v) => onUpdate(selectedProgram, index, 'hours', v)}
                      />
                    </td>
                  </tr>
                );
              })}
              {/* Totals Row */}
              <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">الإجمالي</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">{totalEpisodes}</td>
                <td className="px-4 py-3 text-center text-sm text-blue-600">{totalHours.toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
