import type { CosmeticDistributor } from './submodules/distributor/cosmeticDistributor.types';
import type { CosmeticVariant } from './submodules/variant/cosmeticVariant.types';
import type { CosmeticSpec } from './submodules/specification/cosmeticSpecification.types';
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
export type VariantResponse = {
    name: CosmeticVariant['name'];
    options: CosmeticVariant['CosmeticOption'];
    inStock: CosmeticVariant['stock'];
};

/**
 * @swagger
 * title: CosmeticSpec
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID thông số kỹ thuật
 *   specKey:
 *     type: string
 *     description: Tên thông số (ví dụ ingredients, benefits)
 *   specValue:
 *     type: string
 *     description: Giá trị thông số (ví dụ Vitamin E, Dưỡng ẩm 24h)
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */

export type Cosmetic = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    type: CosmeticType;
    distributorId: string;
    createdAt: Date;
    updatedAt: Date;
    distributor: CosmeticDistributor;
    variants: CosmeticVariant[];
    specifications: CosmeticSpec[];
};

/**
 * @swagger
 * title: CosmeticType
 * type: string
 * enum:
 *   - SKINCARE
 *   - MAKEUP
 *   - HAIRCARE
 *   - FRAGRANCE
 *   - BODYCARE
 *   - NAILCARE
 *   - OTHER
 */
export type CosmeticType =
    | 'SKINCARE'
    | 'MAKEUP'
    | 'HAIRCARE'
    | 'FRAGRANCE'
    | 'BODYCARE'
    | 'NAILCARE'
    | 'OTHER';
