import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { OrderStatus, PrismaClient } from "@prisma/client";

import {
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderStatusDto,
} from "./types/order.types";

export class OrderService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createOrder(userId: string, data: CreateOrderDto) {
    // Check if all cosmetics exist and have sufficient stock
    const cosmetics = await this.prisma.cosmetic.findMany({
      where: {
        id: {
          in: data.details.map((detail) => detail.cosmeticId),
        },
      },
    });

    if (cosmetics.length !== data.details.length) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        "Some cosmetics not found",
      );
    }

    // Check stock availability
    for (const detail of data.details) {
      const cosmetic = cosmetics.find((c) => c.id === detail.cosmeticId);
      if (!cosmetic || cosmetic.stock < detail.quantity) {
        throw new HttpException(
          HttpStatus.BAD_REQUEST,
          `Insufficient stock for cosmetic ${cosmetic?.name}`,
        );
      }
    }

    // Create order with transaction
    return await this.prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          shippingAddress: data.shippingAddress,
          note: data.note,
          status: OrderStatus.PENDING,
          details: {
            create: data.details,
          },
        },
        include: {
          details: true,
        },
      });

      // Update stock
      for (const detail of data.details) {
        await tx.cosmetic.update({
          where: { id: detail.cosmeticId },
          data: {
            stock: {
              decrement: detail.quantity,
            },
          },
        });
      }

      return order;
    });
  }

  async getOrders(query: OrderQueryDto) {
    const {
      status,
      userId,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    const where = {
      ...(status && { status }),
      ...(userId && { userId }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          details: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        details: true,
      },
    });

    if (!order) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Order not found");
    }

    return order;
  }

  async updateOrderStatus(id: string, data: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Order not found");
    }

    return await this.prisma.order.update({
      where: { id },
      data: {
        status: data.status,
      },
      include: {
        details: true,
      },
    });
  }

  async cancelOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        details: true,
      },
    });

    if (!order) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Order not found");
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        "Only pending orders can be cancelled",
      );
    }

    // Return stock and update order status
    return await this.prisma.$transaction(async (tx) => {
      // Update order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: OrderStatus.CANCELLED,
        },
        include: {
          details: true,
        },
      });

      // Return stock
      for (const detail of order.details) {
        await tx.cosmetic.update({
          where: { id: detail.cosmeticId },
          data: {
            stock: {
              increment: detail.quantity,
            },
          },
        });
      }

      return updatedOrder;
    });
  }
}
