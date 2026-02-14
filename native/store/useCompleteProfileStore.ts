import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileFormData = {
  professionId: string | null;
  skills: string[];
  experience: number | null;
  profileImage: string | null; // optional
  idImage: string | null; // required
};

type CompleteProfileState = {
  step: number;
  loading: boolean;
  formData: ProfileFormData;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setLoading: (loading: boolean) => void;

  toggleSkill: (skillId: string) => void;
  setExperience: (experience: number | null) => void;

  resetProfile: () => void;

  setProfession: (professionId: string) => void;
  clearSkills: () => void;

  setProfileImage: (uri: string | null) => void;
  setIdImage: (uri: string | null) => void;
};

export const useCompleteProfileStore = create<CompleteProfileState>()(
  persist(
    (set) => ({
      step: 1,
      loading: false,
      formData: {
        professionId: null,
        skills: [],
        experience: null,
        profileImage: null,
        idImage: null,
      },

      setProfileImage: (uri) =>
        set((state) => ({
          formData: { ...state.formData, profileImage: uri },
        })),

      setIdImage: (uri) =>
        set((state) => ({
          formData: { ...state.formData, idImage: uri },
        })),

      setStep: (step) => set({ step }),

      nextStep: () =>
        set((state) => ({
          step: Math.min(state.step + 1, 4),
        })),

      prevStep: () =>
        set((state) => ({
          step: Math.max(state.step - 1, 1),
        })),

      setLoading: (loading) => set({ loading }),

      toggleSkill: (skillId: string) =>
        set((state) => {
          const exists = state.formData.skills.includes(skillId);

          if (!exists && state.formData.skills.length === 3) return state;

          return {
            formData: {
              ...state.formData,
              skills: exists
                ? state.formData.skills.filter((id) => id !== skillId)
                : [...state.formData.skills, skillId],
            },
          };
        }),

      setExperience: (experience) =>
        set((state) => ({
          formData: { ...state.formData, experience },
        })),

      resetProfile: () =>
        set({
          step: 1,
          loading: false,
          formData: {
            professionId: null,
            skills: [],
            experience: null,
            profileImage: null,
            idImage: null,
          },
        }),

      clearSkills: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            skills: [],
          },
        })),
      setProfession: (professionId) =>
        set((state) => ({
          formData: {
            ...state.formData,
            professionId,
          },
        })),
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
