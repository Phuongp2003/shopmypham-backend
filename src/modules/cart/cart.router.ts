import { Router } from 'express';

import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

import { CartController } from './cart.controller';

const router = Router();

// Apply auth middleware to all routes
router.use(AuthMiddleware.handle);

// Get user's cart
router.get('/', CartController.getCart);

// Create new cart
router.post('/', CartController.createCart);

// Update cart
router.put('/', CartController.updateCart);

// Clear cart
router.delete('/', CartController.clearCart);

// Get cart summary
router.get('/summary', CartController.getCartSummary);

export default router;
