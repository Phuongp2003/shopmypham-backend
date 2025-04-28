import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderQueryDto, UpdateOrderStatusDto } from './types/order.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { UserRole } from '@/common/enums/user-role.enum';

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
    };
}

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    createOrder = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user.id;
            const data: CreateOrderDto = req.body;
            
            const order = await this.orderService.createOrder(userId, data);
            res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        }
    };

    getOrders = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const query: OrderQueryDto = req.query as any;
            const userId = req.user.id;
            
            // If user is not admin, only show their orders
            if (req.user.role !== UserRole.ADMIN) {
                query.userId = userId;
            }

            const result = await this.orderService.getOrders(query);
            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        }
    };

    getOrderById = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            
            const order = await this.orderService.getOrderById(id);
            
            // Check if user has permission to view this order
            if (req.user.role !== UserRole.ADMIN && order.userId !== userId) {
                throw new HttpException(HttpStatus.FORBIDDEN, 'Access denied');
            }

            res.status(HttpStatus.OK).json(order);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        }
    };

    updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const data: UpdateOrderStatusDto = req.body;
            
            // Only admin can update order status
            if (req.user.role !== UserRole.ADMIN) {
                throw new HttpException(HttpStatus.FORBIDDEN, 'Access denied');
            }

            const order = await this.orderService.updateOrderStatus(id, data);
            res.status(HttpStatus.OK).json(order);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        }
    };

    cancelOrder = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            
            const order = await this.orderService.getOrderById(id);
            
            // Check if user has permission to cancel this order
            if (req.user.role !== UserRole.ADMIN && order.userId !== userId) {
                throw new HttpException(HttpStatus.FORBIDDEN, 'Access denied');
            }

            const cancelledOrder = await this.orderService.cancelOrder(id);
            res.status(HttpStatus.OK).json(cancelledOrder);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        }
    };
} 
