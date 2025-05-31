import { Router } from 'express';
import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserController } from './user.controller';
import addressRouter from './submodules/address/address.router';

const router = Router();

// Public routes
router.post('/', UserController.create);

// Protected routes
router.use(AuthMiddleware.handle);

// User routes
router.get('/me', UserController.getMe);
router.put('/me', UserController.updateMe);
router.delete('/me', UserController.deleteMe);
router.delete('/me/google/unlink', UserController.unlinkGoogleAccount);
router.put('/me/password', UserController.changePassword);

// Address submodule (for current user)
router.use('/addresses', addressRouter);

// Admin routes
router.use(roleMiddleware([UserRole.ADMIN]));
router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
