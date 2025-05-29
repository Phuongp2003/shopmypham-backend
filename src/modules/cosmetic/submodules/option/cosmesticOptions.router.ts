import { Router } from 'express';
import { CosmeticOptionController } from './cosmesticOptions.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', CosmeticOptionController.getAll);
router.get('/:id', CosmeticOptionController.getById);
router.post('/', AuthMiddleware.handle, CosmeticOptionController.create);
router.put('/:id', AuthMiddleware.handle, CosmeticOptionController.update);
router.delete('/:id', AuthMiddleware.handle, CosmeticOptionController.delete);

export default router;
