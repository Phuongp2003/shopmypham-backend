import { Cosmetic, CosmeticSpec, CosmeticDistributor } from '@prisma/client';

import { VariantResponse } from './cosmetic.types';

/**
 * @swagger
 * title: CosmeticResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   distributor:
 *     $ref: '#/components/schemas/CosmeticDistributor'
 *     description: Nhà phân phối
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpec'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantResponse'
 *     description: Danh sách biến thể
 *   inStock:
 *     type: boolean
 *     description: Còn hàng
 *   hasVariants:
 *     type: boolean
 *     description: Có biến thể
 */
export interface CosmeticResponse {
	id: Cosmetic['id'];
	name: string;
	distributor?: CosmeticDistributor;
	specifications: CosmeticSpec[];
	variants: VariantResponse[];
	inStock: boolean;
	hasVariants: boolean;
}

/**
 * @swagger
 * title: Paginated
 * type: object
 * properties:
 *   total:
 *     type: number
 *     description: Tổng số bản ghi
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   totalPages:
 *     type: number
 *     description: Tổng số trang
 */
interface Paginated {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/**
 * @swagger
 * title: PaginatedCosmeticResponse
 * type: object
 * properties:
 *   total:
 *     type: number
 *   page:
 *     type: number
 *   limit:
 *     type: number
 *   totalPages:
 *     type: number
 *   cosmetics:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticResponse'
 */
export interface PaginatedCosmeticResponse extends Paginated {
	cosmetics: CosmeticResponse[];
}
