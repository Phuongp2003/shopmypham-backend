import { Request, Response } from 'express';
import passport from 'passport';

import { logger } from '@/common/logger/logger.factory';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { googleOAuthConfig } from '@/config/google-oauth.config';
import {
    LoginRequest,
    AuthResponse,
    type RegisterRequest,
    type RefreshToken,
    type ChangePasswordRequest,
} from '@/modules/auth/auth.dto';
import { AuthService } from '@/modules/auth/auth.service';
import jwt from 'jsonwebtoken';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'Auth',
    description: 'Quản lý đăng nhập, đăng ký, đăng xuất',
})
export class AuthController {
    @Post({
        name: 'login',
        description: 'Đăng nhập người dùng',
        path: '/login',
    }, {
        body: 'LoginRequest',
        response: 'AuthResponse',
    })
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const payload: LoginRequest = req.body;
            const response: AuthResponse = await AuthService.login(payload);
            res.json(response);
        } catch (error: unknown) {
            logger.error('Lỗi đăng nhập:', error, {
                service: 'AuthController',
            });
            res.status(401).json({
                status: 'error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.',
            });
        }
    }

    @Post({
        name: 'register',
        description: 'Đăng ký người dùng',
        path: '/register',
    }, {
        body: 'RegisterRequest',
        response: 'AuthResponse',
    })
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const payload: RegisterRequest = req.body;
            const response: AuthResponse = await AuthService.register(payload);
            res.status(201).json(response);
        } catch (error: unknown) {
            logger.error('Lỗi đăng ký:', error, { service: 'AuthController' });
            res.status(400).json({
                status: 'error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.',
            });
        }
    }

    @Post({
        name: 'logout',
        description: 'Đăng xuất người dùng',
        path: '/logout',
    })
    @RequireHeader()
    static async logout(req: Request, res: Response) {
        try {
            await AuthMiddleware.logout(req, res);
        } catch (error) {
            logger.error('Lỗi đăng xuất:', error, {
                service: 'AuthController',
            });
            return res.status(500).json({
                status: 'error',
                message: 'Đăng xuất thất bại. Vui lòng thử lại sau.',
            });
        }
    }

    @Post({
        name: 'refresh-token',
        description: 'Làm mới access token bằng refresh token',
        path: '/refresh-token',
    }, {
        body: 'RefreshToken',
        response: 'AuthResponse',
    })
    static async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const payload: RefreshToken = req.body;
            const response: AuthResponse =
                await AuthService.refreshToken(payload);
            res.json(response);
        } catch (error: unknown) {
            res.status(401).json({
                status: 'error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Làm mới token thất bại. Vui lòng đăng nhập lại.',
            });
        }
    }

    @Get({
        name: 'google-auth',
        description: 'Xác thực Google OAuth',
        path: '/google',
    })
    static async googleAuth(req: Request, res: Response): Promise<void> {
        passport.authenticate('google', { scope: ['profile', 'email'] })(
            req,
            res,
        );
    }

    @Get({
        name: 'google-link-auth',
        description: 'Liên kết tài khoản Google',
        path: '/google/link',
    })
    @RequireHeader()
    static async googleLinkAuth(req: Request, res: Response): Promise<void> {
        passport.authenticate('google', {
            scope: ['profile', 'email'],
            state: 'link',
        })(req, res);
    }

    @Get({
        name: 'google-auth-callback',
        description: 'Callback xác thực Google OAuth',
        path: '/google/callback',
    })
    static async googleAuthCallback(
        req: Request,
        res: Response,
    ): Promise<void> {
        passport.authenticate('google', async (err: Error, profile: any) => {
            try {
                if (err) {
                    throw err;
                }

                if (!profile) {
                    throw new Error('Không nhận được thông tin từ Google');
                }
                const mode = req.query.state;

                if (mode === 'link') {
                    // Lấy accessToken từ cookie hoặc header
                    const accessToken =
                        req.cookies.accessToken ||
                        req.headers.authorization?.split(' ')[1];
                    if (!accessToken) throw new Error('Thiếu accessToken');

                    // Giải mã accessToken để lấy userId
                    const decoded: any = jwt.verify(
                        accessToken,
                        process.env.ACCESS_TOKEN_SECRET!,
                    );
                    const userId = decoded.id;
                    if (!userId) throw new Error('Không xác định được userId');

                    // Gọi service liên kết
                    await AuthService.linkGoogleAccount(userId, profile);

                    // Redirect về frontend với thông báo thành công
                    return res.redirect(
                        `${googleOAuthConfig.frontendURL}/profile/me?link=success`,
                    );
                }
                const response = await AuthService.handleGoogleOAuth(profile);

                // Set tokens in cookies
                res.cookie('accessToken', response.accessToken, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });

                res.cookie('refreshToken', response.refreshToken, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                // Redirect to frontend with success message
                res.redirect(`${googleOAuthConfig.frontendURL}/auth/success`);
            } catch (error) {
                logger.error('Lỗi xác thực Google:', error, {
                    service: 'AuthController',
                });
                res.redirect(`${googleOAuthConfig.frontendURL}/auth/error`);
            }
        })(req, res);
    }

    @Post({
        name: 'change-password',
        description: 'Đổi mật khẩu người dùng',
        path: '/change-password',
    }, {
        body: 'ChangePasswordRequest',
    })
    @RequireHeader()
    static async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const payload: ChangePasswordRequest = req.body;
            await AuthService.changePassword(payload);
            res.json({ message: 'Password changed successfully' });
        } catch (error: unknown) {
            logger.error('Lỗi thay đổi mật khẩu:', error, {
                service: 'AuthController',
            });
            res.status(400).json({
                status: 'error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Lỗi thay đổi mật khẩu. Vui lòng thử lại sau.',
            });
        }
    }
}
