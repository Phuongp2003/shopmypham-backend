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
    prisma: any;
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
                include: { details: {
                    include: {
                        variant: {
                            include: { cosmetic: true },
                        },
                    },
                } },
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
                details: {
                    include: {
                        variant: {
                            include: { cosmetic: true }
                        }
                    }
                },
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
                name: d.variant.cosmetic.name + ' - ' + d.variant.name,
                quantity: d.quantity,
                price: d.price,
                image: d.variant.cosmetic.image ?? '',
            })),
            payment: {
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
            userId,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = query;
        
        const where = {
            ...(status && { status }),
            userId, // Assuming userId is passed in query
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

        const formattedOrders: OrderResponse[] = orders.map((order) => ({
            id: order.id,
            userId: order.user.id,
            status: order.status,
            address: order.address!,
            note: order.note || undefined,
            payment: order.payment ?? {
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
                name: detail.variant.cosmetic.name + ' - ' + detail.variant.name,
                quantity: detail.quantity,
                price: detail.price,
                image: detail.variant.cosmetic.image ?? '',
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

    static async getOrderById(userId: string, id: string): Promise<OrderResponse> {
        const order = await prisma.order.findUnique({
            where: { id, userId },
            include: {
                details: {
                    include: {
                        variant: {
                            include: {
                                cosmetic: true,
                            },
                        },
                    },
                },
                address: true,
                payment: true,
            },
        });
    
        if (!order) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Không tìm thấy đơn hàng của bạn');
        }
    
        // Kiểm tra dữ liệu cần thiết có đầy đủ không
        if (!order.address) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Order address missing');
        }
        if (!order.payment) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Order payment missing');
        }
    
        const response: OrderResponse = {
            id: order.id,
            userId: order.userId,
            status: order.status,
            note: order.note ?? undefined,
            address: order.address,
            payment: {
                id: order.payment.id,
                paymentMethod: order.payment.paymentMethod,
                amount: order.payment.amount,
                status: order.payment.status,
                transactionId: order.payment.transactionId,
                createdAt: order.payment.createdAt,
                updatedAt: order.payment.updatedAt,
            },
            details: order.details.map((detail) => ({
                variantId: detail.variantId,
                name: detail.variant.cosmetic.name + ' - ' + detail.variant.name,
                quantity: detail.quantity,
                price: detail.price,
                image: detail.variant.cosmetic.image ?? '',
            })),
        };
    
        return response;
    }
    

    static async updateOrderById(
        userId: string,
        id: string,
        data: UpdateOrderStatusDto,
      ): Promise<OrderResponse> {
        const { status, addressId  } = data;
      
        // 1. Tìm đơn hàng
        const order = await prisma.order.findUnique({
          where: { id },
        });
      
        if (!order) {
          throw new HttpException(HttpStatus.NOT_FOUND, 'Không tìm thấy đơn hàng');
        }
      
        // 2. Nếu muốn thay đổi địa chỉ => chỉ được phép nếu status hiện tại là PENDING
        if (addressId && order.status !== 'PENDING') {
          throw new HttpException(
            HttpStatus.BAD_REQUEST,
            'Chỉ được phép thay đổi địa chỉ khi đơn hàng đang chờ xử lý (PENDING)',
          );
        }
      
        // 3. Nếu có addressId => kiểm tra địa chỉ hợp lệ
        if (addressId) {
          const address = await prisma.address.findUnique({
            where: { id: addressId },
          });
      
          if (!address || address.userId !== userId) {
            throw new HttpException(
              HttpStatus.BAD_REQUEST,
              'Địa chỉ không hợp lệ hoặc không thuộc về người dùng này',
            );
          }
        }
      
        // 4. Cập nhật đơn hàng
        const updatedOrder = await prisma.order.update({
          where: { id },
          data: {
            ...(addressId && { addressId }), // chỉ set nếu hợp lệ
            status,
          },
          include: {
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
            address: true,
            payment: true,
          },
        });
      
        const response: OrderResponse = {
            id: updatedOrder.id,
            userId: updatedOrder.userId,
            status: updatedOrder.status,
            note: updatedOrder.note ?? undefined,
            address: updatedOrder.address,
            payment: updatedOrder.payment,
            details: updatedOrder.details.map((detail) => ({
                variantId: detail.variantId,
                name: detail.variant.cosmetic.name + ' - ' + detail.variant.name,
                quantity: detail.quantity,
                price: detail.price,
                image: detail.variant.cosmetic.image ?? '',
            })),
        };

        return response;
      }

    static async getAllOrders(
        query: OrderQueryDto,
        
    ): Promise<PaginatedOrderResponse> {
        const {
            status,
            userId,
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
            payment: order.payment ?? {
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
                name: detail.variant.cosmetic.name + ' - ' + detail.variant.name,
                quantity: detail.quantity,
                price: detail.price,
                image: detail.variant.cosmetic.image ?? '',
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
}
