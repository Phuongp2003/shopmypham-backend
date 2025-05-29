import { User } from '@prisma/client';

export type AuthUser = Pick<User, 'id' | 'email' | 'role' | 'name'> & {
    googleId?: string;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

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
