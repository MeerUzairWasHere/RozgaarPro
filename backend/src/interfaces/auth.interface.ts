import {
  ForgotPasswordInputDto,
  LoginInputDto,
  RegisterInputDto,
  ResetPasswordInputDto,
  VerifyEmailInputDto,
  TokenUserDto,
} from "../dto";

export interface IAuthService {
  registerUser(
    data: RegisterInputDto,
    origin: string
  ): Promise<{
    user: TokenUserDto;
  }>;

  login(
    data: LoginInputDto,
    userAgent: string,
    ip: string
  ): Promise<{
    user: TokenUserDto;
    refreshTokenHash: string;
  }>;

  verifyEmail(data: VerifyEmailInputDto): Promise<{ msg: string }>;

  logout(tokenUser: TokenUserDto): Promise<{ msg: string }>;

  forgotPassword(
    data: ForgotPasswordInputDto,
    origin: string
  ): Promise<
    | { msg: string }
    | { name: string; email: string; token: string; origin: string }
  >;

  resetPassword(data: ResetPasswordInputDto): Promise<{ msg: string }>;

  validateRefreshToken(refreshToken: string): Promise<{
    user: TokenUserDto;
    refreshTokenHash: string;
  }>;

  requestOtp(to: string, channel?: "sms" | "whatsapp"): Promise<void>;

  verifyOtp(to: string, code: string): Promise<boolean>;
}
