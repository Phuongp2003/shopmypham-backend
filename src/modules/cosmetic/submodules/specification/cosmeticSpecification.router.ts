import { Router } from 'express';
import { CosmeticSpecificationController } from './cosmeticSpecification.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', CosmeticSpecificationController.getAll);
router.get('/:id', CosmeticSpecificationController.getById);
router.post('/', AuthMiddleware.handle, CosmeticSpecificationController.create);
router.put(
    '/:id',
    AuthMiddleware.handle,
    CosmeticSpecificationController.update,
);
router.delete(
    '/:id',
    AuthMiddleware.handle,
    CosmeticSpecificationController.delete,
);

export default router;
