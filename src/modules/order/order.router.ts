import { Request, Response, Router } from "express";
import { UserRole } from "@/common/enums/user-role.enum";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { roleMiddleware } from "@/common/middlewares/role.middleware";
import { OrderController } from "./order.controller";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

const orderRouter = Router();

orderRouter.post(
  "/",
  AuthMiddleware.handle,
  (req: Request, res: Response) =>
    OrderController.createOrder(req as AuthenticatedRequest, res),
);

orderRouter.get(
  "/",
  AuthMiddleware.handle,
  (req: Request, res: Response) =>
    OrderController.getOrders(req as AuthenticatedRequest, res),
);

orderRouter.get(
  "/:id",
  AuthMiddleware.handle,
  (req: Request, res: Response) =>
    OrderController.getOrderById(req as AuthenticatedRequest, res),
);

orderRouter.patch(
  "/:id/status",
  AuthMiddleware.handle,
  roleMiddleware([UserRole.ADMIN]),
  (req: Request, res: Response) =>
    OrderController.updateOrderStatus(req as AuthenticatedRequest, res),
);

orderRouter.post(
  "/:id/cancel",
  AuthMiddleware.handle,
  (req: Request, res: Response) =>
    OrderController.cancelOrder(req as AuthenticatedRequest, res),
);

export default orderRouter;
