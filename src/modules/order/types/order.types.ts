import { OrderStatus } from '@prisma/client';

export interface Order {
    id: string;
    userId: string;
    status: OrderStatus;
    shippingAddress: string;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderDetail {
    id: string;
    orderId: string;
    cosmeticId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderWithDetails extends Order {
    details: OrderDetail[];
}

export interface CreateOrderDto {
    shippingAddress: string;
    note?: string;
    details: {
        cosmeticId: string;
        quantity: number;
        price: number;
    }[];
}

export interface UpdateOrderStatusDto {
    status: OrderStatus;
}

export interface OrderQueryDto {
    status?: OrderStatus;
    userId?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
} 
