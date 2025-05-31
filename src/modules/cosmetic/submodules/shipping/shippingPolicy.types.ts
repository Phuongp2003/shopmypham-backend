import type { Cosmetic } from '../../cosmetic.types';

/**
 * @swagger
 * title: ShippingFeature
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID tính năng vận chuyển
 *   shippingPolicyId:
 *     type: string
 *     description: ID chính sách vận chuyển
 *   title:
 *     type: string
 *     description: Tiêu đề tính năng
 *   description:
 *     type: string
 *     description: Mô tả tính năng
 *   icon:
 *     type: string
 *     description: Icon identifier
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type ShippingFeature = {
    id: string;
    shippingPolicyId: string;
    title: string;
    description?: string;
    icon?: string;
    orderIndex: number;
};

/**
 * @swagger
 * title: ShippingPolicy
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID chính sách vận chuyển
 *   name:
 *     type: string
 *     description: Tên chính sách
 *   description:
 *     type: string
 *     description: Mô tả chính sách
 *   deliveryTime:
 *     type: string
 *     description: Thời gian giao hàng
 *   freeShippingThreshold:
 *     type: number
 *     description: Ngưỡng miễn phí vận chuyển
 *   isActive:
 *     type: boolean
 *     description: Trạng thái hoạt động
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   features:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/ShippingFeature'
 *     description: Các tính năng vận chuyển
 */
export type ShippingPolicy = {
    id: string;
    name: string;
    description?: string;
    deliveryTime?: string;
    freeShippingThreshold?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    features: ShippingFeature[];
    cosmetics?: Cosmetic[];
};
