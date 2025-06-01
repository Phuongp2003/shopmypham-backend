import { User } from '@prisma/client';
//import { Payment } from './order.types';
import { Paginated } from '@/common/types/paginated.type';

/**
 * @swagger
 * title: PostQueryParamsSchema
 * type: object
 * properties:
 *   authorId:
 *     type: string
 *     description: ID người dùng (nếu cần lọc theo người dùng)
 *   published:
 *     type: boolean
 *     description: Trạng thái công khai của bài viết
 *   page:
 *     type: integer
 *     description: Trang hiện tại (bắt đầu từ 1)
 *   limit:
 *     type: integer
 *     description: Số lượng bản ghi mỗi trang
 *   sortBy:
 *     type: string
 *     description: Trường cần sắp xếp (vd createdAt, title)
 *   sortOrder:
 *     type: string
 *     enum: [asc, desc]
 *     description: Thứ tự sắp xếp (tăng hoặc giảm)
 */

export interface PostQueryParamsSchema{
    authorId?: string; // ID người dùng (nếu cần lọc theo người dùng)
    published?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * @swagger
 * title: CreatePostDto
 * type: object
 * properties:
 *   title:
 *     type: string
 *     description: Tiêu đề của bài viết
 *   content:
 *     type: string
 *     description: Nội dung bài viết
 *   published:
 *     type: boolean
 *     description: Trạng thái công khai của bài viết
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo bài viết
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật bài viết
 */

export interface CreatePostDto {
    title: string;
    content: string;
    published: boolean; // Trạng thái công khai của bài viết
    //authorId: string; // ID của người viết bài
    //comments?: string[]; // ID của các bình luận liên quan
    createdAt?: Date; // Ngày tạo bài viết
    updatedAt?: Date; // Ngày cập nhật bài viết
}

/**
 * @swagger
 * title: PostResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID của bài viết
 *   title:
 *     type: string
 *     description: Tiêu đề của bài viết
 *   content:
 *     type: string
 *     description: Nội dung bài viết
 *   published:
 *     type: boolean
 *     description: Trạng thái công khai của bài viết
 *   authorId:
 *     type: string
 *     description: ID người dùng viết bài
 *   comments:
 *     type: array
 *     items:
 *       type: string
 *     description: Danh sách ID các bình luận liên quan
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo bài viết
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật bài viết
 */

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string; // ID của người viết bài
    comments?: string[]; // ID của các bình luận liên quan
    createdAt: Date; // Ngày tạo bài viết
    updatedAt: Date; // Ngày cập nhật bài viết
}

/**
 * @swagger
 * title: PaginatedPostResponse
 * type: object
 * properties:
 *   total:
 *     type: integer
 *     description: Tổng số phần tử
 *   page:
 *     type: integer
 *     description: Trang hiện tại
 *   limit:
 *     type: integer
 *     description: Số phần tử mỗi trang
 *   totalPages:
 *     type: integer
 *     description: Tổng số trang
 *   posts:
 *     type: array
 *     description: Danh sách bài viết
 *     items:
 *     $ref: '#/components/schemas/PostResponse'
 */
export interface PaginatedPostResponse extends Paginated {
    posts: PostResponse[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

export type SuccessResponse = {
    message: string;
};
