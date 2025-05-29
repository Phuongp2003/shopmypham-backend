import { Request, Response } from 'express';
import { HttpException } from '@/common/exceptions/http.exception';
import { AuthenticatedRequest } from '@/common/types/express.d';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, MOMOPaymentRequest } from './types/payment.types';

export class PaymentController {
    static async createPayment(req: AuthenticatedRequest, res: Response) {
        try {
            const data: CreatePaymentDto = req.body;
            const payment = await PaymentService.createPayment(data);
            res.status(201).json(payment);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }
        }
    }

    static async createMOMOPayment(req: AuthenticatedRequest, res: Response) {
        try {
            const { orderId, amount } = req.body;
            const data: MOMOPaymentRequest = {
                orderId,
                amount,
                orderInfo: 'Payment for order ' + orderId,
                redirectUrl: `${process.env.FRONTEND_URL}/payment/result`,
                ipnUrl: `${process.env.BACKEND_URL}/api/payment/momo/callback`,
                requestType: 'captureWallet',
                extraData: Buffer.from(JSON.stringify({ orderId })).toString(
                    'base64',
                ),
            };
            const result = await PaymentService.createMOMOPayment(data);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }
        }
    }

    static async handleMOMOCallback(req: Request, res: Response) {
        try {
            const result = await PaymentService.handleMOMOCallback(req.body);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }
        }
    }

    static async getPaymentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const payment = await PaymentService.getPaymentById(id);
            res.status(200).json(payment);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }
        }
    }
}
