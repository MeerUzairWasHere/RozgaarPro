import { User } from "@prisma/client";
import {
  TokenUserDto,
  UpdatePasswordInputDto,
  UserUpdateInputDto,
} from "../dto";

export interface IUserService {
  getCurrentUser(tokenUser: TokenUserDto): Promise<TokenUserDto | null>;
  updateUser(userId: string, data: UserUpdateInputDto): Promise<TokenUserDto>;
  updateUserPassword(
    userId: string,
    data: UpdatePasswordInputDto,
  ): Promise<{ msg: string }>;
  deleteUser(userId: string): Promise<{ msg: string }>;
  getUsersCount(): Promise<number>;
  findUserByIdOrThrowError({ id }: { id: string }): Promise<User>;
  findUserByEmailOrThrowError({ email }: { email: string }): Promise<User>;
}
