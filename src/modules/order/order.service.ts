import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';
import { OrderResponse } from './order.dto';
import {
    CreateOrderDto,
    OrderQueryDto,
    UpdateOrderStatusDto,
    PaginatedOrderResponse,
} from './order.dto';

export class OrderService {
    static async createOrder(
        userId: string,
        dto: Omit<CreateOrderDto, 'details'>, // Bỏ details khỏi dto
    ): Promise<OrderResponse> {
        const { addressId, note, payment } = dto;
        // Lấy cart và cart details
        return await prisma.$transaction(async (tx) => {
            // 1. Lấy cart và cart details
            const cart = await tx.cart.findUnique({
                where: { userId },
                include: { details: true },
            });

            if (!cart || cart.details.length === 0) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Giỏ hàng trống hoặc không tồn tại',
                );
            }

            const cartDetails = cart.details;

            // 2. Lấy danh sách variantId từ cart
            const variantIds = cartDetails.map((d) => d.variantId);

            // 3. Kiểm tra tất cả các variant có tồn tại không + lấy thông tin tồn kho và giá
            const variants = await tx.cosmeticVariant.findMany({
                where: { id: { in: variantIds } },
                include: { cosmetic: true },
            });

            if (variants.length !== variantIds.length) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Một hoặc nhiều sản phẩm không tồn tại',
                );
            }

            // 4. Tạo map để kiểm tra tồn kho và lấy giá
            const variantMap = new Map(
                variants.map((v) => [
                    v.id,
                    { stock: v.stock, price: v.price, name: v.cosmetic.name },
                ]),
            );

            // 5. Kiểm tra tồn kho
            for (const item of cartDetails) {
                const variantInfo = variantMap.get(item.variantId);
                if (!variantInfo || variantInfo.stock < item.quantity) {
                    throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        `Không đủ tồn kho cho sản phẩm: ${variantInfo?.name || item.variantId}`,
                    );
                }
            }

            // 6. Kiểm tra address
            if (!addressId) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Địa chỉ giao hàng không được bỏ trống',
                );
            }

            const address = await tx.address.findUnique({
                where: { id: addressId },
            });

            if (!address || address.userId !== userId) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Địa chỉ không hợp lệ hoặc không thuộc về người dùng này',
                );
            }

            // 7. Chuẩn bị order details từ cart
            const detailsData = cartDetails.map((d) => ({
                variantId: d.variantId,
                quantity: d.quantity,
                price: variantMap.get(d.variantId)?.price ?? 0,
            }));
            // Tạo order
            const order = await tx.order.create({
                data: {
                    userId,
                    addressId,
                    note,
                    status: 'PENDING',
                    details: {
                        create: detailsData,
                    },
                },
                include: {
                    details: true,
                    address: true,
                },
            });

            // Tạo payment bắt buộc luôn có
            // Nếu không có payment input thì tạo 1 payment mặc định
             // 9. Tạo thanh toán
        const totalAmount = detailsData.reduce((sum, d) => sum + d.price * d.quantity, 0);

        const paymentData = payment ?? {
            paymentMethod: 'UNKNOWN',
            amount: totalAmount,
            transactionId: null,
            status: 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdPayment = await tx.payment.create({
            data: {
                ...paymentData,
                order: {
                    connect: { id: order.id },
                },
            },
        });

        // 10. Cập nhật tồn kho
        for (const detail of detailsData) {
            await tx.cosmeticVariant.update({
                where: { id: detail.variantId },
                data: {
                    stock: { decrement: detail.quantity },
                },
            });
        }

        // 11. Lấy lại đơn hàng đầy đủ
        const fullOrder = await tx.order.findUnique({
            where: { id: order.id },
            include: {
                details: true,
                address: true,
                payment: true,
            },
        });

        if (!fullOrder || !fullOrder.address || !fullOrder.payment) {
            throw new Error('Không tìm thấy đơn hàng hoặc payment sau khi tạo');
        }

        return {
            id: fullOrder.id,
            userId: fullOrder.userId,
            status: fullOrder.status,
            note: fullOrder.note || undefined,
            address: fullOrder.address,
            details: fullOrder.details.map((d) => ({
                variantId: d.variantId,
                quantity: d.quantity,
                price: d.price,
            })),
            payments: {
                id: fullOrder.payment.id,
                paymentMethod: fullOrder.payment.paymentMethod,
                amount: fullOrder.payment.amount,
                status: fullOrder.payment.status,
                transactionId: fullOrder.payment.transactionId,
                createdAt: fullOrder.payment.createdAt,
                updatedAt: fullOrder.payment.updatedAt,
            },
        };
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
            //userId= query.userId, // Assuming userId is passed in query
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

        console.log('Orders:', orders);
        // if (!orders || orders.length === 0) {
        //   throw new HttpException(HttpStatus.NOT_FOUND, 'No orders found');
        // }

        const formattedOrders: OrderResponse[] = orders.map((order) => ({
            id: order.id,
            userId: order.user.id,
            status: order.status,
            address: order.address!,
            note: order.note || undefined,
            payments: order.payment ?? {
                id: '',
                paymentMethod: '',
                amount: 0,
                status: 'PENDING',
                transactionId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            details: order.details.map((detail) => ({
                variantId: detail.variant.id,
                quantity: detail.quantity,
                price: detail.price,
            })),
        }));

        return {
            orders: formattedOrders,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getOrderById(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        return order;
    }

    async updateOrderStatus(id: string, data: UpdateOrderStatusDto) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        return await this.prisma.order.update({
            where: { id },
            data: {
                status: data.status,
            },
            include: {
                details: true,
            },
        });
    }

    async cancelOrder(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });

        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Order not found');
        }

        if (order.status !== OrderStatus.PENDING) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Only pending orders can be cancelled',
            );
        }

        // Return stock and update order status
        return await this.prisma.$transaction(async (tx) => {
            // Update order status
            const updatedOrder = await tx.order.update({
                where: { id },
                data: {
                    status: OrderStatus.CANCELLED,
                },
                include: {
                    details: true,
                },
            });

            // Return stock
            for (const detail of order.details) {
                await tx.cosmetic.update({
                    where: { id: detail.cosmeticId },
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
