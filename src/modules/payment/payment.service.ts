import axios from 'axios';
import crypto from 'crypto';

import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { OrderStatus, PaymentStatus, PrismaClient } from '@prisma/client';

import {
    CreatePaymentDto,
    MOMOPaymentCallback,
    MOMOPaymentRequest,
    MOMOPaymentResponse,
} from './types/payment.types';

export class PaymentService {
    static prisma = new PrismaClient();

    static async createPayment(data: CreatePaymentDto) {
        const order = await PaymentService.prisma.order.findUnique({
            where: { id: data.orderId },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        return await PaymentService.prisma.payment.create({
            data: {
                orderId: data.orderId,
                amount: data.amount,
                status: PaymentStatus.PENDING,
                paymentMethod: data.paymentMethod,
            },
        });
    }

    static async createMOMOPayment(
        data: MOMOPaymentRequest,
    ): Promise<MOMOPaymentResponse> {
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const partnerCode = process.env.MOMO_PARTNER_CODE;

        if (!accessKey || !secretKey || !partnerCode) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'MOMO configuration missing',
            );
        }

        const requestId = partnerCode + new Date().getTime();
        const rawSignature = `accessKey=${accessKey}&amount=${data.amount}&extraData=${data.extraData}&ipnUrl=${data.ipnUrl}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&partnerCode=${partnerCode}&redirectUrl=${data.redirectUrl}&requestId=${requestId}&requestType=${data.requestType}`;

        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode,
            partnerName: 'Test',
            storeId: process.env.MOMO_STORE_ID,
            requestId,
            amount: data.amount,
            orderId: data.orderId,
            orderInfo: data.orderInfo,
            redirectUrl: data.redirectUrl,
            ipnUrl: data.ipnUrl,
            lang: 'vi',
            requestType: data.requestType,
            extraData: data.extraData,
            signature,
        };

        try {
            const response = await axios.post(
                process.env.MOMO_URL_CREATE!,
                requestBody,
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to create MOMO payment',
            );
        }
    }

    static async handleMOMOCallback(data: MOMOPaymentCallback) {
        const payment = await PaymentService.prisma.payment.findFirst({
            where: { orderId: data.orderId },
        });

        if (!payment) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Payment not found');
        }

        if (data.resultCode === 0) {
            await PaymentService.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: PaymentStatus.COMPLETED,
                    transactionId: data.transId,
                },
            });

            await PaymentService.prisma.order.update({
                where: { id: payment.orderId },
                data: {
                    status: OrderStatus.PROCESSING,
                },
            });
        } else {
            await PaymentService.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: PaymentStatus.FAILED,
                },
            });
        }

        return { message: 'Success' };
    }

    static async getPaymentById(id: string) {
        const payment = await PaymentService.prisma.payment.findUnique({
            where: { id },
        });

        if (!payment) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Payment not found');
        }

        return payment;
    }
}
