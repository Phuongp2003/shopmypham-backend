import { type User } from '@/modules/user/user.types';

export type AuthUser = Pick<User, 'id' | 'email' | 'role' | 'name'> & {
    googleId?: string;
};

/**
 * @swagger
 * title: AuthTokens
 * type: object
 * properties:
 *   accessToken:
 *     type: string
 *     description: Access token
 *   refreshToken:
 *     type: string
 *     description: Refresh token
 */
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

/**
 * @swagger
 * title: AuthPayload
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID người dùng
 *   email:
 *     type: string
 *     description: Email người dùng
 *   role:
 *     type: string
 *     description: Vai trò người dùng
 *   name:
 *     type: string
 *     description: Tên người dùng
 *   googleId:
 *     type: string
 *     description: Google ID (nếu có)
 *   status:
 *     type: string
 *     description: Trạng thái tài khoản
 *   exp:
 *     type: number
 *     description: Thời gian hết hạn (timestamp)
 *   iat:
 *     type: number
 *     description: Thời gian phát hành (timestamp)
 */
export type AuthPayload = {
    id: string;
    email: string;
    role: string;
    name: string;
    googleId?: string;
    status: string;
    exp?: number;
    iat?: number;
};
