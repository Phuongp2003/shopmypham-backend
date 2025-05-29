import { Router } from 'express';

import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';

import { PostController } from './post.controller';

const router = Router();

// Client routes
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostById);

// Manager routes
router.post(
    '/',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    ...PostController.createPost,
);
router.put(
    '/:id',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    ...PostController.updatePost,
);
router.delete(
    '/:id',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    PostController.deletePost,
);

export default router;
