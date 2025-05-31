import { Router } from 'express';
import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { OrderController } from './order.controller';

// interface AuthenticatedRequest extends Request {
//   user: {
//     id: string;
//     email: string;
//     name: string;
//     role: UserRole;
//   };
// }

// const orderRouter = Router();
const router = Router();

// orderRouter.post("/", AuthMiddleware.handle, (req: Request, res: Response) =>
//   OrderController.createOrder(req as AuthenticatedRequest, res),
// );

// orderRouter.get("/", AuthMiddleware.handle, (req: Request, res: Response) =>
//   OrderController.getOrders(req as AuthenticatedRequest, res),
// );

router.get('/', AuthMiddleware.handle, OrderController.getOrders);
router.post('/', AuthMiddleware.handle, OrderController.createOrder);

router.get('/:id', AuthMiddleware.handle, OrderController.getOrderById);

router.patch(
    '/:id/status',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN]),
    OrderController.updateOrderStatus,
);

router.post('/:id/cancel', AuthMiddleware.handle, OrderController.cancelOrder);

export default router;
