import { Router } from 'express';
import { CosmeticBadgeController } from './cosmeticBadge.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', CosmeticBadgeController.getAll);
router.get('/:id', CosmeticBadgeController.getById);
router.post('/', AuthMiddleware.handle, CosmeticBadgeController.create);
router.put('/:id', AuthMiddleware.handle, CosmeticBadgeController.update);
router.delete('/:id', AuthMiddleware.handle, CosmeticBadgeController.delete);

export default router;
