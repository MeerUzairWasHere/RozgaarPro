import { USER_ROLE } from "./global.types";
import { TokenUser } from "./user.types";

export interface RegisterInputDto {
  name: string;
  phone: string;
  password: string;
  role: USER_ROLE;
}

export interface LoginInputDto {
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  TokenUser: TokenUser;
}
