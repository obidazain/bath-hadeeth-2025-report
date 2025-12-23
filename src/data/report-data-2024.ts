// Bath Hadeeth 2024 Annual Report Data
// Source: /Users/obidazain/Downloads/Presentation/تقرير بث حديث 2024/

export const reportData2024 = {
  // Overall Totals
  totals: {
    totalViews: 717152811,
    totalFollowers: 2995654,
    newFollowers: 2495784,
  },

  // Platform-specific data
  platforms: {
    youtube: {
      nameAr: 'يوتيوب',
      totalViews: 268408988,
      totalSubscribers: 1208959,
      shorts: 222957622,  // مقاطع قصيرة
      videos: 45451366,   // حلقات طويلة
    },
    tiktok: {
      nameAr: 'تيك توك',
      totalViews: 302209377,
      totalFollowers: 1212474,
    },
    instagram: {
      nameAr: 'انستغرام',
      totalViews: 146534446,
      totalFollowers: 574221,
    },
    facebook: {
      nameAr: 'فيسبوك',
      totalViews: 0, // Facebook was in testing phase in 2024
      totalFollowers: 0,
      note: 'تجريبي - لم يُطلق رسمياً',
    },
  },

  // Programs data (11 programs in 2024)
  programs: [
    {
      id: 'shahada',
      name: 'شهادة',
      totalViews: 148433570,
      followers: 563716,
      youtube: 73899059,
      tiktok: 56486167,
      instagram: 18048344,
    },
    {
      id: 'syria',
      name: 'سوريا',
      totalViews: 136459668,
      followers: 402452,
      youtube: 69740634,
      tiktok: 44150095,
      instagram: 22568939,
    },
    {
      id: 'duetto',
      name: 'الدويتو',
      totalViews: 134811797,
      followers: 429481,
      youtube: 36348926,
      tiktok: 74444508,
      instagram: 24018363,
    },
    {
      id: 'yemen',
      name: 'اليمن',
      totalViews: 120466389,
      followers: 401736,
      youtube: 1920044,
      tiktok: 71707661,
      instagram: 46838684,
    },
    {
      id: 'sudan',
      name: 'السودان',
      totalViews: 22416213,
      followers: 227851,
      youtube: 3831275,
      tiktok: 15500000,
      instagram: 3084938,
    },
    {
      id: 'ghada',
      name: 'غادة',
      totalViews: 19863199,
      followers: 91388,
      youtube: 6604843,
      tiktok: 3993579,
      instagram: 9264777,
    },
    {
      id: 'bast',
      name: 'بسط',
      totalViews: 16039226,
      followers: 151639,
      youtube: 6199735,
      tiktok: 4099000,
      instagram: 5740491,
    },
    {
      id: 'iraq',
      name: 'العراق',
      totalViews: 15119957,
      followers: 85347,
      youtube: 333591,
      tiktok: 8996367,
      instagram: 5789999,
    },
    {
      id: 'malaz',
      name: 'ملاذ',
      totalViews: 15020997,
      followers: 132856,
      youtube: 4223512,
      tiktok: 3067800,
      instagram: 7729685,
    },
    {
      id: 'ihata',
      name: 'إحاطة',
      totalViews: 7311559,
      followers: 65444,
      youtube: 3473364,
      tiktok: 2471200,
      instagram: 1366995,
    },
    {
      id: 'iran',
      name: 'إيران',
      totalViews: 350354,
      followers: 5876,
      youtube: 36644,
      tiktok: 293000,
      instagram: 20710,
    },
  ],
};

// Helper function to calculate growth percentage
export function calculateGrowth(value2024: number, value2025: number): number {
  if (value2024 === 0) return value2025 > 0 ? 100 : 0;
  return ((value2025 - value2024) / value2024) * 100;
}

// Helper function to format growth as string
export function formatGrowth(growth: number): string {
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth.toFixed(1)}%`;
}
