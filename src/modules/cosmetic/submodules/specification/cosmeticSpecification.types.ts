import type { Cosmetic } from '../../cosmetic.types';

/**
 * @swagger
 * title: CosmeticSpec
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID đặc điểm sản phẩm
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   specKey:
 *     type: string
 *     description: Tên đặc điểm sản phẩm
 *   specValue:
 *     type: string
 *     description: Giá trị đặc điểm sản phẩm
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export type CosmeticSpec = {
    id: string;
    cosmeticId: Cosmetic['id'];
    specKey: string;
    specValue: string;
    createdAt: Date;
    updatedAt: Date;
    cosmetic: Cosmetic;
};
