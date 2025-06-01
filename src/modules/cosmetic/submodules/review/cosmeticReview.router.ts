import { Router } from 'express';
import { CosmeticReviewController } from './cosmeticReview.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();

router.get('/', CosmeticReviewController.getAll);
router.get('/:id', CosmeticReviewController.getById);
router.get('/cosmetic/:cosmeticId', CosmeticReviewController.getByCosmeticId);
router.post('/', AuthMiddleware.handle, CosmeticReviewController.create);
router.put('/:id', AuthMiddleware.handle, CosmeticReviewController.update);
router.delete('/:id', AuthMiddleware.handle, CosmeticReviewController.delete);

export default router; 
