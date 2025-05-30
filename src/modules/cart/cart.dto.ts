
/**
 * @swagger
 * title: GetCartParams
 * type: object
 * properties:
 *   userId:
 *     type: string
 */
export class GetCart  {
  /** ID của người dùng */
  userId!: string;
}

/**
 * @swagger
 * title: AddToCart
 * type: object
 * properties:
 *   variantId:
 *     type: string
 *   quantity:
 *     type: number
 */
export type AddToCartDto = {
  variantId: string;
  quantity: number;
};

/**
 * @swagger
 * title: UpdateCartItem
 * type: object
 * properties:
 *   variantId:
 *     type: string
 *     description: ID loại sản phẩm mới
 *   quantity:
 *     type: number
 *     description: Số lượng mới
 */
export type UpdateCartItemDto = {
  variantId?: string;
  quantity?: number;
};

/**
 * @swagger
 * title: CartItemResponse
 * type: object
 * properties:
 *   variantId:
 *    type: string
 */
export type RemoveCartItemDto = {
  variantId: string;
};


