/**
 * @swagger
 * title: CosmeticOptionCreateReq
 * type: object
 * properties:
 *   optionKey:
 *     type: string
 *     description: Tên thuộc tính
 *   optionValue:
 *     type: string
 *     description: Giá trị thuộc tính
 */
export type CosmeticOptionCreateReq = {
    optionKey: string;
    optionValue: string;
};

/**
 * @swagger
 * title: CosmeticOptionUpdateReq
 * type: object
 * properties:
 *   optionKey:
 *     type: string
 *     description: Tên thuộc tính
 *   optionValue:
 *     type: string
 *     description: Giá trị thuộc tính
 */
export type CosmeticOptionUpdateReq = Partial<
    Pick<CosmeticOptionCreateReq, 'optionKey' | 'optionValue'>
>;

/**
 * @swagger
 * title: CosmeticOptionResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   optionKey:
 *     type: string
 *   optionValue:
 *     type: string
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticOptionResponse = {
    id: string;
    optionKey: string;
    optionValue: string;
    createdAt: Date;
    updatedAt: Date;
};
