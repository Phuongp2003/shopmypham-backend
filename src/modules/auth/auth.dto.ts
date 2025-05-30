/**
 * @swagger
 * title: LoginRequest
 * type: object
 * properties:
 *   email:
 *     type: string
 *     description: Email người dùng
 *   password:
 *     type: string
 *     description: Mật khẩu người dùng
 */
export type LoginRequest = {
    email: string;
    password: string;
};

/**
 * @swagger
 * title: RegisterRequest
 * type: object
 * properties:
 *   email:
 *     type: string
 *     description: Email người dùng
 *   password:
 *     type: string
 *     description: Mật khẩu người dùng
 *   name:
 *     type: string
 *     description: Tên người dùng
 *   role:
 *     type: string
 *     enum: [admin, user]
 *     description: Vai trò người dùng
 */
export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
    role?: 'admin' | 'user';
};

/**
 * @swagger
 * title: RefreshToken
 * type: object
 * properties:
 *   refreshToken:
 *     type: string
 *     description: Refresh token
 */
export type RefreshToken = {
    refreshToken: string;
};

/**
 * @swagger
 * title: AuthResponse
 * type: object
 * properties:
 *   accessToken:
 *     type: string
 *     description: Access token
 *   refreshToken:
 *     type: string
 *     description: Refresh token
 */
export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

/**
 * @swagger
 * title: ChangePasswordRequest
 * type: object
 * properties:
 *   email:
 *     type: string
 *     description: Email người dùng
 *   otp:
 *     type: string
 *     description: Mã OTP xác thực
 *   oldPassword:
 *     type: string
 *     description: Mật khẩu cũ
 *   newPassword:
 *     type: string
 *     description: Mật khẩu mới
 */
export type ChangePasswordRequest = {
    email: string;
    otp: string;
    oldPassword: string;
    newPassword: string;
};
