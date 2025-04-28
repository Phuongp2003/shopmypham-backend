import { Router } from 'express';
import { CosmeticController } from './cosmetic.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

const router = Router();
const cosmeticController = new CosmeticController();
const authMiddleware = new AuthMiddleware();

// Client routes
router.get('/', cosmeticController.getCosmetics);
router.get('/:id', cosmeticController.getCosmeticById);

// Manager routes
router.post('/', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.createCosmetic);
router.put('/:id', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.updateCosmetic);
router.delete('/:id', authMiddleware.handle, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.deleteCosmetic);

export default router; 
