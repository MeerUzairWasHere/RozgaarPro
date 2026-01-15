import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_METHOD, SIGN_UP_STEP, TokenUser, USER_ROLE } from "@/types";

type AuthState = {
  isAuthenticated: boolean;
  loginMethod: LOGIN_METHOD;
  signupStep: SIGN_UP_STEP;
  userRole: USER_ROLE;

  user: TokenUser | null;
  name: string;
  phone: string;
  email: string;
  password: string;
  setSignupStep: (step: SIGN_UP_STEP) => void;

  loading: boolean;

  setLoading: (loading: boolean) => void;

  setField: (
    field: "name" | "phone" | "email" | "password",
    value: string
  ) => void;

  setLoginMethod: (method: LOGIN_METHOD) => void;
  setUserRole: (role: USER_ROLE) => void;
  setUser: (user: TokenUser | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;

  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,

      loginMethod: LOGIN_METHOD.PHONE,
      signupStep: SIGN_UP_STEP.FORM,

      user: null,
      name: "",
      phone: "",
      email: "",
      password: "",

      userRole: USER_ROLE.USER,

      loading: false,

      setLoading: (loading) => set({ loading }),

      setLoginMethod: (method) => set({ loginMethod: method }),

      setField: (field, value) => set({ [field]: value } as Partial<AuthState>),

      setUserRole: (role) => set({ userRole: role }),

      setUser: (user) => set({ user }),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      setSignupStep: (step: SIGN_UP_STEP) => set({ signupStep: step }),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
          name: "",
          phone: "",
          email: "",
          password: "",
          signupStep: SIGN_UP_STEP.FORM,
          loading: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) =>
          AsyncStorage.setItem(key, JSON.stringify(value)),
        removeItem: async (key) => AsyncStorage.removeItem(key),
      },
    }
  )
);
