import type { Cosmetic } from '../../cosmetic.types';

/**
 * @swagger
 * title: CosmeticBenefit
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID lợi ích sản phẩm
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   benefitKey:
 *     type: string
 *     description: Tên lợi ích (VD Chất lượng cao cấp)
 *   benefitValue:
 *     type: string
 *     description: Mô tả chi tiết lợi ích
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export type CosmeticBenefit = {
    id: string;
    cosmeticId: Cosmetic['id'];
    benefitKey: string;
    benefitValue: string;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
    cosmetic?: Cosmetic;
}; 
