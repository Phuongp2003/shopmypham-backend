import { Cosmetic } from '../../cosmetic.types';
import { CosmeticOption } from '../option/cosmesticOptions.types';

/**
 * @swagger
 * title: CosmeticVariant
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID biến thể
 *   name:
 *     type: string
 *     description: Tên biến thể
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   sku:
 *     type: string
 *     description: Mã sản phẩm
 *   price:
 *     type: number
 *     description: Giá
 *   stock:
 *     type: number
 *     description: Số lượng
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   variantOptions:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticVariantOption'
 *   cosmetic:
 *     type: object
 *     $ref: '#/components/schemas/Cosmetic'
 */
export type CosmeticVariant = {
    id: string;
    name: string;
    cosmeticId: Cosmetic['id'];
    sku: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    variantOptions?: CosmeticVariantOption[];
    cosmetic?: Cosmetic;
    CosmeticOption: CosmeticOption[];
};
export type CosmeticVariantOption = {
    id: string;
    variantId: CosmeticVariant['id'];
    optionId: CosmeticOption['id'];
    createdAt: Date;
    updatedAt: Date;
};
