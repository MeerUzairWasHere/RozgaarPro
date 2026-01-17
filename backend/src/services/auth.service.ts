import { randomBytes } from "crypto";
import {
  hashString,
  createTokenUser,
  hashPassword,
  comparePassword,
  isTokenValid,
} from "../utils";
import {
  ForgotPasswordInputDto,
  LoginInputDto,
  RegisterInputDto,
  ResetPasswordInputDto,
  TokenUserDto,
  VerifyEmailInputDto,
} from "../dto";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import { IAuthService, ICompanyService, IEmailService } from "../interfaces";
import { UserRepository } from "../repositories";
import { Role, User } from "@prisma/client";
import { VerifyProvider } from "../interfaces/verify-provider.interface";

export class AuthService implements IAuthService {
  constructor(
    private emailService: IEmailService,
    private userRepository: UserRepository,
    private companyService: ICompanyService,
    private readonly verifyProvider: VerifyProvider,
  ) {}

  async registerUser(data: RegisterInputDto, origin: string) {
    const { name, password, phone, role } = data;

    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.createUser({
      name,
      phone,
      password: hashedPassword,
      role,
    });

    await this.verifyProvider.sendOtp(phone);

    return {
      user: createTokenUser(user),
    };
  }

  async login(data: LoginInputDto, userAgent: string, ip: string) {
    const { email, phone, password } = data;

    let user: User | null;

    if (phone) {
      user = await this.userRepository.findUserByPhone(phone);
    } else if (email) {
      user = await this.userRepository.findUserByEmail(email);
    } else {
      throw new BadRequestError("Either email or phone is required");
    }

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    if (user.isVerified === false) {
      throw new UnauthenticatedError("Please verify your account.");
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const tokenUser = createTokenUser(user);

    let refreshToken: string;
    const existingToken = await this.userRepository.findTokenByUserId(user.id);

    if (existingToken) {
      if (!existingToken.isValid) {
        throw new UnauthenticatedError("Invalid Credentials");
      }
      refreshToken = existingToken.refreshToken;
    } else {
      refreshToken = randomBytes(40).toString("hex");
      await this.userRepository.createToken({
        refreshToken,
        ip,
        userAgent,
        userId: user.id,
      });
    }

    return {
      user: tokenUser,
      refreshTokenHash: refreshToken,
    };
  }

  async verifyEmail(data: VerifyEmailInputDto) {
    const { verificationToken, email } = data;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthenticatedError("Verification Failed");
    }

    if (user.verificationToken !== verificationToken) {
      throw new UnauthenticatedError("Verification Failed");
    }

    await this.userRepository.updateUserVerification(email, {
      isVerified: true,
      verified: new Date(),
      verificationToken: "",
    });

    return { msg: "Email Verified" };
  }

  async logout(tokenUser: TokenUserDto) {
    await this.userRepository.deleteUserTokens(tokenUser.id);
    return { msg: "User logged out!" };
  }

  async forgotPassword(data: ForgotPasswordInputDto, origin: string) {
    const { email } = data;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return { msg: "User not found!" };
    }

    const passwordToken = randomBytes(70).toString("hex");

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await this.userRepository.updateUserPasswordToken(email, {
      passwordToken: hashString(passwordToken),
      passwordTokenExpirationDate,
    });

    return { msg: "Password reset email sent" };
  }

  async resetPassword(data: ResetPasswordInputDto) {
    const { token, email, newPassword } = data;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid or expired token");
    }

    const isTokenValid =
      user.passwordToken === hashString(token) &&
      user.passwordTokenExpirationDate &&
      user.passwordTokenExpirationDate > new Date();

    if (!isTokenValid) {
      throw new BadRequestError("Invalid or expired token");
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.userRepository.updateUserPassword(email, {
      password: hashedPassword,
      passwordToken: null,
      passwordTokenExpirationDate: null,
    });

    return { msg: "Password reset successfully!" };
  }

  async validateRefreshToken(refreshToken: string) {
    const payload = isTokenValid(refreshToken);

    const existingToken = await this.userRepository.findValidRefreshToken(
      payload.user.id,
      payload.refreshTokenHash,
    );

    if (!existingToken) {
      throw new UnauthenticatedError("Invalid refresh token");
    }

    return {
      user: payload.user,
      refreshTokenHash: payload.refreshTokenHash,
    };
  }

  async requestOtp(to: string, channel?: "sms" | "whatsapp") {
    return await this.verifyProvider.sendOtp(to, channel);
  }

  async verifyOtp(to: string, code: string): Promise<boolean> {
    const valid = await this.verifyProvider.checkOtp(to, code);
    const user = await this.userRepository.findUserByPhone(to);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // TODO: create function and user same on email verification - P4
    await this.userRepository.update(user.id, {
      isVerified: true,
      verified: new Date(),
      profileCompleted: user.role === Role.USER ? true : false,
    });

    if (!valid) throw new BadRequestError("Invalid or expired OTP");
    return true;
  }
}
