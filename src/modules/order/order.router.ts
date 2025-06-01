import { Router } from 'express';
import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { OrderController } from './order.controller';

const router = Router();

router.get('/', AuthMiddleware.handle, OrderController.getOrders);
router.post('/', AuthMiddleware.handle, OrderController.createOrder);
router.get(
    '/ADMIN',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN]),
    OrderController.getAllOrders,
);

router.get('/:id', AuthMiddleware.handle, OrderController.getOrderById);
router.put('/:id', AuthMiddleware.handle, OrderController.updateOrderById);
router.patch(
    '/:id',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN]),
    OrderController.adminUpdateOrderStatus,
);

export default router;
