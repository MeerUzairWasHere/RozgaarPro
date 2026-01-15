import { USER_ROLE } from "./global.types";

export interface User {
  username: string | null;
  name: string;
  email: string | null;
  phone: string;
  password: string;
  role: USER_ROLE;
  isVerified: boolean;
  verificationToken: string | null;
  passwordToken: string | null;
  passwordTokenExpirationDate: Date | null;
  verified: Date | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenUser {
  id: string;
  name: string;
  role: string;
  phone: string;
  isVerified: boolean;
}
