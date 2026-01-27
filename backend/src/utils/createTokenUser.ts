import { User } from "@prisma/client";
import { TokenUserDto } from "../dto";

export const createTokenUser = (user: User): TokenUserDto => {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    phone: user.phone,
    isVerified: user.isVerified,
    profileCompleted: user.profileCompleted,
    freelancerId: null,
  };
};

export const createTokenUserWithFreelancer = (
  user: User,
  freelancerId: string,
): TokenUserDto => {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    phone: user.phone,
    isVerified: user.isVerified,
    profileCompleted: user.profileCompleted,
    freelancerId,
  };
};
