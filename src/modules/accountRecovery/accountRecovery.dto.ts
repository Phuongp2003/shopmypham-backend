export interface AccountRecoveryOtpCache {
    otp: string;
    attempts: number;
    bannedUntil?: number;
}

export interface GenerateOtpRequest {
    email: string;
}
