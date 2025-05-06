import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const CreateOrderDto = z.object({
  shippingAddress: z.string().min(1),
  note: z.string().optional(),
  details: z
    .array(
      z.object({
        cosmeticId: z.string().min(1),
        quantity: z.number().int().min(1),
        price: z.number().min(0),
      })
    )
    .min(1),
});

export const UpdateOrderStatusDto = z.object({
  status: z.nativeEnum(OrderStatus),
});

export const OrderQueryDto = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  userId: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
