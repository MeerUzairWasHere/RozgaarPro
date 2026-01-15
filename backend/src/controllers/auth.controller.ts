import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { getAccessTokens } from "../utils";
import {
  ForgotPasswordInputDto,
  LoginInputDto,
  RegisterInputDto,
  ResetPasswordInputDto,
  TokenUserDto,
  VerifyEmailInputDto,
} from "../dto";

import { IAuthService } from "../interfaces";
import { currentUser } from "../decorators";

export class AuthController {
  constructor(private authService: IAuthService) {}

  registerUser = async (
    req: Request<{}, {}, RegisterInputDto>,
    res: Response
  ): Promise<void> => {
    const result = await this.authService.registerUser(
      req.body,
      req.get("origin") || process.env.BASE_URL!
    );

    res.status(StatusCodes.CREATED).json(result);
  };

  login = async (
    req: Request<{}, {}, LoginInputDto>,
    res: Response<{
      tokenUser: TokenUserDto;
      accessToken: string;
      refreshToken: string;
    }>
  ): Promise<void> => {
    // TODO: create one decorator for this
    const userAgent = req.headers["user-agent"] || "unknown";
    const ip = req.ip;

    if (!ip) {
      throw new BadRequestError("IP address is required");
    }
    const { user, refreshTokenHash } = await this.authService.login(
      req.body,
      userAgent,
      ip
    );

    const { accessToken, refreshToken } = getAccessTokens({
      user,
      refreshTokenHash,
    });

    res.status(StatusCodes.OK).json({
      tokenUser: user,
      accessToken,
      refreshToken,
    });
  };

  verifyEmail = async (
    req: Request<{}, {}, VerifyEmailInputDto>,
    res: Response
  ): Promise<void> => {
    const result = await this.authService.verifyEmail(req.body);
    res.status(StatusCodes.OK).json(result);
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    const loggedInUser = currentUser(req);

    const result = await this.authService.logout(loggedInUser);

    res.status(StatusCodes.OK).json(result);
  };

  forgotPassword = async (
    req: Request<{}, {}, ForgotPasswordInputDto>,
    res: Response
  ): Promise<void> => {
    const result = await this.authService.forgotPassword(
      req.body,
      req.get("origin") || process.env.BASE_URL!
    );

    res.status(StatusCodes.OK).json(result);
  };

  resetPassword = async (
    req: Request<{}, {}, ResetPasswordInputDto>,
    res: Response
  ): Promise<void> => {
    const result = await this.authService.resetPassword(req.body);
    res.status(StatusCodes.OK).json(result);
  };

  refreshToken = async (
    req: Request,
    res: Response<{ accessToken: string }>
  ): Promise<void> => {
    const refreshToken = req.headers["x-refresh-token"] as string;

    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required");
    }

    const { user, refreshTokenHash } =
      await this.authService.validateRefreshToken(refreshToken);

    const { accessToken } = getAccessTokens({
      user,
      refreshTokenHash,
    });

    res.status(StatusCodes.OK).json({ accessToken });
  };
}
