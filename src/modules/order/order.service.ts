import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';
import { OrderResponse } from './order.dto';
import {
    CreateOrderDto,
    OrderQueryDto,
    PaginatedOrderResponse,
    UpdateOrderStatusDto,
} from './order.dto';
import { OrderStatus } from './order.types';

// Định nghĩa lại interface UpdateOrderStatusDto nếu chưa có

export class OrderService {
    // PRIVATE MAPPING HELPERS
    private static mapOrder(order: any): OrderResponse {
        return {
            id: order.id,
            userId: order.userId,
            status: order.status,
            note: order.note || undefined,
            address: order.address,
            payments: order.payment ? OrderService.mapPayment(order.payment) : {
                id: '', paymentMethod: '', amount: 0, status: 'PENDING', transactionId: null, createdAt: new Date(), updatedAt: new Date()
            },
            details: (order.details || []).map(OrderService.mapOrderDetail),
        };
    }
    private static mapOrderDetail(detail: any) {
        const variant = detail.variant;
        return {
            variantId: variant.id,
            quantity: detail.quantity,
            price: detail.price,
            sku: variant.sku,
            image: variant.image,
            cosmeticName: variant.cosmetic?.name,
            options: (variant.CosmeticOption || []).map((opt: any) => ({
                key: opt.optionKey,
                value: opt.optionValue,
            })),
        };
    }
    private static mapPayment(payment: any) {
        return {
            id: payment.id,
            paymentMethod: payment.paymentMethod,
            amount: payment.amount,
            status: payment.status,
            transactionId: payment.transactionId,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        };
    }

    static async createOrder(
        userId: string,
        dto: CreateOrderDto,
    ): Promise<OrderResponse> {
        const { addressId, note, payment, details } = dto;
        const variantIds = details.map((d) => d.variantId);
        const variants = await prisma.cosmeticVariant.findMany({
            where: { id: { in: variantIds } },
            include: { cosmetic: true },
        });
        if (variants.length !== details.length) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Một số sản phẩm không tồn tại',
            );
        }
        for (const detail of details) {
            const variant = variants.find((v) => v.id === detail.variantId);
            if (!variant || variant.stock < detail.quantity) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    `Không đủ tồn kho cho sản phẩm: ${variant?.cosmetic.name || detail.variantId}`,
                );
            }
        }
        return await prisma.$transaction(async (tx) => {
            if (!addressId) {
                throw new HttpException(HttpStatus.BAD_REQUEST, 'Địa chỉ giao hàng không được bỏ trống');
            }
            const order = await tx.order.create({
                data: {
                    userId,
                    addressId,
                    note,
                    status: 'PENDING',
                    details: {
                        create: details.map((d) => ({
                            variantId: d.variantId,
                            quantity: d.quantity,
                            price: d.price,
                        })),
                    },
                },
                include: {
                    details: {
                        include: {
                            variant: {
                                include: {
                                    cosmetic: true,
                                    CosmeticOption: true,
                                },
                            },
                        },
                    },
                    address: true,
                    payment: true,
                },
            });
            const paymentData = payment ?? {
                paymentMethod: 'UNKNOWN',
                amount: details.reduce((sum, d) => sum + d.price * d.quantity, 0),
                transactionId: null,
                status: 'PENDING',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const createdPayment = await tx.payment.create({
                data: {
                    ...paymentData,
                    order: { connect: { id: order.id } },
                },
            });
            for (const detail of details) {
                await tx.cosmeticVariant.update({
                    where: { id: detail.variantId },
                    data: { stock: { decrement: detail.quantity } },
                });
            }
            const fullOrder = await tx.order.findUnique({
                where: { id: order.id },
                include: {
                    details: {
                        include: {
                            variant: {
                                include: {
                                    cosmetic: true,
                                    CosmeticOption: true,
                                },
                            },
                        },
                    },
                    address: true,
                    payment: true,
                },
            });
            if (!fullOrder || !fullOrder.address || !fullOrder.payment) {
                throw new Error('Không tìm thấy đơn hàng hoặc payment sau khi tạo!');
            }
            return OrderService.mapOrder(fullOrder);
        });
    }

    static async getOrders(
        query: OrderQueryDto,
    ): Promise<PaginatedOrderResponse> {
        const {
            status,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = query;
        const where = {
            ...(status && { status }),
        };
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    address: true,
                    details: {
                        include: {
                            variant: {
                                include: {
                                    cosmetic: true,
                                    CosmeticOption: true,
                                },
                            },
                        },
                    },
                    user: true,
                    payment: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            }),
            prisma.order.count({ where }),
        ]);
        const formattedOrders: OrderResponse[] = orders.map(OrderService.mapOrder);
        return {
            orders: formattedOrders,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    static async getOrderById(id: string): Promise<OrderResponse> {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                address: true,
                payment: true,
                details: {
                    include: {
                        variant: {
                            include: {
                                cosmetic: true,
                                CosmeticOption: true,
                            },
                        },
                    },
                },
            },
        });
        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }
        return OrderService.mapOrder(order);
    }

    static async updateOrderStatus(id: string, data: UpdateOrderStatusDto) {
        const order = await prisma.order.findUnique({
            where: { id },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        return await prisma.order.update({
            where: { id },
            data: {
                status: data.status,
            },
            include: {
                details: true,
            },
        });
    }

    static async cancelOrder(id: string) {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        if (order.status !== 'PENDING') {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Only pending orders can be cancelled',
            );
        }

        // Return stock and update order status
        return await prisma.$transaction(async (tx: any) => {
            // Update order status
            const updatedOrder = await tx.order.update({
                where: { id },
                data: {
                    status: 'CANCELLED',
                },
                include: {
                    details: true,
                },
            });

            // Return stock
            for (const detail of order.details) {
                await tx.cosmeticVariant.update({
                    where: { id: detail.variantId },
                    data: {
                        stock: {
                            increment: detail.quantity,
                        },
                    },
                });
            }

            return updatedOrder;
        });
    }
}
