import { Router } from 'express';

import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

import { PostController } from './post.controller';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

const router = Router();
router.get('/', PostController.getPosts);
router.post('/', AuthMiddleware.handle, roleMiddleware([UserRole.ADMIN]), PostController.createPost);

router.get('/:id', PostController.getPostById);
router.put('/:id', AuthMiddleware.handle, roleMiddleware([UserRole.ADMIN]), PostController.updatePost);
router.delete('/:id', AuthMiddleware.handle, roleMiddleware([UserRole.ADMIN]), PostController.deletePost);

export default router;
