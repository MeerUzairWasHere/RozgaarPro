import { api } from "@/lib";
import {
  AuthResponse,
  LoginInputDto,
  RegisterInputDto,
  RequestOtpInputDto,
  TokenUser,
  VerifyOtpInputDto,
} from "@/types";

export const authApiClient = {
  register: async (userData: RegisterInputDto): Promise<string> => {
    const { data } = await api.post<string>("/auth/sign-up", userData);
    return data;
  },

  login: async (credentials: LoginInputDto): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/sign-in", credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/sign-out");
  },

  requestOtp: async (userData: RequestOtpInputDto): Promise<string> => {
    const { data } = await api.post<string>("/auth/request-otp", userData);
    return data;
  },

  verifyOtp: async (userData: VerifyOtpInputDto): Promise<string> => {
    const { data } = await api.post<string>("/auth/verify-otp", userData);
    return data;
  },

  getCurrentUser: async (): Promise<TokenUser> => {
    const { data } = await api.get<TokenUser>("/users/current-user");
    return data;
  },
};
