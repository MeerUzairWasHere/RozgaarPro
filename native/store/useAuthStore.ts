import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";

type LoginMethod = "phone" | "email";

type AuthStore = {
  isAuthenticated: boolean;
  loginMethod: LoginMethod;

  showPassword: boolean;
  phone: string;
  email: string;
  password: string;

  loading: boolean;

  setShowPassword: (show: boolean) => void;
  setLoginMethod: (method: LoginMethod) => void;
  setField: (field: "phone" | "email" | "password", value: string) => void;

  login: () => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loginMethod: "phone",

      phone: "",
      email: "",
      password: "",

      showPassword: false,
      loading: false,

      setLoginMethod: (method) => set({ loginMethod: method }),

      setShowPassword: (show) => set({ showPassword: show }),

      setField: (field, value) =>
        set({
          [field]: value,
        } as Partial<AuthStore>),

      login: async () => {
        const { phone, email, password, loginMethod } = get();

        // simple validation (replace with API later)
        if (loginMethod === "phone" && phone.length < 10) return false;
        if (loginMethod === "email" && !email.includes("@")) return false;
        if (!password) return false;

        set({ loading: true });

        // simulate API call
        await new Promise((res) => setTimeout(res, 1000));

        set({
          loading: false,
          isAuthenticated: true,
        });

        return true;
      },

      logout: () =>
        set({
          isAuthenticated: false,
          phone: "",
          email: "",
          password: "",
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
