import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EXPERIENCE_LEVEL } from "@/types";

type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

type ProfileFormData = {
  skills: string[];
  experience: EXPERIENCE_LEVEL;
  location?: LocationCoords;
};

type CompleteProfileState = {
  step: number;
  loading: boolean;
  formData: ProfileFormData;
  setLocation: (coords: LocationCoords) => void;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setLoading: (loading: boolean) => void;

  toggleSkill: (skillId: string) => void;
  setExperience: (experience: EXPERIENCE_LEVEL) => void;

  resetProfile: () => void;
};

export const useCompleteProfileStore = create<CompleteProfileState>()(
  persist(
    (set) => ({
      step: 1,
      loading: false,
      formData: {
        skills: [],
        experience: EXPERIENCE_LEVEL.ONE_TO_THREE_YEARS,
      },

      setLocation: (coords) =>
        set((state) => ({
          formData: {
            ...state.formData,
            location: coords,
          },
        })),

      setStep: (step) => set({ step }),

      nextStep: () =>
        set((state) => ({
          step: Math.min(state.step + 1, 3),
        })),

      prevStep: () =>
        set((state) => ({
          step: Math.max(state.step - 1, 1),
        })),

      setLoading: (loading) => set({ loading }),

      toggleSkill: (skillId) =>
        set((state) => ({
          formData: {
            ...state.formData,
            skills: state.formData.skills.includes(skillId)
              ? state.formData.skills.filter((s) => s !== skillId)
              : [...state.formData.skills, skillId],
          },
        })),

      setExperience: (experience) =>
        set((state) => ({
          formData: { ...state.formData, experience },
        })),

      resetProfile: () =>
        set({
          step: 1,
          loading: false,
          formData: {
            skills: [],
            experience: EXPERIENCE_LEVEL.ONE_TO_THREE_YEARS,
          },
        }),
    }),
    {
      name: "complete-profile-storage",
      partialize: (state): Partial<CompleteProfileState> => ({
        step: state.step,
        formData: state.formData,
      }),
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
