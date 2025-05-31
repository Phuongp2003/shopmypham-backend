import type { UserStatus } from './user.types';

export interface CreateUserReq {
    email: string;
    password: string;
    name: string;
    role?: string;
}

export interface UpdateUserReq {
    name?: string;
    email?: string;
    phone?: string;
}

export interface GetUserRes {
    id: string;
    email: string;
    name: string;
    role: string;
    phone: string | null;
    googleId: string | null;
    googleName: string | null;
    googleEmail: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    isNoPassword?: boolean | false;
}

export interface PaginationUserRes {
    users: GetUserRes[];
    total: number;
    page: number;
    limit: number;
}

export interface ChangePasswordReq {
    oldPassword: string;
    newPassword: string;
    otp: string;
}

export interface ChangeStatusReq {
    status: UserStatus;
}
