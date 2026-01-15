import pkg from "jsonwebtoken";
import { TokenUserDto } from "../dto";
const { sign, verify } = pkg;

interface JWTOptions {
  payload: Record<string, any>;
  expiresIn: string;
}

export const createJWT = ({ payload, expiresIn }: JWTOptions): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export const isTokenValid = (token: string): any => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return verify(token, process.env.JWT_SECRET);
};

export const getAccessTokens = ({
  user,
  refreshTokenHash,
}: {
  user: TokenUserDto;
  refreshTokenHash: string;
}) => {
  const accessToken = createJWT({
    payload: { user },
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
  });

  const refreshToken = createJWT({
    payload: { user, refreshTokenHash },
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
  });

  return {
    accessToken,
    refreshToken,
  };
};
