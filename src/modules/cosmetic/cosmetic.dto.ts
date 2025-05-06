import { z } from "zod";

import { CosmeticType } from "@prisma/client";

import {
  CosmeticCreateInput,
  CosmeticQueryParams,
  CosmeticUpdateInput,
} from "./cosmetic.types";

export const cosmeticQueryParamsSchema = z.object({
  search: z.string().optional(),
  type: z.nativeEnum(CosmeticType).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  sortBy: z.enum(["price", "name", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  inStock: z.boolean().optional(),
}) satisfies z.ZodType<CosmeticQueryParams>;

export const cosmeticCreateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  type: z.nativeEnum(CosmeticType),
  distributorId: z.string(),
  styleId: z.string(),
}) satisfies z.ZodType<CosmeticCreateInput>;

export const cosmeticUpdateSchema =
  cosmeticCreateSchema.partial() satisfies z.ZodType<CosmeticUpdateInput>;
