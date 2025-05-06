import { Request, Response } from "express";
import { z } from "zod";
import { logger } from "@/common/logger/logger.factory";
import { HttpStatus } from "@/common/enums/http-status.enum";
import { UserRole } from "@/common/enums/user-role.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { OrderService } from "./order.service";
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  OrderQueryDto,
} from "./order.dto";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

export class OrderController {
  static orderService = new OrderService();

  static async createOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const data = CreateOrderDto.parse(req.body);
      const order = await OrderController.orderService.createOrder(
        userId,
        data,
      );
      res.status(HttpStatus.CREATED).json(order);
    } catch (error: any) {
      logger.error("Order create error:", error, {
        service: "OrderController",
      });
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json({ status: "error", message: error.message });
      } else if (error instanceof z.ZodError) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            status: "error",
            message: error.errors.map((e) => e.message).join(", "),
          });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", message: "Internal server error" });
      }
    }
  }

  static async getOrders(req: AuthenticatedRequest, res: Response) {
    try {
      const query = OrderQueryDto.parse(req.query);
      const userId = req.user.id;
      if (req.user.role !== UserRole.ADMIN) {
        query.userId = userId;
      }
      const result = await OrderController.orderService.getOrders(query);
      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      logger.error("Order list error:", error, { service: "OrderController" });
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json({ status: "error", message: error.message });
      } else if (error instanceof z.ZodError) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            status: "error",
            message: error.errors.map((e) => e.message).join(", "),
          });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", message: "Internal server error" });
      }
    }
  }

  static async getOrderById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const order = await OrderController.orderService.getOrderById(id);
      if (req.user.role !== UserRole.ADMIN && order.userId !== userId) {
        throw new HttpException(HttpStatus.FORBIDDEN, "Access denied");
      }
      res.status(HttpStatus.OK).json(order);
    } catch (error: any) {
      logger.error("Order get by id error:", error, {
        service: "OrderController",
      });
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json({ status: "error", message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", message: "Internal server error" });
      }
    }
  }

  static async updateOrderStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateOrderStatusDto.parse(req.body);
      if (req.user.role !== UserRole.ADMIN) {
        throw new HttpException(HttpStatus.FORBIDDEN, "Access denied");
      }
      const order = await OrderController.orderService.updateOrderStatus(
        id,
        data,
      );
      res.status(HttpStatus.OK).json(order);
    } catch (error: any) {
      logger.error("Order update status error:", error, {
        service: "OrderController",
      });
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json({ status: "error", message: error.message });
      } else if (error instanceof z.ZodError) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            status: "error",
            message: error.errors.map((e) => e.message).join(", "),
          });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", message: "Internal server error" });
      }
    }
  }

  static async cancelOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const order = await OrderController.orderService.getOrderById(id);
      if (req.user.role !== UserRole.ADMIN && order.userId !== userId) {
        throw new HttpException(HttpStatus.FORBIDDEN, "Access denied");
      }
      const cancelledOrder = await OrderController.orderService.cancelOrder(id);
      res.status(HttpStatus.OK).json(cancelledOrder);
    } catch (error: any) {
      logger.error("Order cancel error:", error, {
        service: "OrderController",
      });
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json({ status: "error", message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", message: "Internal server error" });
      }
    }
  }
}
