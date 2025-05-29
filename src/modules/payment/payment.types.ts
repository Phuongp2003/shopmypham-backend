import type { Order } from '@/modules/order/order.types';
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

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
