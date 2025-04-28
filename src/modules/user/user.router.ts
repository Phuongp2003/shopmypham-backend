import { Router } from 'express';
import { UserController } from './user.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

const router = Router();
const controller = new UserController();
const authMiddleware = new AuthMiddleware();

// Public routes
router.post('/', controller.create.bind(controller));

// Protected routes
router.use(authMiddleware.handle);

// User routes
router.get('/me', controller.getMe.bind(controller));
router.put('/me', controller.updateMe.bind(controller));
router.delete('/me', controller.deleteMe.bind(controller));

// Admin routes
router.use(roleMiddleware([UserRole.ADMIN]));
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router; 
