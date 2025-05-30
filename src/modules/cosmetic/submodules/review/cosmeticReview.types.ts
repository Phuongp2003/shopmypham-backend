import type { Cosmetic } from '../../cosmetic.types';
import type { User } from '@/modules/user/user.types';

/**
 * @swagger
 * title: CosmeticReview
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID đánh giá
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   userId:
 *     type: string
 *     description: ID người dùng (có thể null cho đánh giá ẩn danh)
 *   rating:
 *     type: number
 *     description: Điểm đánh giá (1-5 sao)
 *   title:
 *     type: string
 *     description: Tiêu đề đánh giá
 *   content:
 *     type: string
 *     description: Nội dung đánh giá
 *   isVerified:
 *     type: boolean
 *     description: Đánh giá đã được xác thực
 *   isApproved:
 *     type: boolean
 *     description: Đánh giá đã được phê duyệt
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export type CosmeticReview = {
    id: string;
    cosmeticId: Cosmetic['id'];
    userId?: string;
    rating: number;
    title?: string;
    content?: string;
    isVerified: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    cosmetic?: Cosmetic;
    user?: User;
}; 
