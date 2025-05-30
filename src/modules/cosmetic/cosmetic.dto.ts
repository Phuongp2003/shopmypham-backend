import { QueryParams } from './../../common/types/query.types';
import {
    VariantResponse,
    type Cosmetic,
    type CosmeticType,
} from './cosmetic.types';
import { Paginated } from '@/common/types/paginated.type';

/**
 * @swagger
 * title: CosmeticRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   distributor:
 *     $ref: '#/components/schemas/CosmeticDistributor'
 *     description: Nhà phân phối
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpec'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantResponse'
 *     description: Danh sách biến thể
 *   inStock:
 *     type: boolean
 *     description: Còn hàng
 *   hasVariants:
 *     type: boolean
 *     description: Có biến thể
 */
export interface CosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    price: Cosmetic['price'];
    distributor?: Cosmetic['distributor'];
    specifications: Cosmetic['specifications'];
    variants: VariantResponse[];
    stock: Cosmetic['stock'];
}

/**
 * @swagger
 * title: GetAllCosmeticRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 */
export interface GetAllCosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    price: Cosmetic['price'];
    stock: Cosmetic['stock'];
}

/**
 * @swagger
 * title: PaginatedCosmeticRes
 * type: object
 * properties:
 *   total:
 *     type: number
 *   page:
 *     type: number
 *   limit:
 *     type: number
 *   totalPages:
 *     type: number
 *   cosmetics:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticRes'
 */
export interface PaginatedCosmeticRes extends Paginated {
    cosmetics: GetAllCosmeticRes[];
}

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
export type CosmeticQueryParams = QueryParams & {
    type?: CosmeticType;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'name' | 'createdAt';
    inStock?: boolean;
    hasVariants?: boolean;
};

/**
 * @swagger
 * title: CosmeticVariantInput
 * type: object
 * properties:
 *   name:
 *     type: string
 *   sku:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 *   optionIds:
 *     type: array
 *     items:
 *       type: string
 */
export type CosmeticVariantInput = {
    name: string;
    sku: string;
    price: number;
    stock: number;
    optionIds: string[];
};

/**
 * @swagger
 * title: CosmeticSpecificationInput
 * type: object
 * properties:
 *   key:
 *     type: string
 *   value:
 *     type: string
 */
export type CosmeticSpecificationInput = {
    key: string;
    value: string;
};

/**
 * @swagger
 * title: CosmeticCreateReq
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
 *       $ref: '#/components/schemas/CosmeticSpecificationInput'
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticVariantInput'
 */
export type CosmeticCreateReq = {
    name: string;
    description?: string;
    price: number;
    stock: number;
    type: CosmeticType;
    distributorId: string;
    specifications?: CosmeticSpecificationInput[];
    variants?: CosmeticVariantInput[];
};

/**
 * @swagger
 * title: CosmeticUpdateReq
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
 *       $ref: '#/components/schemas/CosmeticSpecificationInput'
 *   variants:
 *     type: object
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/CosmeticVariantInput'
 *       update:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             sku:
 *               type: string
 *             price:
 *               type: number
 *             stock:
 *               type: number
 *             optionIds:
 *               type: array
 *               items:
 *                 type: string
 *       delete:
 *         type: array
 *         items:
 *           type: string
 */
export type CosmeticUpdateReq = Partial<Omit<CosmeticCreateReq, 'variants'>> & {
    variants?: {
        create?: CosmeticVariantInput[];
        update?: (CosmeticVariantInput & { id: string })[];
        delete?: string[];
    };
};
