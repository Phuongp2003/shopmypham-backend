import axios from 'axios';
import crypto from 'crypto';

import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';

import {
    CreatePaymentDto,
    MOMOPaymentCallback,
    MOMOPaymentRequest,
    MOMOPaymentResponse,
} from './payment.types';
import { prisma } from '@/config/prisma';
export class PaymentService {
    static async createPayment(data: CreatePaymentDto) {
        const order = await prisma.order.findUnique({
            where: { id: data.orderId },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        return await prisma.payment.create({
            data: {
                order: { connect: { id: data.orderId } },
                amount: data.amount,
                status: 'COMPLETED',
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
            partnerName: 'ShopMyPhamDPT',
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
        const secretKey = process.env.MOMO_SECRET_KEY;
        if (!secretKey) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'MOMO secret key missing',
            );
        }

        // Tạo rawSignature theo tài liệu MoMo
        const rawSignature =
            `accessKey=${process.env.MOMO_ACCESS_KEY}` +
            `&amount=${data.amount}` +
            `&extraData=${data.extraData}` +
            `&message=${data.message}` +
            `&orderId=${data.orderId}` +
            `&orderInfo=${data.orderInfo}` +
            `&orderType=${data.orderType}` +
            `&partnerCode=${data.partnerCode}` +
            `&payType=${data.payType}` +
            `&requestId=${data.requestId}` +
            `&responseTime=${data.responseTime}` +
            `&resultCode=${data.resultCode}` +
            `&transId=${data.transId}`;

        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        if (signature !== data.signature) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Invalid MoMo signature',
            );
        }

        const payment = await prisma.payment.findFirst({
            where: { order: { id: data.orderId } },
            include: { order: true },
        });

        if (!payment) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Payment not found');
        }

        if (data.resultCode === 0) {
            await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: 'COMPLETED',
                    transactionId: String(data.transId),
                },
            });

            const orderId = payment.order?.id || data.orderId;
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: 'PENDING',
                },
            });
        } else {
            await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: 'FAILED',
                },
            });
            await prisma.order.update({
                where: { id: payment.order?.id },
                data: {
                    status: 'CANCELLED',
                },
            });
        }
        return { message: 'Success' };
    }

    static async getPaymentById(id: string) {
        const payment = await prisma.payment.findUnique({
            where: { id },
        });

        if (!payment) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Payment not found');
        }

        return payment;
    }
}
