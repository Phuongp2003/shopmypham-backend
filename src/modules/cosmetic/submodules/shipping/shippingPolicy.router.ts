import { Router } from 'express';
import { ShippingPolicyController } from './shippingPolicy.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', ShippingPolicyController.getAll);
router.get('/:id', ShippingPolicyController.getById);
router.post('/', AuthMiddleware.handle, ShippingPolicyController.create);
router.put('/:id', AuthMiddleware.handle, ShippingPolicyController.update);
router.delete('/:id', AuthMiddleware.handle, ShippingPolicyController.delete);

export default router; 
