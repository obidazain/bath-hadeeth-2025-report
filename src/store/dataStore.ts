import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { reportData, programMonthlyData } from '../data/report-data';
import type { ProgramMonthlyData } from '../data/report-data';
import { productionData } from '../data/production-data';

// Types
interface Totals {
  viewsWithFacebook: number;
  viewsWithoutFacebook: number;
  facebookViews: number;
  totalFollowers: number;
  newFollowers2025: number;
  podcastDownloads: number;
  countriesReached: number;
  programsCount: number;
  totalWatchTimeHours: number;
  totalTikTokEngagement: number;
  totalYoutubeVideos: number;
  totalYoutubeShorts: number;
  postsCount2025: number;
  totalEpisodes: number;
  totalFilmingHours: number;
}

interface PlatformData {
  name: string;
  nameAr: string;
  color: string;
  totalViews: number;
  totalFollowers?: number;
  totalSubscribers?: number;
  newFollowers2025?: number;
  newSubscribers2025?: number;
  videosViews?: number;
  shortsViews?: number;
}

interface Program {
  id: string;
  name: string;
  nameEn: string;
  totalViews: number;
  totalViewsNoFB: number;
  totalFollowers: number;
  newFollowers2025: number;
  youtube: { views: number; subscribers: number };
  tiktok: { views: number; followers: number };
  instagram: { views: number; followers: number };
  facebook: { views: number; followers: number };
}

interface WatchTimeData {
  total: number;
  byProgram: { name: string; hours: number }[];
  monthly: { month: number; monthName: string; hours: number }[];
}

interface DataState {
  // Data
  totals: Totals;
  platforms: Record<string, PlatformData>;
  programs: Program[];
  programMonthlyData: Record<string, ProgramMonthlyData[]>;
  watchTime: WatchTimeData;
  productionData: Record<string, { month: number; episodes: number; hours: number }[]>;

  // Actions
  updateTotal: (key: keyof Totals, value: number) => void;
  updatePlatform: (platform: string, key: string, value: number) => void;
  updateProgram: (programId: string, path: string, value: number) => void;
  updateProgramMonthly: (programId: string, monthIndex: number, key: keyof ProgramMonthlyData, value: number) => void;
  updateWatchTime: (path: string, value: number) => void;
  updateProduction: (programId: string, monthIndex: number, key: 'episodes' | 'hours', value: number) => void;

  // Import/Export
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  resetToDefault: () => void;
}

// Initial data from report-data.ts
const getInitialData = () => ({
  totals: { ...reportData.totals },
  platforms: JSON.parse(JSON.stringify(reportData.platforms)),
  programs: JSON.parse(JSON.stringify(reportData.programs)),
  programMonthlyData: JSON.parse(JSON.stringify(programMonthlyData)),
  watchTime: JSON.parse(JSON.stringify(reportData.watchTime)),
  productionData: JSON.parse(JSON.stringify(productionData)),
});

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      // Initial data
      ...getInitialData(),

      // Update totals
      updateTotal: (key, value) => {
        set((state) => ({
          totals: { ...state.totals, [key]: value },
        }));
      },

      // Update platform data
      updatePlatform: (platform, key, value) => {
        set((state) => ({
          platforms: {
            ...state.platforms,
            [platform]: { ...state.platforms[platform], [key]: value },
          },
        }));
      },

      // Update program data (supports nested paths like "youtube.views")
      updateProgram: (programId, path, value) => {
        set((state) => {
          const programs = [...state.programs];
          const index = programs.findIndex((p) => p.id === programId);
          if (index === -1) return state;

          const program = { ...programs[index] };
          const keys = path.split('.');

          if (keys.length === 1) {
            (program as any)[keys[0]] = value;
          } else if (keys.length === 2) {
            (program as any)[keys[0]] = {
              ...(program as any)[keys[0]],
              [keys[1]]: value,
            };
          }

          programs[index] = program;
          return { programs };
        });
      },

      // Update program monthly data
      updateProgramMonthly: (programId, monthIndex, key, value) => {
        set((state) => {
          const data = { ...state.programMonthlyData };
          if (!data[programId]) return state;

          const months = [...data[programId]];
          months[monthIndex] = { ...months[monthIndex], [key]: value };
          data[programId] = months;

          return { programMonthlyData: data };
        });
      },

      // Update watch time data
      updateWatchTime: (path, value) => {
        set((state) => {
          const watchTime = { ...state.watchTime };
          const keys = path.split('.');

          if (keys[0] === 'total') {
            watchTime.total = value;
          } else if (keys[0] === 'byProgram') {
            const index = parseInt(keys[1]);
            watchTime.byProgram = [...watchTime.byProgram];
            watchTime.byProgram[index] = { ...watchTime.byProgram[index], hours: value };
          } else if (keys[0] === 'monthly') {
            const index = parseInt(keys[1]);
            watchTime.monthly = [...watchTime.monthly];
            watchTime.monthly[index] = { ...watchTime.monthly[index], hours: value };
          }

          return { watchTime };
        });
      },

      // Update production data
      updateProduction: (programId, monthIndex, key, value) => {
        set((state) => {
          const data = { ...state.productionData };
          if (!data[programId]) return state;

          const months = [...data[programId]];
          months[monthIndex] = { ...months[monthIndex], [key]: value };
          data[programId] = months;

          return { productionData: data };
        });
      },

      // Export all data as JSON
      exportData: () => {
        const state = get();
        const exportObj = {
          totals: state.totals,
          platforms: state.platforms,
          programs: state.programs,
          programMonthlyData: state.programMonthlyData,
          watchTime: state.watchTime,
          productionData: state.productionData,
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(exportObj, null, 2);
      },

      // Import data from JSON
      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set({
            totals: data.totals,
            platforms: data.platforms,
            programs: data.programs,
            programMonthlyData: data.programMonthlyData,
            watchTime: data.watchTime,
            productionData: data.productionData,
          });
          return true;
        } catch (error) {
          console.error('Failed to import data:', error);
          return false;
        }
      },

      // Reset to default data
      resetToDefault: () => {
        set(getInitialData());
      },
    }),
    {
      name: 'bath-hadeeth-data',
      version: 1,
    }
  )
);

// Selector hooks for convenience
export const useTotals = () => useDataStore((state) => state.totals);
export const usePlatforms = () => useDataStore((state) => state.platforms);
export const usePrograms = () => useDataStore((state) => state.programs);
export const useProgramMonthlyData = () => useDataStore((state) => state.programMonthlyData);
export const useWatchTime = () => useDataStore((state) => state.watchTime);
export const useProductionData = () => useDataStore((state) => state.productionData);
