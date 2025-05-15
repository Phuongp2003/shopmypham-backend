import { Cosmetic, CosmeticType } from "@prisma/client";

export type CosmeticQueryParams = {
  search?: string;
  type?: CosmeticType;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  inStock?: boolean;
};

export type CosmeticCreateInput = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  type: CosmeticType;
  distributorId: string;
  meta?: Record<string, string>;
};

export type CosmeticUpdateInput = Partial<CosmeticCreateInput>;

export type CosmeticResponse = Cosmetic & {
  inStock: boolean;
  meta: Record<string, string> | null;
};
