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
 *   image:
 *     type: string
 *     description: URL hình ảnh biến thể
 */
export type CosmeticVariantCreateReq = {
    cosmeticId: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    image?: string;
};

/**
 * @swagger
 * title: CosmeticVariantUpdateReq
 * type: object
 * properties:
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
 *   image:
 *     type: string
 *     description: URL hình ảnh biến thể
 */
export type CosmeticVariantUpdateReq = Partial<
    Pick<CosmeticVariantCreateReq, 'name' | 'sku' | 'price' | 'stock' | 'image'>
>;

/**
 * @swagger
 * title: CosmeticVariantResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID biến thể
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
 *   image:
 *     type: string
 *     description: URL hình ảnh biến thể
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export type CosmeticVariantResponse = {
    id: string;
    cosmeticId: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
};
