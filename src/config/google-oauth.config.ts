import type { UserRole } from '@/common/enums/user-role.enum';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const googleOAuthConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL:
        `${process.env.BACKEND_URL}/auth/google/callback` ||
        'http://localhost:3000/auth/google/callback',
    frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
    scope: ['profile', 'email'],
};

export const googleStrategy = new GoogleStrategy(
    {
        clientID: googleOAuthConfig.clientID,
        clientSecret: googleOAuthConfig.clientSecret,
        callbackURL: googleOAuthConfig.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    },
);
