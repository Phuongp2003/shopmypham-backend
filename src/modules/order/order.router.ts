import { Router, Request, Response } from 'express';
import { OrderController } from './order.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
    };
}

export class OrderRouter {
    private router: Router;
    private orderController: OrderController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.orderController = new OrderController();
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    private setupRoutes() {
        // Create order (authenticated users)
        this.router.post(
            '/',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.orderController.createOrder(req as AuthenticatedRequest, res)
        );

        // Get orders (authenticated users)
        this.router.get(
            '/',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.orderController.getOrders(req as AuthenticatedRequest, res)
        );

        // Get order by id (authenticated users)
        this.router.get(
            '/:id',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.orderController.getOrderById(req as AuthenticatedRequest, res)
        );

        // Update order status (admin only)
        this.router.patch(
            '/:id/status',
            this.authMiddleware.handle,
            roleMiddleware([UserRole.ADMIN]),
            (req: Request, res: Response) => this.orderController.updateOrderStatus(req as AuthenticatedRequest, res)
        );

        // Cancel order (authenticated users)
        this.router.post(
            '/:id/cancel',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.orderController.cancelOrder(req as AuthenticatedRequest, res)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
} 
