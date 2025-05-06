import jwt, { SignOptions } from "jsonwebtoken";
import { Profile } from "passport";
import { z } from "zod";

import { logger } from "@/common/logger/logger.factory";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { prisma } from "@/config/prisma";
import {
  AuthResponseDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from "@/modules/auth/auth.dto";
import { AuthPayload } from "@/modules/auth/auth.types";

export class AuthService {
  static async login(
    input: z.infer<typeof LoginDto>,
  ): Promise<AuthResponseDto> {
    try {
      // Validate input
      const validatedData = LoginDto.parse(input);

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Verify password (in a real app, use bcrypt or similar)
      if (user.password !== validatedData.password) {
        throw new Error("Invalid credentials");
      }

      // Generate tokens
      const tokenPayload: AuthPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        googleId: user.googleId || undefined,
      };
      const tokenOptions: SignOptions = {
        expiresIn: AuthMiddleware.ACCESS_TOKEN_EXPIRES_IN,
      };

      const accessToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.ACCESS_TOKEN_SECRET,
        tokenOptions,
      );

      const refreshToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.REFRESH_TOKEN_SECRET,
        { ...tokenOptions, expiresIn: AuthMiddleware.REFRESH_TOKEN_EXPIRES_IN },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  }

  static async register(
    input: z.infer<typeof RegisterDto>,
  ): Promise<AuthResponseDto> {
    try {
      // Validate input
      const validatedData = RegisterDto.parse(input);

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create user (in a real app, hash the password)
      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: validatedData.password,
          role: validatedData.role || "user",
          name: validatedData.name,
        },
      });

      // Generate tokens
      const tokenPayload: AuthPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        googleId: user.googleId || undefined,
      };
      const tokenOptions: SignOptions = {
        expiresIn: AuthMiddleware.ACCESS_TOKEN_EXPIRES_IN,
      };

      const accessToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.ACCESS_TOKEN_SECRET,
        tokenOptions,
      );

      const refreshToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.REFRESH_TOKEN_SECRET,
        { ...tokenOptions, expiresIn: AuthMiddleware.REFRESH_TOKEN_EXPIRES_IN },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }

  static async refreshToken(
    input: z.infer<typeof RefreshTokenDto>,
  ): Promise<AuthResponseDto> {
    try {
      const { refreshToken } = RefreshTokenDto.parse(input);

      const decoded = jwt.verify(
        refreshToken,
        AuthMiddleware.REFRESH_TOKEN_SECRET,
      ) as AuthPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const tokenPayload: AuthPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        googleId: user.googleId || undefined,
      };
      const tokenOptions: SignOptions = {
        expiresIn: AuthMiddleware.ACCESS_TOKEN_EXPIRES_IN,
      };

      const newAccessToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.ACCESS_TOKEN_SECRET,
        tokenOptions,
      );

      const newRefreshToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.REFRESH_TOKEN_SECRET,
        { ...tokenOptions, expiresIn: AuthMiddleware.REFRESH_TOKEN_EXPIRES_IN },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      logger.error("Refresh token error:", error);
      throw error;
    }
  }

  static async handleGoogleOAuth(profile: Profile): Promise<AuthResponseDto> {
    try {
      // Check if user exists with this Google ID
      let user = await prisma.user.findFirst({
        where: {
          OR: [{ googleId: profile.id }, { email: profile.emails?.[0]?.value }],
        },
      });

      if (!user) {
        // Create new user if doesn't exist
        user = await prisma.user.create({
          data: {
            email: profile.emails?.[0]?.value || "",
            name: profile.displayName,
            googleId: profile.id,
            role: "user",
            password: "", // No password needed for OAuth users
          },
        });
      } else if (!user.googleId) {
        // Update existing user with Google ID if they don't have one
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId: profile.id },
        });
      }

      // Generate tokens
      const tokenPayload: AuthPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        googleId: user.googleId || undefined,
      };
      const tokenOptions: SignOptions = {
        expiresIn: AuthMiddleware.ACCESS_TOKEN_EXPIRES_IN,
      };

      const accessToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.ACCESS_TOKEN_SECRET,
        tokenOptions,
      );

      const refreshToken = jwt.sign(
        tokenPayload,
        AuthMiddleware.REFRESH_TOKEN_SECRET,
        { ...tokenOptions, expiresIn: AuthMiddleware.REFRESH_TOKEN_EXPIRES_IN },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error("Google OAuth error:", error);
      throw error;
    }
  }
}
