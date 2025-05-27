import {
  Cosmetic,
  CosmeticType,
  CosmeticVariant,
  CosmeticSpec,
  CosmeticDistributor,
  CosmeticOption,
} from "@prisma/client";

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
  hasVariants?: boolean;
};

export type VariantOptionInput = {
  key: string;
  value: string;
};

export type VariantInput = {
  sku: string;
  price: number;
  stock: number;
  options: VariantOptionInput[];
};

export type SpecificationInput = {
  key: string;
  value: string;
};

export type CosmeticCreateInput = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  type: CosmeticType;
  distributorId: string;
  specifications?: SpecificationInput[];
  variants?: VariantInput[];
};

export type CosmeticUpdateInput = Partial<
  Omit<CosmeticCreateInput, "variants">
> & {
  variants?: {
    create?: VariantInput[];
    update?: (VariantInput & { id: string })[];
    delete?: string[];
  };
};

export type VariantResponse = CosmeticVariant & {
  options: CosmeticOption[];
  displayName: string;
  inStock: boolean;
};



