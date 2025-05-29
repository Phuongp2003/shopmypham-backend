import { Router } from "express";

import { UserRole } from "@/common/enums/user-role.enum";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { roleMiddleware } from "@/common/middlewares/role.middleware";

import { CosmeticController } from "./cosmetic.controller";

const router = Router();

// Client routes
router.get("/", CosmeticController.getCosmetics);
router.get("/:id", CosmeticController.getCosmeticById);

// Manager routes
router.post(
  "/",
  // AuthMiddleware.handle,
  // roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
  CosmeticController.createCosmetic,
);
router.put(
  "/:id",
  // AuthMiddleware.handle,
  // roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
  CosmeticController.updateCosmetic,
);
router.delete(
  "/:id",
  // AuthMiddleware.handle,
  // roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]),
  CosmeticController.deleteCosmetic,
);

export default router;
