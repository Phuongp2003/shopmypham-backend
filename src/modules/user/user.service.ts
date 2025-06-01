import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { User } from './user.types';
import {
    CreateUserReq,
    UpdateUserReq,
    GetUserRes,
    ChangePasswordReq,
    type ChangeStatusReq,
    type PaginationUserRes,
} from './user.dto';
import crypto from 'crypto';
import { AccountRecoveryService } from '../accountRecovery/accountRecovery.service';
import { prisma } from '@/config/prisma';
import { EmailService } from '@/common/services/email.service';
import { UserRole } from '@/common/enums/user-role.enum';
import { CacheService } from '@/common/services/cache.service';

export class UserService {
    private static readonly stackKey = 'userKey';
    static async findAll(
        page: number,
        limit: number,
    ): Promise<PaginationUserRes> {
        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        const cacheKey = CacheService.generateKeyV2('user', { page, limit });
        const cachedUsers = await CacheService.get(cacheKey);
        if (cachedUsers) {
            CacheService.refreshCache(cacheKey);
            return cachedUsers as PaginationUserRes;
        }
        const total = await prisma.user.count();
        const response = {
            users: users.map((user) => UserService.mapToResponse(user)),
            total,
            page,
            limit,
        };
        await CacheService.set(cacheKey, response);
        await CacheService.pushToStack(UserService.stackKey, cacheKey);
        return response;
    }

    static async findById(id: string): Promise<GetUserRes> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
        }
        const isNoPassword = user.password === ``;
        return UserService.mapToResponse(user, isNoPassword);
    }

    static async findByEmail(email: string): Promise<GetUserRes> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
        }
        const isNoPassword = user.password === ``;
        return UserService.mapToResponse(user, isNoPassword);
    }

    static async create(data: CreateUserReq): Promise<GetUserRes> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new HttpException(HttpStatus.BAD_REQUEST, 'Email đã tồn tại');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const secretKey = crypto.randomBytes(32).toString('hex');
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                secretKey,
            },
        });
        await CacheService.clearStack(UserService.stackKey);
        return UserService.mapToResponse(user);
    }

    static async update(id: string, data: UpdateUserReq): Promise<GetUserRes> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
        }
        if (data.email && data.email !== user.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Email already exists',
                );
            }
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
        });
        const isNoPassword = updatedUser.password === ``;
        await CacheService.clearStack(UserService.stackKey);
        return UserService.mapToResponse(updatedUser, isNoPassword);
    }

    static async changeStatus(
        id: string,
        data: ChangeStatusReq,
    ): Promise<void> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
        }
        await prisma.user.update({
            where: { id },
            data: { status: data.status },
        });
        await CacheService.clearStack(UserService.stackKey);
    }

    static async changePassword(
        id: string,
        data: ChangePasswordReq,
    ): Promise<void> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Tài khoản không tồn tại',
            );
        }
        if (!(await AccountRecoveryService.verifyOtp(user.email, data.otp))) {
            throw new HttpException(HttpStatus.BAD_REQUEST, 'Nhập OTP sai');
        }
        const isPasswordCorrect = await bcrypt.compare(
            data.oldPassword,
            user.password,
        );
        if (!isPasswordCorrect && user.password !== ``) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Mật khẩu cũ không đúng',
            );
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        await CacheService.clearStack(UserService.stackKey);
    }

    static async unlinkGoogleAccount(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Tài khoản không tồn tại',
            );
        }
        if (!user.googleId) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Tài khoản chưa liên kết với Google!',
            );
        }
        if (user.password === ``) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Tài khoản chưa có mật khẩu, vui lòng đổi mật khẩu trước khi huỷ liên kết!',
            );
        }
        await prisma.user.update({
            where: { id },
            data: {
                googleId: null,
                googleName: null,
                googleEmail: null,
            },
        });
        await EmailService.sendEmailWithTemplate(
            user.email,
            'Bạn đã gỡ liên kết với tài khoản Google!',
            'Bạn đã gỡ liên kết với tài khoản Google, nếu có bất khì sai sót gì, hãy liên hệ với chúng tối trong vòng 12h để giải quyết!',
        );
        await CacheService.clearStack(UserService.stackKey);
    }

    static async delete(id: string): Promise<void> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
        }
        if (user.role === UserRole.ADMIN) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Không thể xóa tài khoản admin',
            );
        }
        await prisma.user.delete({
            where: { id },
        });
        await EmailService.sendEmailWithTemplate(
            user.email,
            'Tài khoản của bạn đã bị xóa',
            'Tài khoản của bạn đã bị xóa, nếu có bất khì sai sót gì, hãy liên hệ với chúng tối trong vòng 12h để giải quyết!',
        );
        await CacheService.clearStack(UserService.stackKey);
    }

    private static mapToResponse(
        user: User,
        isNoPassword?: boolean,
    ): GetUserRes {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            googleId: user.googleId,
            googleName: user.googleName,
            googleEmail: user.googleEmail,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isNoPassword: isNoPassword || false,
        };
    }
}
