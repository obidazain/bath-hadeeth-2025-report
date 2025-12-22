// Production data for 2025 - extracted from Master Sheet CSV
// بيانات الإنتاج لعام 2025

export interface MonthlyProduction {
  month: number;
  monthName: string;
  episodes: number;
  hours: number;
}

export interface ProgramProduction {
  id: string;
  name: string;
  monthly: MonthlyProduction[];
  totalEpisodes: number;
  totalHours: number;
}

export const productionData: ProgramProduction[] = [
  {
    id: 'sharq',
    name: 'بودكاست الشرق',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 5, hours: 11.72 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 9.39 },
      { month: 3, monthName: 'مارس', episodes: 1, hours: 1.39 },
      { month: 4, monthName: 'أبريل', episodes: 1, hours: 2.32 },
      { month: 5, monthName: 'مايو', episodes: 4, hours: 7.02 },
      { month: 6, monthName: 'يونيو', episodes: 2, hours: 6.49 },
      { month: 7, monthName: 'يوليو', episodes: 4, hours: 7.68 },
      { month: 8, monthName: 'أغسطس', episodes: 4, hours: 9.79 },
      { month: 9, monthName: 'سبتمبر', episodes: 3, hours: 8.68 },
      { month: 10, monthName: 'أكتوبر', episodes: 4, hours: 12.96 },
      { month: 11, monthName: 'نوفمبر', episodes: 3, hours: 6.42 },
    ],
    totalEpisodes: 35,
    totalHours: 83.86,
  },
  {
    id: 'shahada',
    name: 'شهادة',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 5, hours: 2.66 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 3.64 },
      { month: 3, monthName: 'مارس', episodes: 1, hours: 0.95 },
      { month: 4, monthName: 'أبريل', episodes: 3, hours: 2.40 },
      { month: 5, monthName: 'مايو', episodes: 5, hours: 3.52 },
      { month: 6, monthName: 'يونيو', episodes: 3, hours: 2.39 },
      { month: 7, monthName: 'يوليو', episodes: 3, hours: 2.07 },
      { month: 8, monthName: 'أغسطس', episodes: 2, hours: 1.67 },
      { month: 9, monthName: 'سبتمبر', episodes: 4, hours: 2.46 },
      { month: 10, monthName: 'أكتوبر', episodes: 5, hours: 3.75 },
      { month: 11, monthName: 'نوفمبر', episodes: 4, hours: 2.79 },
    ],
    totalEpisodes: 39,
    totalHours: 28.30,
  },
  {
    id: 'ihata',
    name: 'إحاطة',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 7, hours: 3.73 },
      { month: 2, monthName: 'فبراير', episodes: 6, hours: 3.21 },
      { month: 3, monthName: 'مارس', episodes: 7, hours: 3.85 },
      { month: 4, monthName: 'أبريل', episodes: 5, hours: 3.12 },
      { month: 5, monthName: 'مايو', episodes: 6, hours: 4.15 },
      { month: 6, monthName: 'يونيو', episodes: 11, hours: 7.60 },
      { month: 7, monthName: 'يوليو', episodes: 8, hours: 5.06 },
      { month: 8, monthName: 'أغسطس', episodes: 7, hours: 4.47 },
      { month: 9, monthName: 'سبتمبر', episodes: 11, hours: 6.91 },
      { month: 10, monthName: 'أكتوبر', episodes: 10, hours: 6.50 },
      { month: 11, monthName: 'نوفمبر', episodes: 9, hours: 6.63 },
    ],
    totalEpisodes: 87,
    totalHours: 55.23,
  },
  {
    id: 'yemen',
    name: 'اليمن',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 2, hours: 3.26 },
      { month: 2, monthName: 'فبراير', episodes: 1, hours: 1.63 },
      { month: 3, monthName: 'مارس', episodes: 2, hours: 2.69 },
      { month: 4, monthName: 'أبريل', episodes: 2, hours: 4.75 },
      { month: 5, monthName: 'مايو', episodes: 1, hours: 3.39 },
      { month: 6, monthName: 'يونيو', episodes: 2, hours: 3.49 },
      { month: 7, monthName: 'يوليو', episodes: 2, hours: 3.95 },
      { month: 8, monthName: 'أغسطس', episodes: 1, hours: 2.04 },
      { month: 9, monthName: 'سبتمبر', episodes: 2, hours: 4.00 },
      { month: 10, monthName: 'أكتوبر', episodes: 2, hours: 2.45 },
      { month: 11, monthName: 'نوفمبر', episodes: 4, hours: 6.63 },
    ],
    totalEpisodes: 21,
    totalHours: 38.28,
  },
  {
    id: 'syria',
    name: 'سوريا',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 3, hours: 6.13 },
      { month: 2, monthName: 'فبراير', episodes: 2, hours: 3.59 },
      { month: 3, monthName: 'مارس', episodes: 4, hours: 7.18 },
      { month: 4, monthName: 'أبريل', episodes: 1, hours: 1.00 },
      { month: 5, monthName: 'مايو', episodes: 4, hours: 7.02 },
      { month: 6, monthName: 'يونيو', episodes: 3, hours: 6.17 },
      { month: 7, monthName: 'يوليو', episodes: 1, hours: 1.51 },
      { month: 8, monthName: 'أغسطس', episodes: 0, hours: 0.00 },
      { month: 9, monthName: 'سبتمبر', episodes: 1, hours: 1.79 },
      { month: 10, monthName: 'أكتوبر', episodes: 0, hours: 0.00 },
      { month: 11, monthName: 'نوفمبر', episodes: 0, hours: 0.00 },
    ],
    totalEpisodes: 19,
    totalHours: 34.39,
  },
  {
    id: 'sudan',
    name: 'السودان',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 5, hours: 7.31 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 8.49 },
      { month: 3, monthName: 'مارس', episodes: 1, hours: 1.04 },
      { month: 4, monthName: 'أبريل', episodes: 4, hours: 8.11 },
      { month: 5, monthName: 'مايو', episodes: 1, hours: 2.31 },
      { month: 6, monthName: 'يونيو', episodes: 1, hours: 1.39 },
      { month: 7, monthName: 'يوليو', episodes: 3, hours: 11.24 },
      { month: 8, monthName: 'أغسطس', episodes: 2, hours: 3.09 },
      { month: 9, monthName: 'سبتمبر', episodes: 1, hours: 2.39 },
      { month: 10, monthName: 'أكتوبر', episodes: 2, hours: 4.52 },
      { month: 11, monthName: 'نوفمبر', episodes: 4, hours: 7.83 },
    ],
    totalEpisodes: 28,
    totalHours: 57.72,
  },
  {
    id: 'duetto',
    name: 'الدويتو',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 4, hours: 3.80 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 3.30 },
      { month: 3, monthName: 'مارس', episodes: 0, hours: 0.00 },
      { month: 4, monthName: 'أبريل', episodes: 4, hours: 3.28 },
      { month: 5, monthName: 'مايو', episodes: 5, hours: 4.92 },
      { month: 6, monthName: 'يونيو', episodes: 3, hours: 3.15 },
      { month: 7, monthName: 'يوليو', episodes: 5, hours: 4.07 },
      { month: 8, monthName: 'أغسطس', episodes: 2, hours: 1.09 },
      { month: 9, monthName: 'سبتمبر', episodes: 5, hours: 4.10 },
      { month: 10, monthName: 'أكتوبر', episodes: 4, hours: 4.40 },
      { month: 11, monthName: 'نوفمبر', episodes: 4, hours: 5.46 },
    ],
    totalEpisodes: 40,
    totalHours: 37.57,
  },
  {
    id: 'iran',
    name: 'إيران',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 5, hours: 9.43 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 6.92 },
      { month: 3, monthName: 'مارس', episodes: 0, hours: 0.00 },
      { month: 4, monthName: 'أبريل', episodes: 4, hours: 9.40 },
      { month: 5, monthName: 'مايو', episodes: 3, hours: 5.05 },
      { month: 6, monthName: 'يونيو', episodes: 2, hours: 3.93 },
      { month: 7, monthName: 'يوليو', episodes: 1, hours: 1.77 },
      { month: 8, monthName: 'أغسطس', episodes: 2, hours: 3.34 },
      { month: 9, monthName: 'سبتمبر', episodes: 3, hours: 5.34 },
      { month: 10, monthName: 'أكتوبر', episodes: 2, hours: 4.29 },
      { month: 11, monthName: 'نوفمبر', episodes: 0, hours: 0.00 },
    ],
    totalEpisodes: 26,
    totalHours: 49.47,
  },
  {
    id: 'bast',
    name: 'بسط',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 2, hours: 2.42 },
      { month: 2, monthName: 'فبراير', episodes: 2, hours: 3.27 },
      { month: 3, monthName: 'مارس', episodes: 5, hours: 7.51 },
      { month: 4, monthName: 'أبريل', episodes: 2, hours: 3.81 },
      { month: 5, monthName: 'مايو', episodes: 2, hours: 3.26 },
      { month: 6, monthName: 'يونيو', episodes: 2, hours: 2.54 },
      { month: 7, monthName: 'يوليو', episodes: 0, hours: 0.00 },
      { month: 8, monthName: 'أغسطس', episodes: 0, hours: 0.00 },
      { month: 9, monthName: 'سبتمبر', episodes: 0, hours: 0.00 },
      { month: 10, monthName: 'أكتوبر', episodes: 0, hours: 0.00 },
      { month: 11, monthName: 'نوفمبر', episodes: 0, hours: 0.00 },
    ],
    totalEpisodes: 15,
    totalHours: 22.81,
  },
  {
    id: 'ghada',
    name: 'غادة',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 2, hours: 1.15 },
      { month: 2, monthName: 'فبراير', episodes: 3, hours: 1.34 },
      { month: 3, monthName: 'مارس', episodes: 0, hours: 0.00 },
      { month: 4, monthName: 'أبريل', episodes: 0, hours: 0.00 },
      { month: 5, monthName: 'مايو', episodes: 0, hours: 0.00 },
      { month: 6, monthName: 'يونيو', episodes: 0, hours: 0.00 },
      { month: 7, monthName: 'يوليو', episodes: 0, hours: 0.00 },
      { month: 8, monthName: 'أغسطس', episodes: 0, hours: 0.00 },
      { month: 9, monthName: 'سبتمبر', episodes: 0, hours: 0.00 },
      { month: 10, monthName: 'أكتوبر', episodes: 0, hours: 0.00 },
      { month: 11, monthName: 'نوفمبر', episodes: 0, hours: 0.00 },
    ],
    totalEpisodes: 5,
    totalHours: 2.49,
  },
  {
    id: 'arabi-post',
    name: 'عربي بوست',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 3, hours: 3.69 },
      { month: 2, monthName: 'فبراير', episodes: 4, hours: 5.64 },
      { month: 3, monthName: 'مارس', episodes: 2, hours: 2.45 },
      { month: 4, monthName: 'أبريل', episodes: 3, hours: 4.63 },
      { month: 5, monthName: 'مايو', episodes: 7, hours: 10.70 },
      { month: 6, monthName: 'يونيو', episodes: 5, hours: 7.02 },
      { month: 7, monthName: 'يوليو', episodes: 2, hours: 3.14 },
      { month: 8, monthName: 'أغسطس', episodes: 2, hours: 2.43 },
      { month: 9, monthName: 'سبتمبر', episodes: 4, hours: 6.54 },
      { month: 10, monthName: 'أكتوبر', episodes: 8, hours: 10.93 },
      { month: 11, monthName: 'نوفمبر', episodes: 9, hours: 13.09 },
    ],
    totalEpisodes: 49,
    totalHours: 70.26,
  },
  {
    id: 'malaz',
    name: 'ملاذ',
    monthly: [
      { month: 1, monthName: 'يناير', episodes: 1, hours: 1.33 },
      { month: 2, monthName: 'فبراير', episodes: 1, hours: 1.09 },
      { month: 3, monthName: 'مارس', episodes: 0, hours: 0.00 },
      { month: 4, monthName: 'أبريل', episodes: 1, hours: 1.22 },
      { month: 5, monthName: 'مايو', episodes: 1, hours: 1.08 },
      { month: 6, monthName: 'يونيو', episodes: 0, hours: 0.00 },
      { month: 7, monthName: 'يوليو', episodes: 0, hours: 0.00 },
      { month: 8, monthName: 'أغسطس', episodes: 0, hours: 0.00 },
      { month: 9, monthName: 'سبتمبر', episodes: 0, hours: 0.00 },
      { month: 10, monthName: 'أكتوبر', episodes: 0, hours: 0.00 },
      { month: 11, monthName: 'نوفمبر', episodes: 0, hours: 0.00 },
    ],
    totalEpisodes: 4,
    totalHours: 4.72,
  },
];

// Summary statistics
export const productionSummary = {
  totalEpisodes: productionData.reduce((sum, p) => sum + p.totalEpisodes, 0),
  totalHours: productionData.reduce((sum, p) => sum + p.totalHours, 0),
  activePrograms: productionData.filter(p => p.totalEpisodes > 0).length,
  monthsCovered: 11, // Jan-Nov 2025
};

// Monthly totals across all programs
export const monthlyTotals = Array.from({ length: 11 }, (_, i) => {
  const month = i + 1;
  const monthName = productionData[0]?.monthly[i]?.monthName || '';
  const episodes = productionData.reduce((sum, p) => sum + (p.monthly[i]?.episodes || 0), 0);
  const hours = productionData.reduce((sum, p) => sum + (p.monthly[i]?.hours || 0), 0);
  return { month, monthName, episodes, hours };
});
