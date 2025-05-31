import { Request, Response } from 'express';
import { HttpException } from '@/common/exceptions/http.exception';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, MOMOPaymentRequest } from './payment.types';
import {
    Controller,
    Post,
    Get,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';
import { logger } from '@/common/logger/logger.factory';

@Controller({ tag: 'Payment', description: 'Quản lý thanh toán' })
export class PaymentController {
    @Post(
        {
            name: 'create-payment',
            description: 'Tạo thanh toán thông thường',
            path: '/',
        },
        {
            body: 'CreatePaymentDto',
            response: 'Payment',
        },
    )
    @RequireHeader()
    static async createPayment(req: Request, res: Response) {
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

    @Post(
        {
            name: 'create-momo-payment',
            description: 'Tạo thanh toán MoMo',
            path: '/momo',
        },
        {
            body: 'MOMOPaymentRequest',
            response: 'MOMOPaymentResponse',
        },
    )
    @RequireHeader()
    static async createMOMOPayment(req: Request, res: Response) {
        try {
            const { orderId, amount } = req.body;
            const data: MOMOPaymentRequest = {
                orderId,
                amount,
                orderInfo: 'Payment for order ' + orderId,
                redirectUrl: `${process.env.FRONTEND_URL}/order/${orderId}`,
                ipnUrl: `${process.env.BACKEND_URL}/payment/momo/callback`,
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

    @Post(
        {
            name: 'momo-callback',
            description: 'Nhận callback từ MoMo',
            path: '/momo/callback',
        },
        {
            body: 'MOMOPaymentCallback',
            response: 'object',
        },
    )
    static async handleMOMOCallback(req: Request, res: Response) {
        try {
            logger.info('MOMO callback received', { body: req.body });
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

    @Get(
        {
            name: 'get-payment-by-id',
            description: 'Lấy thông tin thanh toán theo ID',
            path: '/:id',
        },
        {
            response: 'Payment',
        },
    )
    @RequireHeader()
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
