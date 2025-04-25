import { z } from 'zod';
import { AuthResponse } from '@/modules/auth/auth.types';

export const LoginDto = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const RegisterDto = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    role: z.enum(['admin', 'user']).optional(),
});

export const RefreshTokenDto = z.object({
    refreshToken: z.string(),
});

export const AuthResponseDto = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginInput = z.infer<typeof LoginDto>;
export type RegisterInput = z.infer<typeof RegisterDto>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenDto>;
export type AuthResponseDto = AuthResponse; 
