import { Router } from 'express';
import { PostController } from './post.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

const router = Router();
const postController = new PostController();
const authMiddleware = new AuthMiddleware();

// Client routes
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Manager routes
router.post('/', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), postController.createPost);
router.put('/:id', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), postController.updatePost);
router.delete('/:id', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), postController.deletePost);

export default router; 
