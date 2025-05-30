import type { Paginated } from '@/common/types/paginated.type';
import type { QueryParams } from '@/common/types/query.types';
import type { CosmeticDistributor } from '@prisma/client';

/**
 * @swagger
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên nhà phân phối
 *   address:
 *     type: string
 *     description: Địa chỉ
 *   phone:
 *     type: string
 *     description: Số điện thoại
 *   email:
 *     type: string
 *     description: Email
 */
export type CosmeticDistributorCreateReq = {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
};

/**
 * @swagger
 * type: object
 * properties:
 *   name:
 *     type: string
 *   address:
 *     type: string
 *   phone:
 *     type: string
 *   email:
 *     type: string
 */
export type CosmeticDistributorUpdateReq =
    Partial<CosmeticDistributorCreateReq>;

/**
 * @swagger
 * type: object
 * title: GetCosmeticDistributorByIdQueryParams
 * properties:
 *   id:
 *     type: string
 *     description: Id nhà phân phối
 */
export type GetCosmeticDistributorByIdQueryParams = {
    id: string;
};

/**
 * @swagger
 * type: object
 * title: CosmeticDistributorQueryParams
 * properties:
 *   search:
 *     type: string
 *     description: Tên nhà phân phối
 *   page:
 *     type: number
 *     description: Trang
 *   limit:
 *     type: number
 *     description: Số lượng
 *   sortBy:
 *     type: string
 *     description: Sắp xếp theo
 *   sortOrder:
 *     type: string
 *     enum: ['asc', 'desc']
 *     description: Thứ tự sắp xếp
 *
 */
export type CosmeticDistributorQueryParams = QueryParams & {
    sortBy?: 'name' | 'createdAt';
};

/**
 * @swagger
 * type: object
 * title: PaginatedCosmeticDistributorRes
 * properties:
 *   distributors:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticDistributor'
 *   total:
 *     type: number
 *   page:
 *     type: number
 *   limit:
 *     type: number
 *   totalPages:
 *     type: number
 */
export type PaginatedCosmeticDistributorRes = Paginated & {
    distributors: CosmeticDistributor[];
};
