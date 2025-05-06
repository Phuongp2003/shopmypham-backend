import { Request, Response } from "express";
import passport from "passport";

import { logger } from "@/common/logger/logger.factory";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { googleOAuthConfig } from "@/config/google-oauth.config";
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from "@/modules/auth/auth.dto";
import { AuthService } from "@/modules/auth/auth.service";
import { AuthResponse } from "@/modules/auth/auth.types";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const payload = LoginDto.parse(req.body);
      const response: AuthResponse = await AuthService.login(payload);
      res.json(response);
    } catch (error: unknown) {
      logger.error("Lỗi đăng nhập:", error, { service: "AuthController" });
      res.status(401).json({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
      });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const payload = RegisterDto.parse(req.body);
      const response: AuthResponse = await AuthService.register(payload);
      res.status(201).json(response);
    } catch (error: unknown) {
      logger.error("Lỗi đăng ký:", error, { service: "AuthController" });
      res.status(400).json({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      await AuthMiddleware.logout(req, res);
    } catch (error) {
      logger.error("Lỗi đăng xuất:", error, { service: "AuthController" });
      return res.status(500).json({
        status: "error",
        message: "Đăng xuất thất bại. Vui lòng thử lại sau.",
      });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const payload = RefreshTokenDto.parse(req.body);
      const response: AuthResponse = await AuthService.refreshToken(payload);
      res.json(response);
    } catch (error: unknown) {
      res.status(401).json({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Làm mới token thất bại. Vui lòng đăng nhập lại.",
      });
    }
  }

  static async googleAuth(req: Request, res: Response): Promise<void> {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  }

  static async googleAuthCallback(req: Request, res: Response): Promise<void> {
    passport.authenticate("google", async (err: Error, profile: any) => {
      try {
        if (err) {
          throw err;
        }

        if (!profile) {
          throw new Error("Không nhận được thông tin từ Google");
        }

        const response = await AuthService.handleGoogleOAuth(profile);

        // Set tokens in cookies
        res.cookie("accessToken", response.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.cookie("refreshToken", response.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Redirect to frontend with success message
        res.redirect(`${googleOAuthConfig.frontendURL}/auth/success`);
      } catch (error) {
        logger.error("Lỗi xác thực Google:", error, {
          service: "AuthController",
        });
        res.redirect(`${googleOAuthConfig.frontendURL}/auth/error`);
      }
    })(req, res);
  }
}
