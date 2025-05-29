import { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '../enums/http-status.enum';
import { UserRole } from '../enums/user-role.enum';
import { HttpException } from '../exceptions/http.exception';

export const roleMiddleware = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            if (!user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'Vui lòng đăng nhập để tiếp tục. Không tìm thấy thông tin người dùng.',
                );
            }

            if (!roles.includes(user.role as UserRole)) {
                const roleNames = roles
                    .map((role) => {
                        switch (role) {
                            case UserRole.ADMIN:
                                return 'Quản trị viên';
                            case UserRole.MANAGER:
                                return 'Quản lý';
                            case UserRole.USER:
                                return 'Người dùng';
                            default:
                                return role;
                        }
                    })
                    .join(' hoặc ');

                throw new HttpException(
                    HttpStatus.FORBIDDEN,
                    `Bạn không có quyền truy cập chức năng này. Yêu cầu quyền ${roleNames}.`,
                );
            }

            next();
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({
                    status: 'error',
                    message: error.message,
                    code: error.status,
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'error',
                    message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                });
            }
        }
    };
};
