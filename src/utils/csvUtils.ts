// CSV Utilities for Bath Hadeeth 2025 Report

// Month names in Arabic
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

// ============ CSV Generation ============

function escapeCSV(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function arrayToCSV(headers: string[], rows: (string | number)[][]): string {
  const headerLine = headers.map(escapeCSV).join(',');
  const dataLines = rows.map(row => row.map(escapeCSV).join(','));
  return [headerLine, ...dataLines].join('\n');
}

// ============ Template Generators ============

export function generateTotalsTemplate(): string {
  const headers = ['key', 'label_ar', 'value'];
  const rows = [
    ['viewsWithFacebook', 'إجمالي المشاهدات (مع فيسبوك)', 0],
    ['viewsWithoutFacebook', 'إجمالي المشاهدات (بدون فيسبوك)', 0],
    ['facebookViews', 'مشاهدات فيسبوك', 0],
    ['totalFollowers', 'إجمالي المتابعين', 0],
    ['newFollowers2025', 'المتابعين الجدد 2025', 0],
    ['podcastDownloads', 'تحميلات البودكاست', 0],
    ['countriesReached', 'عدد الدول', 0],
    ['programsCount', 'عدد البرامج', 0],
    ['totalWatchTimeHours', 'ساعات المشاهدة', 0],
    ['totalTikTokEngagement', 'تفاعل تيك توك', 0],
    ['totalYoutubeVideos', 'فيديوهات يوتيوب', 0],
    ['totalYoutubeShorts', 'شورتس يوتيوب', 0],
    ['postsCount2025', 'عدد المنشورات 2025', 0],
    ['totalEpisodes', 'عدد الحلقات', 0],
    ['totalFilmingHours', 'ساعات التصوير', 0],
  ];
  return arrayToCSV(headers, rows);
}

export function generatePlatformsTemplate(): string {
  const headers = ['platform', 'platform_ar', 'totalViews', 'videosViews', 'shortsViews', 'totalFollowers', 'newFollowers2025'];
  const rows = [
    ['youtube', 'يوتيوب', 0, 0, 0, 0, 0],
    ['tiktok', 'تيك توك', 0, 0, 0, 0, 0],
    ['instagram', 'انستغرام', 0, 0, 0, 0, 0],
    ['facebook', 'فيسبوك', 0, 0, 0, 0, 0],
  ];
  return arrayToCSV(headers, rows);
}

export function generateProgramsTemplate(programs: { id: string; name: string }[]): string {
  const headers = [
    'id', 'name',
    'totalViews', 'totalViewsNoFB', 'totalFollowers', 'newFollowers2025',
    'youtube_views', 'youtube_subscribers',
    'tiktok_views', 'tiktok_followers',
    'instagram_views', 'instagram_followers',
    'facebook_views', 'facebook_followers'
  ];
  const rows = programs.map(p => [
    p.id, p.name,
    0, 0, 0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0
  ]);
  return arrayToCSV(headers, rows);
}

export function generateMonthlyTemplate(programs: { id: string; name: string }[]): string {
  const headers = [
    'program_id', 'program_name', 'month', 'month_name',
    'youtubeViews', 'youtubeVideos', 'youtubeShorts', 'youtubeWatchTime',
    'tiktokViews', 'tiktokEngagement', 'instagramViews',
    'newYoutubeSubscribers', 'newTiktokFollowers', 'newInstagramFollowers'
  ];
  const rows: (string | number)[][] = [];

  programs.forEach(program => {
    for (let month = 0; month < 11; month++) {
      rows.push([
        program.id, program.name, month + 1, MONTHS_AR[month],
        0, 0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]);
    }
  });

  return arrayToCSV(headers, rows);
}

export function generateProductionTemplate(programs: { id: string; name: string }[]): string {
  const headers = ['program_id', 'program_name', 'month', 'month_name', 'episodes', 'hours'];
  const rows: (string | number)[][] = [];

  programs.forEach(program => {
    for (let month = 0; month < 11; month++) {
      rows.push([program.id, program.name, month + 1, MONTHS_AR[month], 0, 0]);
    }
  });

  return arrayToCSV(headers, rows);
}

export function generateWatchTimeTemplate(programs: { name: string }[]): string {
  const headers = ['program_name', 'hours'];
  const rows = programs.map(p => [p.name, 0]);
  return arrayToCSV(headers, rows);
}

// ============ Data Export ============

export function exportTotalsToCSV(totals: Record<string, number>): string {
  const headers = ['key', 'label_ar', 'value'];
  const labels: Record<string, string> = {
    viewsWithFacebook: 'إجمالي المشاهدات (مع فيسبوك)',
    viewsWithoutFacebook: 'إجمالي المشاهدات (بدون فيسبوك)',
    facebookViews: 'مشاهدات فيسبوك',
    totalFollowers: 'إجمالي المتابعين',
    newFollowers2025: 'المتابعين الجدد 2025',
    podcastDownloads: 'تحميلات البودكاست',
    countriesReached: 'عدد الدول',
    programsCount: 'عدد البرامج',
    totalWatchTimeHours: 'ساعات المشاهدة',
    totalTikTokEngagement: 'تفاعل تيك توك',
    totalYoutubeVideos: 'فيديوهات يوتيوب',
    totalYoutubeShorts: 'شورتس يوتيوب',
    postsCount2025: 'عدد المنشورات 2025',
    totalEpisodes: 'عدد الحلقات',
    totalFilmingHours: 'ساعات التصوير',
  };
  const rows = Object.entries(totals).map(([key, value]) => [key, labels[key] || key, value]);
  return arrayToCSV(headers, rows);
}

export function exportPlatformsToCSV(platforms: Record<string, any>): string {
  const headers = ['platform', 'platform_ar', 'totalViews', 'videosViews', 'shortsViews', 'totalFollowers', 'newFollowers2025'];
  const rows = Object.entries(platforms).map(([key, p]) => [
    key,
    p.nameAr,
    p.totalViews || 0,
    p.videosViews || 0,
    p.shortsViews || 0,
    p.totalFollowers || p.totalSubscribers || 0,
    p.newFollowers2025 || p.newSubscribers2025 || 0
  ]);
  return arrayToCSV(headers, rows);
}

export function exportProgramsToCSV(programs: any[]): string {
  const headers = [
    'id', 'name',
    'totalViews', 'totalViewsNoFB', 'totalFollowers', 'newFollowers2025',
    'youtube_views', 'youtube_subscribers',
    'tiktok_views', 'tiktok_followers',
    'instagram_views', 'instagram_followers',
    'facebook_views', 'facebook_followers'
  ];
  const rows = programs.map(p => [
    p.id, p.name,
    p.totalViews, p.totalViewsNoFB, p.totalFollowers, p.newFollowers2025,
    p.youtube?.views || 0, p.youtube?.subscribers || 0,
    p.tiktok?.views || 0, p.tiktok?.followers || 0,
    p.instagram?.views || 0, p.instagram?.followers || 0,
    p.facebook?.views || 0, p.facebook?.followers || 0
  ]);
  return arrayToCSV(headers, rows);
}

export function exportMonthlyToCSV(programs: any[], monthlyData: Record<string, any[]>): string {
  const headers = [
    'program_id', 'program_name', 'month', 'month_name',
    'youtubeViews', 'youtubeVideos', 'youtubeShorts', 'youtubeWatchTime',
    'tiktokViews', 'tiktokEngagement', 'instagramViews',
    'newYoutubeSubscribers', 'newTiktokFollowers', 'newInstagramFollowers'
  ];
  const rows: (string | number)[][] = [];

  programs.forEach(program => {
    const data = monthlyData[program.id] || [];
    for (let month = 0; month < 11; month++) {
      const m = data[month] || {};
      rows.push([
        program.id, program.name, month + 1, MONTHS_AR[month],
        m.youtubeViews || 0, m.youtubeVideos || 0, m.youtubeShorts || 0, m.youtubeWatchTime || 0,
        m.tiktokViews || 0, m.tiktokEngagement || 0, m.instagramViews || 0,
        m.newYoutubeSubscribers || 0, m.newTiktokFollowers || 0, m.newInstagramFollowers || 0
      ]);
    }
  });

  return arrayToCSV(headers, rows);
}

export function exportProductionToCSV(programs: any[], productionData: Record<string, any[]>): string {
  const headers = ['program_id', 'program_name', 'month', 'month_name', 'episodes', 'hours'];
  const rows: (string | number)[][] = [];

  programs.forEach(program => {
    const data = productionData[program.id] || [];
    for (let month = 0; month < 11; month++) {
      const m = data[month] || {};
      rows.push([program.id, program.name, month + 1, MONTHS_AR[month], m.episodes || 0, m.hours || 0]);
    }
  });

  return arrayToCSV(headers, rows);
}

export function exportWatchTimeToCSV(watchTime: { byProgram: { name: string; hours: number }[] }): string {
  const headers = ['program_name', 'hours'];
  const rows = watchTime.byProgram.map(p => [p.name, p.hours]);
  return arrayToCSV(headers, rows);
}

// ============ CSV Parsing ============

function parseCSV(csvString: string): { headers: string[]; rows: string[][] } {
  const lines = csvString.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);
  return { headers, rows };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current);

  return result;
}

// ============ Data Import ============

export function importTotalsFromCSV(csvString: string): Record<string, number> | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const keyIndex = headers.indexOf('key');
    const valueIndex = headers.indexOf('value');

    if (keyIndex === -1 || valueIndex === -1) return null;

    const totals: Record<string, number> = {};
    rows.forEach(row => {
      const key = row[keyIndex];
      const value = parseFloat(row[valueIndex]) || 0;
      if (key) totals[key] = value;
    });

    return totals;
  } catch {
    return null;
  }
}

export function importPlatformsFromCSV(csvString: string): Record<string, any> | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const getIndex = (name: string) => headers.indexOf(name);

    const platforms: Record<string, any> = {};
    rows.forEach(row => {
      const platform = row[getIndex('platform')];
      if (!platform) return;

      platforms[platform] = {
        totalViews: parseFloat(row[getIndex('totalViews')]) || 0,
        videosViews: parseFloat(row[getIndex('videosViews')]) || 0,
        shortsViews: parseFloat(row[getIndex('shortsViews')]) || 0,
        totalFollowers: parseFloat(row[getIndex('totalFollowers')]) || 0,
        totalSubscribers: parseFloat(row[getIndex('totalFollowers')]) || 0,
        newFollowers2025: parseFloat(row[getIndex('newFollowers2025')]) || 0,
        newSubscribers2025: parseFloat(row[getIndex('newFollowers2025')]) || 0,
      };
    });

    return platforms;
  } catch {
    return null;
  }
}

export function importProgramsFromCSV(csvString: string): any[] | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const getIndex = (name: string) => headers.indexOf(name);

    return rows.map(row => ({
      id: row[getIndex('id')],
      name: row[getIndex('name')],
      nameEn: row[getIndex('id')],
      totalViews: parseFloat(row[getIndex('totalViews')]) || 0,
      totalViewsNoFB: parseFloat(row[getIndex('totalViewsNoFB')]) || 0,
      totalFollowers: parseFloat(row[getIndex('totalFollowers')]) || 0,
      newFollowers2025: parseFloat(row[getIndex('newFollowers2025')]) || 0,
      youtube: {
        views: parseFloat(row[getIndex('youtube_views')]) || 0,
        subscribers: parseFloat(row[getIndex('youtube_subscribers')]) || 0,
      },
      tiktok: {
        views: parseFloat(row[getIndex('tiktok_views')]) || 0,
        followers: parseFloat(row[getIndex('tiktok_followers')]) || 0,
      },
      instagram: {
        views: parseFloat(row[getIndex('instagram_views')]) || 0,
        followers: parseFloat(row[getIndex('instagram_followers')]) || 0,
      },
      facebook: {
        views: parseFloat(row[getIndex('facebook_views')]) || 0,
        followers: parseFloat(row[getIndex('facebook_followers')]) || 0,
      },
    })).filter(p => p.id);
  } catch {
    return null;
  }
}

export function importMonthlyFromCSV(csvString: string): Record<string, any[]> | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const getIndex = (name: string) => headers.indexOf(name);

    const monthlyData: Record<string, any[]> = {};

    rows.forEach(row => {
      const programId = row[getIndex('program_id')];
      const month = parseInt(row[getIndex('month')]) - 1;

      if (!programId || month < 0 || month > 10) return;

      if (!monthlyData[programId]) {
        monthlyData[programId] = Array(11).fill(null).map((_, i) => ({
          month: i + 1,
          youtubeViews: 0, youtubeVideos: 0, youtubeShorts: 0, youtubeWatchTime: 0,
          tiktokViews: 0, tiktokEngagement: 0, instagramViews: 0,
          newYoutubeSubscribers: 0, newTiktokFollowers: 0, newInstagramFollowers: 0,
          totalViews: 0, totalNewFollowers: 0
        }));
      }

      monthlyData[programId][month] = {
        month: month + 1,
        youtubeViews: parseFloat(row[getIndex('youtubeViews')]) || 0,
        youtubeVideos: parseFloat(row[getIndex('youtubeVideos')]) || 0,
        youtubeShorts: parseFloat(row[getIndex('youtubeShorts')]) || 0,
        youtubeWatchTime: parseFloat(row[getIndex('youtubeWatchTime')]) || 0,
        tiktokViews: parseFloat(row[getIndex('tiktokViews')]) || 0,
        tiktokEngagement: parseFloat(row[getIndex('tiktokEngagement')]) || 0,
        instagramViews: parseFloat(row[getIndex('instagramViews')]) || 0,
        newYoutubeSubscribers: parseFloat(row[getIndex('newYoutubeSubscribers')]) || 0,
        newTiktokFollowers: parseFloat(row[getIndex('newTiktokFollowers')]) || 0,
        newInstagramFollowers: parseFloat(row[getIndex('newInstagramFollowers')]) || 0,
        totalViews: 0,
        totalNewFollowers: 0,
      };
    });

    return monthlyData;
  } catch {
    return null;
  }
}

export function importProductionFromCSV(csvString: string): Record<string, any[]> | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const getIndex = (name: string) => headers.indexOf(name);

    const productionData: Record<string, any[]> = {};

    rows.forEach(row => {
      const programId = row[getIndex('program_id')];
      const month = parseInt(row[getIndex('month')]) - 1;

      if (!programId || month < 0 || month > 10) return;

      if (!productionData[programId]) {
        productionData[programId] = Array(11).fill(null).map((_, i) => ({
          month: i + 1, episodes: 0, hours: 0
        }));
      }

      productionData[programId][month] = {
        month: month + 1,
        episodes: parseFloat(row[getIndex('episodes')]) || 0,
        hours: parseFloat(row[getIndex('hours')]) || 0,
      };
    });

    return productionData;
  } catch {
    return null;
  }
}

export function importWatchTimeFromCSV(csvString: string): { name: string; hours: number }[] | null {
  try {
    const { headers, rows } = parseCSV(csvString);
    const nameIndex = headers.indexOf('program_name');
    const hoursIndex = headers.indexOf('hours');

    if (nameIndex === -1 || hoursIndex === -1) return null;

    return rows.map(row => ({
      name: row[nameIndex],
      hours: parseFloat(row[hoursIndex]) || 0
    })).filter(p => p.name);
  } catch {
    return null;
  }
}

// ============ Download Helper ============

export function downloadCSV(content: string, filename: string): void {
  // Add BOM for Excel Arabic support
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============ Read File Helper ============

export function readCSVFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });
}
