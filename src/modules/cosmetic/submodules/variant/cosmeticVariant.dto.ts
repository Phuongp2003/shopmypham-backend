/**
 * @swagger
 * title: CosmeticVariantCreateReq
 * type: object
 * properties:
 *   cosmeticId:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên biến thể
 *   sku:
 *     type: string
 *     description: Mã sản phẩm
 *   price:
 *     type: number
 *     description: Giá
 *   stock:
 *     type: number
 *     description: Số lượng
 */
export type CosmeticVariantCreateReq = {
    cosmeticId: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
};

/**
 * @swagger
 * title: CosmeticVariantUpdateReq
 * type: object
 * properties:
 *   name:
 *     type: string
 *   sku:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 */
export type CosmeticVariantUpdateReq = Partial<
    Pick<CosmeticVariantCreateReq, 'name' | 'sku' | 'price' | 'stock'>
>;

/**
 * @swagger
 * title: CosmeticVariantResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *   cosmeticId:
 *     type: string
 *   name:
 *     type: string
 *   sku:
 *     type: string
 *   price:
 *     type: number
 *   stock:
 *     type: number
 *   createdAt:
 *     type: string
 *     format: date-time
 *   updatedAt:
 *     type: string
 *     format: date-time
 */
export type CosmeticVariantResponse = {
    id: string;
    cosmeticId: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
};
