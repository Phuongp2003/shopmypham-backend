import { Request, Response } from 'express';
import { z } from 'zod';
import { logger } from '@/common/logger/logger.factory';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { UserRole } from '@/common/enums/user-role.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { ErrorResponse } from '@/common/interfaces/error-response.interface';
import { OrderService } from './order.service';
import { prisma } from '@/config/prisma';
import {
    CreateOrderDto,
    UpdateOrderStatusDto,
    OrderQueryDto,
} from './order.dto';

import {
    Controller,
    Get,
    Post,
    Put,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
    };
}
@Controller({ tag: 'Orders', description: 'Quản lý đơn hàng' })
export class OrderController {
    @Get(
        {
            name: 'get-orders-by-user',
            description: 'Lấy danh sách đơn hàng',
            path: '/',
        },
        {
            query: 'OrderQueryDto',
            response: 'PaginatedOrderResponse',
        },
    )
    @RequireHeader()
    static async getOrders(req: Request, res: Response): Promise<void> {
        console.log('Get orders called. User:', req.user);
        try {
            if (!req.user) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
            }
            const user = req.user;
            // Lấy params từ query và ép kiểu
            const params: OrderQueryDto = {
                ...req.query,
                userId: user.id,
            } as OrderQueryDto;
            const result = await OrderService.getOrders(params);
            res.status(200).json(result);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Post(
        {
            name: 'create-order',
            description: 'Tạo đơn hàng mới',
            path: '/',
        },
        {
            body: 'CreateOrderDto',
            response: 'OrderResponse',
        },
    )
    @RequireHeader()
    static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            //Lấy dữ liệu từ body và user từ request
            const data: CreateOrderDto = req.body;
            if (!req.user)
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            const userId = req.user.id;
            console.log('Creating order for user:', userId, 'with data:', data);

            const user = await prisma.user.findUnique({
                where: { id: '34906a8a-02d8-4721-ad2e-7b77aec89a13' },
            });
            console.log('Found user:', user);

            const order = await OrderService.createOrder(userId, data);
            res.status(HttpStatus.CREATED).json(order);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Get(
        {
            name: 'get-order-by-id',
            description: 'Lấy chi tiết đơn hàng theo ID',
            path: '/:id',
        },
        {
            response: 'OrderResponse',
        },
    )
    @RequireHeader()
    static async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Missing or invalid 'id' parameter",
                });
                return;
            }
            if (!req.user)
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            const userId = req.user.id;
            const order = await OrderService.getOrderById(userId,id);
            console.log('Found order:', order);
            res.status(HttpStatus.OK).json(order);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Put(   
        {
            name: 'update-order-status',
            description: 'Cập nhật trạng thái đơn hàng',
            path: '/:id',
        },
        {
            body: 'UpdateOrderStatusDto',
            response: 'OrderResponse',
        },
    )
    @RequireHeader()
    static async updateOrderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data: UpdateOrderStatusDto =req.body;
            console.log('Updating order with ID:', id, 'and data:', data);
            if (!id || typeof id !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Missing or invalid 'id' parameter",
                });
                return;
            }
            if (!req.user)
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            const userId = req.user.id;
            const order = await OrderService.updateOrderById(
                userId,
                id,
                data,
            );
            res.status(HttpStatus.OK).json(order);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Get(
        {
            name: 'get-all-orders',
            description: 'Lấy danh sách đơn hàng',
            path: '/ADMIN',
        },
        {
            query: 'OrderQueryDto',
            response: 'PaginatedOrderResponse',
        },
    )
    @RequireHeader()
    static async getAllOrders(req: Request, res: Response): Promise<void> {
        console.log('Get orders called. User:', req.user);
        try {
            if (!req.user) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
            }
            const user = req.user;
            // Lấy params từ query và ép kiểu
            const params: OrderQueryDto = {
                ...req.query,
                userId: user.id,
            } as OrderQueryDto;
            const result = await OrderService.getAllOrders(params);
            res.status(200).json(result);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }
    // @Delete(
    //     {
    //         name: 'cancel-order',
    //         description: 'Hủy đơn hàng',
    //         path: '/orders/:id',
    //     },
    //     {
    //         params: 'id',
    //         //response: "OrderResponse",
    //     },
    // )
    // @RequireHeader()
    // static async cancelOrder(req: AuthenticatedRequest, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         const userId = req.user.id;
    //         const order = await OrderController.orderService.getOrderById(id);
    //         if (req.user.role !== UserRole.ADMIN && order.userId !== userId) {
    //             throw new HttpException(HttpStatus.FORBIDDEN, 'Access denied');
    //         }
    //         const cancelledOrder =
    //             await OrderController.orderService.cancelOrder(id);
    //         res.status(HttpStatus.OK).json(cancelledOrder);
    //     } catch (error: any) {
    //         logger.error('Order cancel error:', error, {
    //             service: 'OrderController',
    //         });
    //         if (error instanceof HttpException) {
    //             res.status(error.status).json({
    //                 status: 'error',
    //                 message: error.message,
    //             });
    //         } else {
    //             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //                 status: 'error',
    //                 message: 'Internal server error',
    //             });
    //         }
    //     }
    // }
}
