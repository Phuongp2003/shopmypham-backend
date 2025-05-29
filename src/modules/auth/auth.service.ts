import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Profile } from 'passport';
import { logger } from '@/common/logger/logger.factory';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { prisma } from '@/config/prisma';
import bcrypt from 'bcrypt';
import {
    AuthResponse,
    LoginRequest,
    RefreshToken,
    RegisterRequest,
    type ChangePasswordRequest,
} from '@/modules/auth/auth.dto';
import { AuthPayload } from '@/modules/auth/auth.types';
import { createAuthPayload, signAuthTokens } from './auth.helper';
import { AccountRecoveryService } from '../accountRecovery/accountRecovery.service';
import { EmailService } from '@/common/services/email.service';
export class AuthService {
    static async login(input: LoginRequest): Promise<AuthResponse> {
        try {
            // Find user
            const user = await prisma.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                throw new Error('Tài khoản không tồn tại!');
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            // Verify password (in a real app, use bcrypt or similar)
            if (await bcrypt.compare(hashedPassword, user.password)) {
                throw new Error('Thông tin đăng nhập sai!');
            }

            // Generate tokens
            const tokenPayload = createAuthPayload(user);
            const { accessToken, refreshToken } = signAuthTokens(tokenPayload);

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            logger.error('Login error:', error, { service: 'AuthService' });
            throw error;
        }
    }

    static async register(input: RegisterRequest): Promise<AuthResponse> {
        try {
            // Check if user exists
            const existingUser = await prisma.user.findUnique({
                where: { email: input.email },
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            const secretKey = crypto.randomBytes(32).toString('hex');
            const hashedPassword = await bcrypt.hash(input.password, 10);

            const user = await prisma.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    role: input.role || 'user',
                    name: input.name,
                    secretKey: secretKey,
                },
            });

            // Generate tokens
            const tokenPayload = createAuthPayload(user);
            const { accessToken, refreshToken } = signAuthTokens(tokenPayload);

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            logger.error('Registration error:', error, {
                service: 'AuthService',
            });
            throw error;
        }
    }

    static async refreshToken(input: RefreshToken): Promise<AuthResponse> {
        try {
            const { refreshToken } = input;

            const decoded = jwt.verify(
                refreshToken,
                AuthMiddleware.REFRESH_TOKEN_SECRET,
            ) as AuthPayload;

            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const tokenPayload = createAuthPayload(user);
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            } = signAuthTokens(tokenPayload);

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            logger.error('Refresh token error:', error, {
                service: 'AuthService',
            });
            throw error;
        }
    }

    static async handleGoogleOAuth(profile: Profile): Promise<AuthResponse> {
        try {
            // Check if user exists with this Google ID
            let user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { googleId: profile.id },
                        { email: profile.emails?.[0]?.value },
                    ],
                },
            });

            if (!user) {
                // Create new user if doesn't exist
                const secretKey = crypto.randomBytes(32).toString('hex');
                user = await prisma.user.create({
                    data: {
                        email: profile.emails?.[0]?.value || '',
                        name: profile.displayName,
                        googleId: profile.id,
                        role: 'user',
                        secretKey: secretKey,
                        password: '', // No password needed for OAuth users
                        googleName: profile.displayName,
                        googleEmail: profile.emails?.[0]?.value,
                    },
                });
                await EmailService.sendEmailWithTemplate(
                    user.email,
                    'Chào mừng bạn đến với hệ thống quản lý đơn hàng',
                    `<p>Chào mừng bạn đến với hệ thống quản lý đơn hàng ${user.name}</p>`,
                );
            } else if (!user.googleId) {
                // Update existing user with Google ID if they don't have one
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: profile.id },
                });
            }

            // Generate tokens
            const tokenPayload = createAuthPayload(user);
            const { accessToken, refreshToken } = signAuthTokens(tokenPayload);

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            logger.error('Google OAuth error:', error, {
                service: 'AuthService',
            });
            throw error;
        }
    }

    static async changePassword(input: ChangePasswordRequest): Promise<void> {
        try {
            const { email, otp, oldPassword, newPassword } = input;
            const isOtpValid = await AccountRecoveryService.verifyOtp(
                email,
                otp,
            );
            if (!isOtpValid) {
                throw new Error('Invalid OTP');
            }
            const hashedPassword = await bcrypt.hash(oldPassword, 10);

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.password !== hashedPassword) {
                throw new Error('Invalid old password');
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update user password
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedNewPassword },
            });
        } catch (error) {
            logger.error('Change password error:', error, {
                service: 'AuthService',
            });
            throw error;
        }
    }

    static async linkGoogleAccount(
        userId: string,
        profile: Profile,
    ): Promise<void> {
        // Kiểm tra googleId đã được liên kết với user khác chưa
        const existing = await prisma.user.findFirst({
            where: {
                googleId: profile.id,
                NOT: { id: userId },
            },
        });
        if (existing) {
            throw new Error(
                'Tài khoản Google đã được liên kết với tài khoản khác!',
            );
        }

        // Lấy user hiện tại
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('Tài khoản không tồn tại!');
        if (user.googleId)
            throw new Error(
                'Tài khoản Google đã được liên kết với tài khoản khác!',
            );

        // Cập nhật googleId cho user hiện tại
        await prisma.user.update({
            where: { id: userId },
            data: {
                googleId: profile.id,
                googleName: profile.displayName,
                googleEmail: profile.emails?.[0]?.value,
            },
        });
    }
}
