import {
  CosmeticType,
  CosmeticVariant,
  CosmeticOption,
} from "@prisma/client";

/**
 * @swagger
 * title: CosmeticQueryParams
 * type: object
 * properties:
 *   search:
 *     type: string
 *     description: Từ khóa tìm kiếm
 *   type:
 *     type: string
 *     description: Loại mỹ phẩm
 *   minPrice:
 *     type: number
 *     description: Giá tối thiểu
 *   maxPrice:
 *     type: number
 *     description: Giá tối đa
 *   sortBy:
 *     type: string
 *     enum: [price, name, createdAt]
 *     description: Trường sắp xếp
 *   sortOrder:
 *     type: string
 *     enum: [asc, desc]
 *     description: Thứ tự sắp xếp
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   inStock:
 *     type: boolean
 *     description: Chỉ lấy sản phẩm còn hàng
 *   hasVariants:
 *     type: boolean
 *     description: Chỉ lấy sản phẩm có biến thể
 */
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

/**
 * @swagger
 * title: VariantOptionInput
 * type: object
 * properties:
 *   key:
 *     type: string
 *   value:
 *     type: string
 */
export type VariantOptionInput = {
  key: string;
  value: string;
};

/**
 * @swagger
 * title: VariantInput
 * type: object
 * properties:
 *   sku:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 *   options:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantOptionInput'
 */
export type VariantInput = {
  sku: string;
  price: number;
  stock: number;
  options: VariantOptionInput[];
};

/**
 * @swagger
 * title: SpecificationInput
 * type: object
 * properties:
 *   key:
 *     type: string
 *   value:
 *     type: string
 */
export type SpecificationInput = {
  key: string;
  value: string;
};

/**
 * @swagger
 * title: CosmeticCreateInput
 * type: object
 * properties:
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 *   type:
 *     type: string
 *   distributorId:
 *     type: string
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/SpecificationInput'
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantInput'
 */
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

/**
 * @swagger
 * title: CosmeticUpdateInput
 * type: object
 * properties:
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 *   type:
 *     type: string
 *   distributorId:
 *     type: string
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/SpecificationInput'
 *   variants:
 *     type: object
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/VariantInput'
 *       update:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             sku:
 *               type: string
 *             price:
 *               type: number
 *             stock:
 *               type: number
 *             options:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VariantOptionInput'
 *       delete:
 *         type: array
 *         items:
 *           type: string
 */
export type CosmeticUpdateInput = Partial<
  Omit<CosmeticCreateInput, "variants">
> & {
  variants?: {
    create?: VariantInput[];
    update?: (VariantInput & { id: string })[];
    delete?: string[];
  };
};

/**
 * @swagger
 * title: VariantResponse
 * type: object
 * properties:
 *   options:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticOption'
 *   displayName:
 *     type: string
 *   inStock:
 *     type: boolean
 */
export type VariantResponse = CosmeticVariant & {
  options: CosmeticOption[];
  displayName: string;
  inStock: boolean;
};
