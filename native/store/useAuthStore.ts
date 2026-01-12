import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_METHOD, SIGN_UP_STEP, USER_ROLE } from "@/types";

type AuthStore = {
  isAuthenticated: boolean;
  loginMethod: LOGIN_METHOD;
  signupStep: SIGN_UP_STEP;
  userRole: USER_ROLE;

  name: string;
  phone: string;
  email: string;
  password: string;

  loading: boolean;

  setField: (
    field: "name" | "phone" | "email" | "password",
    value: string
  ) => void;

  setLoginMethod: (method: LOGIN_METHOD) => void;
  setUserRole: (role: USER_ROLE) => void;

  login: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,

      loginMethod: LOGIN_METHOD.PHONE,
      signupStep: SIGN_UP_STEP.FORM,

      name: "",
      phone: "",
      email: "",
      password: "",

      userRole: USER_ROLE.USER,

      loading: false,

      setLoginMethod: (method) => set({ loginMethod: method }),

      setField: (field, value) => set({ [field]: value } as Partial<AuthStore>),

      setUserRole: (role) => set({ userRole: role }),

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
          signupStep: SIGN_UP_STEP.OTP,
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
          signupStep: SIGN_UP_STEP.DONE,
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
          signupStep: SIGN_UP_STEP.FORM,
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
