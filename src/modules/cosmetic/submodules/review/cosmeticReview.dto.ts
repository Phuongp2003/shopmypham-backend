import type { CosmeticReview } from './cosmeticReview.types';
import type { Paginated } from '@/common/types/paginated.type';
import type { QueryParams } from '@/common/types/query.types';

/**
 * @swagger
 * title: CosmeticReviewCreateReq
 * type: object
 * properties:
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   rating:
 *     type: number
 *     minimum: 1
 *     maximum: 5
 *     description: Điểm đánh giá (1-5 sao)
 *   title:
 *     type: string
 *     description: Tiêu đề đánh giá
 *   content:
 *     type: string
 *     description: Nội dung đánh giá
 */
export type CosmeticReviewCreateReq = {
    cosmeticId: string;
    rating: number;
    title?: string;
    content?: string;
};

/**
 * @swagger
 * title: CosmeticReviewUpdateReq
 * type: object
 * properties:
 *   rating:
 *     type: number
 *     minimum: 1
 *     maximum: 5
 *     description: Điểm đánh giá (1-5 sao)
 *   title:
 *     type: string
 *     description: Tiêu đề đánh giá
 *   content:
 *     type: string
 *     description: Nội dung đánh giá
 *   isApproved:
 *     type: boolean
 *     description: Trạng thái phê duyệt (chỉ admin)
 */
export type CosmeticReviewUpdateReq = Partial<CosmeticReviewCreateReq> & {
    isApproved?: boolean;
};

/**
 * @swagger
 * title: CosmeticReviewQueryParams
 * type: object
 * properties:
 *   rating:
 *     type: number
 *     description: Lọc theo điểm đánh giá
 *   isApproved:
 *     type: boolean
 *     description: Lọc theo trạng thái phê duyệt
 *   isVerified:
 *     type: boolean
 *     description: Lọc theo trạng thái xác thực
 *   sortBy:
 *     type: string
 *     enum: [rating, createdAt]
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
export type CosmeticReviewQueryParams = QueryParams & {
    rating?: number;
    isApproved?: boolean;
    isVerified?: boolean;
    sortBy?: 'rating' | 'createdAt';
};

/**
 * @swagger
 * title: CosmeticReviewResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   cosmeticId:
 *     type: string
 *   userId:
 *     type: string
 *   rating:
 *     type: number
 *   title:
 *     type: string
 *   content:
 *     type: string
 *   isVerified:
 *     type: boolean
 *   isApproved:
 *     type: boolean
 *   userName:
 *     type: string
 *     description: Tên người đánh giá
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticReviewResponse = {
    id: CosmeticReview['id'];
    cosmeticId: CosmeticReview['cosmeticId'];
    userId?: CosmeticReview['userId'];
    rating: CosmeticReview['rating'];
    title?: CosmeticReview['title'];
    content?: CosmeticReview['content'];
    isVerified: CosmeticReview['isVerified'];
    isApproved: CosmeticReview['isApproved'];
    userName?: string;
    createdAt: CosmeticReview['createdAt'];
    updatedAt: CosmeticReview['updatedAt'];
};

/**
 * @swagger
 * title: PaginatedCosmeticReviewRes
 * type: object
 * properties:
 *   total:
 *     type: number
 *     description: Tổng số đánh giá
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   totalPages:
 *     type: number
 *     description: Tổng số trang
 *   reviews:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticReviewResponse'
 *     description: Danh sách đánh giá
 */
export type PaginatedCosmeticReviewRes = Paginated & {
    reviews: CosmeticReviewResponse[];
};
