import { Router } from 'express';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { AddressController } from './address.controller';

const router = Router();
router.use(AuthMiddleware.handle);

router.get('/', AddressController.getAll);
router.get('/:id', AddressController.getById);
router.post('/', AddressController.create);
router.put('/:id', AddressController.update);
router.delete('/:id', AddressController.delete);

export default router;
