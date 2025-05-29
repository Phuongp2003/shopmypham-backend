import { Router } from 'express';
import { CosmeticVariantController } from './cosmeticVariant.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', CosmeticVariantController.getAll);
router.get('/:id', CosmeticVariantController.getById);
router.post('/', AuthMiddleware.handle, CosmeticVariantController.create);
router.put('/:id', AuthMiddleware.handle, CosmeticVariantController.update);
router.delete('/:id', AuthMiddleware.handle, CosmeticVariantController.delete);

export default router;
