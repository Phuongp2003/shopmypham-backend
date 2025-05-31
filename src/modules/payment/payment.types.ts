import type { Order } from '@/modules/order/order.types';
import { PaymentStatus } from '@prisma/client';
export type Payment = {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
    order: Order;
};

