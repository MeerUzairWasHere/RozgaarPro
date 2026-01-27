import {
  createTokenUser,
  comparePassword,
  hashPassword,
  createTokenUserWithFreelancer,
} from "../utils";
import {
  TokenUserDto,
  UserUpdateInputDto,
  UpdatePasswordInputDto,
} from "../dto";
import { NotFoundError, UnauthenticatedError } from "../errors";
import { IUserService, IPrismaService } from "../interfaces";
import { User } from "@prisma/client";

export class UserService implements IUserService {
  constructor(private prismaService: IPrismaService) {}

  async getCurrentUser(tokenUser: TokenUserDto): Promise<TokenUserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: tokenUser.id },
    });

    if (!user) {
      return null;
    }

    const freelancer = await this.prismaService.freelancer.findUnique({
      where: { userId: user.id },
    });

    if (!freelancer) {
      return createTokenUser(user);
    }

    return createTokenUserWithFreelancer(user, freelancer.id);
  }

  async updateUser(
    userId: string,
    data: UserUpdateInputDto,
  ): Promise<TokenUserDto> {
    const { email, name } = data;

    if (email) {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw new UnauthenticatedError("Email already exists");
      }
    }

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { email, name },
    });

    return createTokenUser(user);
  }

  async updateUserPassword(
    userId: string,
    data: UpdatePasswordInputDto,
  ): Promise<{ msg: string }> {
    const { oldPassword, newPassword } = data;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    const isPasswordCorrect = await comparePassword(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    if (oldPassword === newPassword) {
      throw new UnauthenticatedError(
        "New password must be different from old password",
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { msg: "Success! Password Updated." };
  }

  async deleteUser(userId: string): Promise<{ msg: string }> {
    await this.prismaService.user.delete({
      where: { id: userId },
    });

    return { msg: "User account deleted successfully" };
  }

  async getUsersCount(): Promise<number> {
    return await this.prismaService.user.count();
  }

  async findUserByIdOrThrowError({ id }: { id: string }): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  async findUserByEmailOrThrowError({
    email,
  }: {
    email: string;
  }): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError(`User with email (${email}) not found`);
    }

    return user;
  }
}
