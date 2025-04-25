import { Router } from 'express';
import { CosmeticController } from './cosmetic.controller';
import { authMiddleware } from '@/common/middleware/auth.middleware';
import { roleMiddleware } from '@/common/middleware/role.middleware';
import { UserRole } from '@/common/enums/user-role.enum';

const router = Router();
const cosmeticController = new CosmeticController();

// Client routes
router.get('/', cosmeticController.getCosmetics);
router.get('/:id', cosmeticController.getCosmeticById);

// Manager routes
router.post('/', authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.createCosmetic);
router.put('/:id', authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.updateCosmetic);
router.delete('/:id', authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), cosmeticController.deleteCosmetic);

export default router; 
