import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const googleOAuthConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
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
            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    },
);
