import type { CosmeticBadge, BadgeType } from './cosmeticBadge.types';

/**
 * @swagger
 * title: CosmeticBadgeCreateReq
 * type: object
 * properties:
 *   badgeType:
 *     $ref: '#/components/schemas/BadgeType'
 *     description: Loại huy hiệu
 *   title:
 *     type: string
 *     description: Tiêu đề huy hiệu
 *   icon:
 *     type: string
 *     description: Icon identifier
 *   color:
 *     type: string
 *     description: CSS color class
 *   isActive:
 *     type: boolean
 *     description: Trạng thái hoạt động
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBadgeCreateReq = {
    badgeType: BadgeType;
    title: string;
    icon?: string;
    color?: string;
    isActive?: boolean;
    orderIndex?: number;
};

/**
 * @swagger
 * title: CosmeticBadgeUpdateReq
 * type: object
 * properties:
 *   badgeType:
 *     $ref: '#/components/schemas/BadgeType'
 *     description: Loại huy hiệu
 *   title:
 *     type: string
 *     description: Tiêu đề huy hiệu
 *   icon:
 *     type: string
 *     description: Icon identifier
 *   color:
 *     type: string
 *     description: CSS color class
 *   isActive:
 *     type: boolean
 *     description: Trạng thái hoạt động
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBadgeUpdateReq = Partial<CosmeticBadgeCreateReq>;

/**
 * @swagger
 * title: CosmeticBadgeResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   badgeType:
 *     $ref: '#/components/schemas/BadgeType'
 *   title:
 *     type: string
 *   icon:
 *     type: string
 *   color:
 *     type: string
 *   isActive:
 *     type: boolean
 *   orderIndex:
 *     type: number
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticBadgeResponse = {
    id: string;
    badgeType: BadgeType;
    title: string;
    icon?: string;
    color?: string;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
};
