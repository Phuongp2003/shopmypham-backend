/**
 * @swagger
 * title: CosmeticSpecificationCreateReq
 * type: object
 * properties:
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   specKey:
 *     type: string
 *     description: Tên đặc điểm sản phẩm
 *   specValue:
 *     type: string
 *     description: Giá trị đặc điểm sản phẩm
 */
export type CosmeticSpecificationCreateReq = {
    cosmeticId: string;
    specKey: string;
    specValue: string;
};

/**
 * @swagger
 * title: CosmeticSpecificationUpdateReq
 * type: object
 * properties:
 *   specKey:
 *     type: string
 *     description: Tên đặc điểm sản phẩm
 *   specValue:
 *     type: string
 *     description: Giá trị đặc điểm sản phẩm
 */
export type CosmeticSpecificationUpdateReq = Partial<
    Pick<CosmeticSpecificationCreateReq, 'specKey' | 'specValue'>
>;

/**
 * @swagger
 * title: CosmeticSpecificationResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   cosmeticId:
 *     type: string
 *   specKey:
 *     type: string
 *   specValue:
 *     type: string
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticSpecificationResponse = {
    id: string;
    cosmeticId: string;
    specKey: string;
    specValue: string;
    createdAt: Date;
    updatedAt: Date;
};
