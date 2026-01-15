import * as argon2 from "argon2";
import { createHash } from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await argon2.verify(hashedPassword, password);
  return isMatch;
};


export const hashString = (string: string): string => {
  return createHash("md5").update(string).digest("hex");
};
