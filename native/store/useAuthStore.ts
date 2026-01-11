import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginMethod = "phone" | "email";
type SignupStep = "form" | "otp" | "done";

type AuthStore = {
  isAuthenticated: boolean;

  loginMethod: LoginMethod;
  signupStep: SignupStep;

  name: string;
  phone: string;
  email: string;
  password: string;

  showPassword: boolean;
  loading: boolean;

  setField: (
    field: "name" | "phone" | "email" | "password",
    value: string
  ) => void;

  setShowPassword: (show: boolean) => void;
  setLoginMethod: (method: LoginMethod) => void;

  login: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,

      loginMethod: "phone",
      signupStep: "form",

      name: "",
      phone: "",
      email: "",
      password: "",

      showPassword: false,
      loading: false,

      setLoginMethod: (method) => set({ loginMethod: method }),

      setShowPassword: (show) => set({ showPassword: show }),

      setField: (field, value) => set({ [field]: value } as Partial<AuthStore>),

      // ---------------- LOGIN ----------------
      login: async () => {
        const { phone, email, password, loginMethod } = get();

        if (loginMethod === "phone" && phone.length !== 10) return false;
        if (loginMethod === "email" && !email.includes("@")) return false;
        if (!password) return false;

        set({ loading: true });
        await new Promise((res) => setTimeout(res, 1000));

        set({
          loading: false,
          isAuthenticated: true,
        });

        return true;
      },

      // ---------------- SIGNUP ----------------
      signup: async () => {
        const { name, phone, password } = get();

        if (!name.trim()) return false;
        if (phone.length !== 10) return false;
        if (password.length < 6) return false;

        set({ loading: true });

        // simulate send OTP
        await new Promise((res) => setTimeout(res, 800));

        set({
          loading: false,
          signupStep: "otp",
        });

        return true;
      },

      verifyOtp: async (otp: string) => {
        if (otp.length !== 6) return false;

        set({ loading: true });
        await new Promise((res) => setTimeout(res, 800));

        set({
          loading: false,
          isAuthenticated: true,
          signupStep: "done",
        });

        return true;
      },

      // ---------------- LOGOUT ----------------
      logout: () =>
        set({
          isAuthenticated: false,
          name: "",
          phone: "",
          email: "",
          password: "",
          signupStep: "form",
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
