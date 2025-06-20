import { Router } from 'express';

import { UserRole } from '@/common/enums/user-role.enum';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { roleMiddleware } from '@/common/middlewares/role.middleware';

import { CosmeticController } from './cosmetic.controller';
import CosmeticDistributorRouter from './submodules/distributor/cosmeticDistributor.router';
import CosmeticVariantRouter from './submodules/variant/cosmeticVariant.router';
import CosmeticSpecificationRouter from './submodules/specification/cosmeticSpecification.router';
import CosmeticOptionRouter from './submodules/option/cosmesticOptions.router';
import CosmeticReviewRouter from './submodules/review/cosmeticReview.router';
import ShippingPolicyRouter from './submodules/shipping/shippingPolicy.router';
import CosmeticBadgeRouter from './submodules/badge/cosmeticBadge.router';

const router = Router();

// Distributor routes
router.use('/distributors', CosmeticDistributorRouter);

// Variant routes
router.use('/variants', CosmeticVariantRouter);

// Specification routes
router.use('/specifications', CosmeticSpecificationRouter);

// Option routes
router.use('/options', CosmeticOptionRouter);

// Review routes
router.use('/reviews', CosmeticReviewRouter);

// Shipping policy routes
router.use('/shipping-policies', ShippingPolicyRouter);

// Badge routes
router.use('/badges', CosmeticBadgeRouter);

// Client routes
router.get('/', CosmeticController.getCosmetics);
router.get('/:id', CosmeticController.getCosmeticById);

// Manager routes
router.post(
    '/',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    CosmeticController.createCosmetic,
);
router.put(
    '/:id',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    CosmeticController.updateCosmetic,
);
router.delete(
    '/:id',
    AuthMiddleware.handle,
    roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
    CosmeticController.deleteCosmetic,
);

export default router;
