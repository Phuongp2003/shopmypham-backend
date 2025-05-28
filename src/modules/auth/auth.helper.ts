import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { AuthPayload } from './auth.types';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

// Helper to create token payload from user
export function createAuthPayload(user: any): AuthPayload {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    googleId: user.googleId || null,
    status: user.status,
  };
}

// Helper to sign JWT token
export function signToken(payload: AuthPayload, secret: Secret, expiresIn: SignOptions["expiresIn"]): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
}

// Helper to sign both access and refresh tokens
export function signAuthTokens(payload: AuthPayload) {
  const accessToken = signToken(
    payload,
    AuthMiddleware.ACCESS_TOKEN_SECRET as Secret,
    AuthMiddleware.ACCESS_TOKEN_EXPIRES_IN
  );
  const refreshToken = signToken(
    payload,
    AuthMiddleware.REFRESH_TOKEN_SECRET as Secret,
    AuthMiddleware.REFRESH_TOKEN_EXPIRES_IN
  );
  return { accessToken, refreshToken };
} 
