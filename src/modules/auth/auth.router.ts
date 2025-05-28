import { Router } from "express";
import passport from "passport";

import { googleStrategy } from "../../config/google-oauth.config";
import { AuthController } from "./auth.controller";

const router = Router();

// Initialize passport with Google strategy
passport.use(googleStrategy);

// Public routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

// Google OAuth routes
router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleAuthCallback);

// Password change and recovery routes
router.post("/change-password", AuthController.changePassword);

export default router;
