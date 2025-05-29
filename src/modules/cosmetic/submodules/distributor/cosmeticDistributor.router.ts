import { Router } from 'express';
import { CosmeticDistributorController } from './cosmeticDistributor.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/:id', CosmeticDistributorController.getById);
router.put('/:id', AuthMiddleware.handle, CosmeticDistributorController.update);
router.delete(
    '/:id',
    AuthMiddleware.handle,
    CosmeticDistributorController.delete,
);
router.get('/', CosmeticDistributorController.getAll);
router.post('/', AuthMiddleware.handle, CosmeticDistributorController.create);
export default router;
