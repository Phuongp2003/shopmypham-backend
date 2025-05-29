import type { Cosmetic } from '../../cosmetic.types';

/**
 * @swagger
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID nhà phân phối
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
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   cosmetics:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/Cosmetic'
 *     description: Danh sách mỹ phẩm của nhà phân phối
 */
export type CosmeticDistributor = {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
    cosmetics: Cosmetic[];
};
