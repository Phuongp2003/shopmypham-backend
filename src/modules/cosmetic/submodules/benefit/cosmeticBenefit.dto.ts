import type { CosmeticBenefit } from './cosmeticBenefit.types';

/**
 * @swagger
 * title: CosmeticBenefitCreateReq
 * type: object
 * properties:
 *   benefitKey:
 *     type: string
 *     description: Tên lợi ích
 *   benefitValue:
 *     type: string
 *     description: Mô tả chi tiết lợi ích
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBenefitCreateReq = {
    benefitKey: string;
    benefitValue: string;
    orderIndex?: number;
};

/**
 * @swagger
 * title: CosmeticBenefitUpdateReq
 * type: object
 * properties:
 *   benefitKey:
 *     type: string
 *     description: Tên lợi ích
 *   benefitValue:
 *     type: string
 *     description: Mô tả chi tiết lợi ích
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBenefitUpdateReq = Partial<CosmeticBenefitCreateReq>;

/**
 * @swagger
 * title: CosmeticBenefitResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   cosmeticId:
 *     type: string
 *   benefitKey:
 *     type: string
 *   benefitValue:
 *     type: string
 *   orderIndex:
 *     type: number
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticBenefitResponse = {
    id: CosmeticBenefit['id'];
    cosmeticId: CosmeticBenefit['cosmeticId'];
    benefitKey: CosmeticBenefit['benefitKey'];
    benefitValue: CosmeticBenefit['benefitValue'];
    orderIndex: CosmeticBenefit['orderIndex'];
    createdAt: CosmeticBenefit['createdAt'];
    updatedAt: CosmeticBenefit['updatedAt'];
};
