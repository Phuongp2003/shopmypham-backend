import { Request, Response } from 'express';
import type { GenerateOtpRequest } from './accountRecovery.dto';
import { AccountRecoveryService } from './accountRecovery.service';
import { logger } from '@/common/logger/logger.factory';

export class AccountRecoveryController {
    static async generateOtp(req: Request, res: Response): Promise<void> {
        try {
            const payload: GenerateOtpRequest = req.body;
            const response = await AccountRecoveryService.generateOtp(
                payload.email,
            );
            res.json(response);
        } catch (error: unknown) {
            logger.error('Lỗi tạo OTP:', error, {
                service: 'AccountRecoveryController',
            });
            res.status(500).json({
                status: 'error',
                message: 'Lỗi tạo OTP. Vui lòng thử lại sau.',
            });
        }
    }

    static async regenerateOtp(req: Request, res: Response): Promise<void> {
        try {
            const payload: GenerateOtpRequest = req.body;
            await AccountRecoveryService.regenerateOtp(payload.email);
        } catch (error: unknown) {
            logger.error('Lỗi tạo OTP:', error, {
                service: 'AccountRecoveryController',
            });
            res.status(500).json({
                status: 'error',
                message: 'Lỗi tạo OTP. Vui lòng thử lại sau.',
            });
        }
    }
}
