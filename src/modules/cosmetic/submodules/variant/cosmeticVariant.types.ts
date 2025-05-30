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
 *   image:
 *     type: string
 *     description: URL hình ảnh biến thể
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   cosmetic:
 *     type: object
 *     $ref: '#/components/schemas/Cosmetic'
 *   CosmeticOption:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticOption'
 */
export type CosmeticVariant = {
    id: string;
    name: string;
    cosmeticId: Cosmetic['id'];
    sku: string;
    price: number;
    stock: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    cosmetic?: Cosmetic;
    CosmeticOption: CosmeticOption[];
};
