import type { ShippingPolicy, ShippingFeature } from './shippingPolicy.types';
import type { Paginated } from '@/common/types/paginated.type';
import type { QueryParams } from '@/common/types/query.types';

/**
 * @swagger
 * title: ShippingFeatureInput
 * type: object
 * properties:
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
export type ShippingFeatureInput = {
    title: string;
    description?: string;
    icon?: string;
    orderIndex?: number;
};

/**
 * @swagger
 * title: ShippingPolicyCreateReq
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên chính sách vận chuyển
 *   description:
 *     type: string
 *     description: Mô tả chính sách
 *   deliveryTime:
 *     type: string
 *     description: Thời gian giao hàng
 *   freeShippingThreshold:
 *     type: number
 *     description: Ngưỡng miễn phí vận chuyển
 *   features:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/ShippingFeatureInput'
 *     description: Các tính năng vận chuyển
 */
export type ShippingPolicyCreateReq = {
    name: string;
    description?: string;
    deliveryTime?: string;
    freeShippingThreshold?: number;
    features?: ShippingFeatureInput[];
};

/**
 * @swagger
 * title: ShippingPolicyUpdateReq
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên chính sách vận chuyển
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
 *   features:
 *     type: object
 *     description: Thao tác với tính năng
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/ShippingFeatureInput'
 *         description: Tạo tính năng mới
 *       update:
 *         type: array
 *         items:
 *           type: object
 *           allOf:
 *             - $ref: '#/components/schemas/ShippingFeatureInput'
 *             - type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID tính năng
 *         description: Cập nhật tính năng
 *       delete:
 *         type: array
 *         items:
 *           type: string
 *         description: Xóa tính năng (danh sách ID)
 */
export type ShippingPolicyUpdateReq = Partial<
    Omit<ShippingPolicyCreateReq, 'features'>
> & {
    isActive?: boolean;
    features?: {
        create?: ShippingFeatureInput[];
        update?: (ShippingFeatureInput & { id: string })[];
        delete?: string[];
    };
};

/**
 * @swagger
 * title: ShippingPolicyQueryParams
 * type: object
 * properties:
 *   search:
 *     type: string
 *     description: Từ khóa tìm kiếm
 *   isActive:
 *     type: boolean
 *     description: Trạng thái hoạt động
 *   sortBy:
 *     type: string
 *     enum: [name, createdAt]
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
 */
export type ShippingPolicyQueryParams = QueryParams & {
    isActive?: boolean;
    sortBy?: 'name' | 'createdAt';
};

/**
 * @swagger
 * title: ShippingPolicyResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   deliveryTime:
 *     type: string
 *   freeShippingThreshold:
 *     type: number
 *   isActive:
 *     type: boolean
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 *   features:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/ShippingFeature'
 */
export type ShippingPolicyResponse = {
    id: ShippingPolicy['id'];
    name: ShippingPolicy['name'];
    description?: ShippingPolicy['description'];
    deliveryTime?: ShippingPolicy['deliveryTime'];
    freeShippingThreshold?: ShippingPolicy['freeShippingThreshold'];
    isActive: ShippingPolicy['isActive'];
    createdAt: ShippingPolicy['createdAt'];
    updatedAt: ShippingPolicy['updatedAt'];
    features: ShippingFeature[];
};

/**
 * @swagger
 * title: PaginatedShippingPolicyRes
 * type: object
 * properties:
 *   total:
 *     type: number
 *     description: Tổng số chính sách vận chuyển
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   totalPages:
 *     type: number
 *     description: Tổng số trang
 *   shippingPolicies:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/ShippingPolicyResponse'
 *     description: Danh sách chính sách vận chuyển
 */
export type PaginatedShippingPolicyRes = Paginated & {
    shippingPolicies: ShippingPolicyResponse[];
};
