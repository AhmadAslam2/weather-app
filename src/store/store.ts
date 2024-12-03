import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeatherState {
  unit: 'metric' | 'imperial';
  toggleUnit: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useStore = create<WeatherState>(
  persist(
    (set) => ({
      unit: 'metric',
      toggleUnit: () =>
        set((state) => ({
          unit: state.unit === 'metric' ? 'imperial' : 'metric',
        })),
      loading: false,
      setLoading: (value) => set({ loading: value }),
    }),
    {
      name: 'weather-app-storage',
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
