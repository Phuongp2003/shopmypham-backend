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
            // This function will be implemented in the auth service
            if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
                return done(new Error('Email not found'), false);
            }
            const user = {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                role: 'user' as UserRole, // Assuming a default role for simplicity
            };
            return done(null, user);
        } catch (error) {
            return done(error as Error);
        }
    },
);
