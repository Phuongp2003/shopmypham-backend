import { CosmeticVariantOption } from '../variant/cosmeticVariant.types';

/**
 * @swagger
 * title: CosmeticOption
 * type: object
 * name: CosmeticOption
 * properties:
 *   id:
 *     type: string
 *     description: ID tuỳ chọn biến thể
 *   optionKey:
 *     type: string
 *     description: Tên thuộc tính
 *   optionValue:
 *     type: string
 *     description: Giá trị thuộc tính
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export type CosmeticOption = {
    id: string;
    optionKey: string;
    optionValue: string;
    variantOptions?: CosmeticVariantOption[];
    createdAt: Date;
    updatedAt: Date;
};
