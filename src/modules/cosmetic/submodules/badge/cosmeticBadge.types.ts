import type { Cosmetic } from '../../cosmetic.types';

/**
 * @swagger
 * title: BadgeType
 * type: string
 * enum:
 *   - MADE_IN
 *   - QUALITY
 *   - SHIPPING
 *   - RETURN_POLICY
 *   - WARRANTY
 *   - CERTIFICATION
 */
export type BadgeType =
    | 'MADE_IN'
    | 'QUALITY'
    | 'SHIPPING'
    | 'RETURN_POLICY'
    | 'WARRANTY'
    | 'CERTIFICATION';

/**
 * @swagger
 * title: CosmeticBadge
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID huy hiệu tin cậy
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   badgeType:
 *     $ref: '#/components/schemas/BadgeType'
 *     description: Loại huy hiệu
 *   title:
 *     type: string
 *     description: Tiêu đề huy hiệu
 *   icon:
 *     type: string
 *     description: Icon identifier hoặc emoji
 *   color:
 *     type: string
 *     description: CSS color class
 *   isActive:
 *     type: boolean
 *     description: Trạng thái hoạt động
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
export type CosmeticBadge = {
    id: string;
    cosmeticId: Cosmetic['id'];
    badgeType: BadgeType;
    title: string;
    icon?: string;
    color?: string;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
    cosmetic?: Cosmetic;
};
