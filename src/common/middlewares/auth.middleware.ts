import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

import { logger } from "@/common/logger/logger.factory";
import { redis } from "@/config/redis";

import { HttpStatus } from "../enums/http-status.enum";
import { UserRole } from "../enums/user-role.enum";
import { HttpException } from "../exceptions/http.exception";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
      };
    }
  }
}

export class AuthMiddleware {
  static readonly ACCESS_TOKEN_SECRET: jwt.Secret =
    process.env.JWT_SECRET || "your-secret-key";
  static readonly REFRESH_TOKEN_SECRET: jwt.Secret =
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";
  static readonly ACCESS_TOKEN_EXPIRES_IN: number = 24 * 60 * 60; // 1 day in seconds
  static readonly REFRESH_TOKEN_EXPIRES_IN: number = 7 * 24 * 60 * 60; // 7 days in seconds

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      if (!accessToken && !refreshToken) {
        return res.status(401).json({
          status: "error",
          message: "Authentication required",
        });
      }

      try {
        // Verify access token
        const decoded = jwt.verify(
          accessToken,
          this.ACCESS_TOKEN_SECRET,
        ) as jwt.JwtPayload;
        req.user = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        };
        return next();
      } catch (error) {
        // Access token expired or invalid, try refresh token
        if (!refreshToken) {
          return res.status(401).json({
            status: "error",
            message: "Access token expired",
          });
        }

        // Verify refresh token
        const decoded = jwt.verify(
          refreshToken,
          this.REFRESH_TOKEN_SECRET,
        ) as jwt.JwtPayload;

        // Check if refresh token is blacklisted
        if (redis) {
          const isBlacklisted = await redis.get(`blacklist:${refreshToken}`);
          if (isBlacklisted) {
            return res.status(401).json({
              status: "error",
              message: "Refresh token invalidated",
            });
          }
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
          { id: decoded.id, email: decoded.email, role: decoded.role },
          this.ACCESS_TOKEN_SECRET,
          { expiresIn: this.ACCESS_TOKEN_EXPIRES_IN },
        );

        // Set new access token in cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        req.user = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        };

        return next();
      }
    } catch (error) {
      logger.error("Authentication error:", error);
      return res.status(401).json({
        status: "error",
        message: "Authentication failed",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      // Blacklist refresh token if Redis is available
      if (redis && refreshToken) {
        const decoded = jwt.verify(
          refreshToken,
          this.REFRESH_TOKEN_SECRET,
        ) as jwt.JwtPayload;
        const expiresIn = decoded.exp
          ? decoded.exp - Math.floor(Date.now() / 1000)
          : 7 * 24 * 60 * 60; // 7 days
        await redis.set(`blacklist:${refreshToken}`, "1", "EX", expiresIn);
      }

      // Clear cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.json({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      logger.error("Logout error:", error);
      return res.status(500).json({
        status: "error",
        message: "Logout failed",
      });
    }
  }

  static handle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          "Vui lòng đăng nhập để tiếp tục. Token xác thực không được tìm thấy trong yêu cầu.",
        );
      }

      if (!authHeader.startsWith("Bearer ")) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          'Định dạng token không hợp lệ. Token phải bắt đầu bằng "Bearer "',
        );
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          "Token xác thực không hợp lệ. Vui lòng đăng nhập lại.",
        );
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "default_secret",
        ) as {
          id: string;
          email: string;
          name: string;
          role: UserRole;
        };

        req.user = decoded;
        next();
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          );
        }
        if (error instanceof jwt.JsonWebTokenError) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            "Token xác thực không hợp lệ. Vui lòng kiểm tra lại hoặc đăng nhập lại.",
          );
        }
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          "Xác thực không thành công. Vui lòng thử lại sau.",
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          status: "error",
          message: error.message,
          code: error.status,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  };
}
