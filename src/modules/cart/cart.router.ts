import { Router } from 'express';
import { CartController } from './cart.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

const router = Router();
const cartController = new CartController();
const authMiddleware = new AuthMiddleware();

// Apply auth middleware to all routes
router.use(authMiddleware.handle);

// Get user's cart
router.get('/', cartController.getCart);

// Create new cart
router.post('/', cartController.createCart);

// Update cart
router.put('/', cartController.updateCart);

// Clear cart
router.delete('/', cartController.clearCart);

// Get cart summary
router.get('/summary', cartController.getCartSummary);

export default router; 
