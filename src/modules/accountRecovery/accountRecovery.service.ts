import { EmailService } from "@/common/services/email.service";
import { CacheService } from "@/common/services/cache.service";
import { AccountRecoveryOtpCache } from "./accountRecovery.dto";
export class AccountRecoveryService {
    static async generateOtp(email: string): Promise<string> {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const key = `account-recovery-otp-${email}`;
        const otpCache: AccountRecoveryOtpCache = { otp, attempts: 0 };
        await CacheService.set(key, otpCache, 10 * 60);
        return otp;
    }

    static async regenerateOtp(email: string): Promise<string> {
        const key = `account-recovery-otp-${email}`;
        await CacheService.delete(key);
        return await this.generateOtp(email);
    }

    static async verifyOtp(email: string, otp: string): Promise<boolean> {
        const key = `account-recovery-otp-${email}`;
        const otpData = await CacheService.get<AccountRecoveryOtpCache>(key);
        if (this.isBanned(otpData)) {
            throw new Error('Too many failed attempts. Please try again after 12 hours.');
        }
        if (!otpData || otpData.otp !== otp) {
            await this.handleFailedAttempt(email, key, otpData);
            return false;
        }
        await this.handleSuccess(key);
        return true;
    }

    private static isBanned(otpData?: AccountRecoveryOtpCache | null): boolean {
        return !!(otpData && otpData.bannedUntil && Date.now() < otpData.bannedUntil);
    }

    private static async handleFailedAttempt(email: string, key: string, otpData?: AccountRecoveryOtpCache | null): Promise<void> {
        let attempts = otpData?.attempts || 0;
        attempts++;
        if (attempts >= 4) {
            const bannedUntil = Date.now() + 12 * 60 * 60 * 1000; // 12h
            await CacheService.set(key, { ...otpData, attempts, bannedUntil }, 12 * 60 * 60);
            await EmailService.sendEmailWithTemplate(
                email,
                'Account Recovery Locked',
                `<p>You have entered the wrong OTP too many times. Your account recovery is locked for 12 hours to prevent abuse. If this was not you, please contact support.</p>`
            );
            throw new Error('Too many failed attempts. You are banned for 12 hours.');
        } else {
            await CacheService.set(key, { ...otpData, attempts }, 10 * 60);
        }
    }

    private static async handleSuccess(key: string): Promise<void> {
        await CacheService.delete(key);
    }

    static async sendOtp(email: string): Promise<void> {
        const otp = await this.generateOtp(email);
        await EmailService.sendOtpEmail(email, otp);
    }
    
    static async resendOtp(email: string): Promise<void> {
        const otp = await this.regenerateOtp(email);
        await EmailService.sendOtpEmail(email, otp);
    }

    static async sendResetPasswordEmail(email: string, token: string): Promise<void> {
        await EmailService.sendResetPasswordEmail(email, token);
    }
}
