import { api } from "@/lib/axios";
import { LoginInputDto, RegisterInputDto, TokenUser } from "@/types";

export const authApi = {
  register: async (userData: RegisterInputDto): Promise<string> => {
    const { data } = await api.post<string>("/auth/sign-up", userData);
    return data;
  },

  login: async (
    credentials: LoginInputDto
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenUser: TokenUser;
  }> => {
    const { data } = await api.post<{
      accessToken: string;
      refreshToken: string;
      tokenUser: TokenUser;
    }>("/auth/sign-in", credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/sign-out");
  },
};
