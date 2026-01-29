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
import {
  IAuthService,
  ICompanyService,
  IEmailService,
  IPrismaService,
  VerifyProvider,
} from "../interfaces";
import { Role, User } from "@prisma/client";

export class AuthService implements IAuthService {
  constructor(
    private emailService: IEmailService,
    private prismaService: IPrismaService,
    private companyService: ICompanyService,
    private readonly verifyProvider: VerifyProvider,
  ) {}

  async registerUser(data: RegisterInputDto, origin: string) {
    const { name, password, phone, role } = data;

    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role,
        isVerified: true,
        verified: new Date(),
        profileCompleted: role === Role.USER ? true : false,
      },
    });
    console.log(user);

    throw new Error("Remove later");
    // await this.verifyProvider.sendOtp(phone);

    return {
      user: createTokenUser(user),
    };
  }

  async login(data: LoginInputDto, userAgent: string, ip: string) {
    const { email, phone, password } = data;

    let user: User | null;

    if (phone) {
      user = await this.prismaService.user.findUnique({
        where: { phone },
      });
    } else if (email) {
      user = await this.prismaService.user.findUnique({
        where: { email },
      });
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
    const existingToken = await this.prismaService.token.findFirst({
      where: { user: { id: user.id } },
    });

    if (existingToken) {
      if (!existingToken.isValid) {
        throw new UnauthenticatedError("Invalid Credentials");
      }
      refreshToken = existingToken.refreshToken;
    } else {
      refreshToken = randomBytes(40).toString("hex");
      await this.prismaService.token.create({
        data: {
          refreshToken,
          ip,
          userAgent,
          userId: user.id,
        },
      });
    }

    return {
      user: tokenUser,
      refreshTokenHash: refreshToken,
    };
  }

  async verifyEmail(data: VerifyEmailInputDto) {
    const { verificationToken, email } = data;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthenticatedError("Verification Failed");
    }

    if (user.verificationToken !== verificationToken) {
      throw new UnauthenticatedError("Verification Failed");
    }

    await this.prismaService.user.update({
      where: { email },
      data: {
        isVerified: true,
        verified: new Date(),
        verificationToken: "",
      },
    });

    return { msg: "Email Verified" };
  }

  async logout(tokenUser: TokenUserDto) {
    await this.prismaService.token.deleteMany({
      where: {
        userId: tokenUser.id,
      },
    });
  }

  async forgotPassword(data: ForgotPasswordInputDto, origin: string) {
    const { email } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { msg: "User not found!" };
    }

    const passwordToken = randomBytes(70).toString("hex");

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await this.prismaService.user.update({
      where: { email },
      data: {
        passwordToken: hashString(passwordToken),
        passwordTokenExpirationDate,
      },
    });

    return { msg: "Password reset email sent" };
  }

  async resetPassword(data: ResetPasswordInputDto) {
    const { token, email, newPassword } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

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

    await this.prismaService.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        passwordToken: null,
        passwordTokenExpirationDate: null,
      },
    });

    return { msg: "Password reset successfully!" };
  }

  async validateRefreshToken(refreshToken: string) {
    const payload = isTokenValid(refreshToken);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        userId: payload.user.id,
        refreshToken: payload.refreshTokenHash,
        isValid: true,
      },
      include: {
        user: true,
      },
    });

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
    const user = await this.prismaService.user.findUnique({
      where: { phone: to },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // TODO: create function and user same on email verification - P4
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verified: new Date(),
        profileCompleted: user.role === Role.USER ? true : false,
      },
    });

    if (!valid) throw new BadRequestError("Invalid or expired OTP");
    return true;
  }
}
