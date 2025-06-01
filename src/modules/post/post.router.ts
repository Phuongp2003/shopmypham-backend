import { Router } from 'express';

import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';

import { PostController } from './post.controller';

const router = Router();
router.get('/', AuthMiddleware.handle, PostController.getPosts);
router.post('/', AuthMiddleware.handle, PostController.createPost);

router.get('/:id', AuthMiddleware.handle, PostController.getPostById);
router.put('/:id', AuthMiddleware.handle, PostController.updatePost);
router.delete('/:id', AuthMiddleware.handle, PostController.deletePost);

export default router;
