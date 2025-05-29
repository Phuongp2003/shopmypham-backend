
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
 *   userId:
 *     type: string
 *   variantId:
 *     type: string
 *   quantity:
 *     type: number
 *   price:
 *     type: number
 */
export type AddToCartDto = {
  userId: string;
  variantId: string;
  quantity: number;
  price: number;
};

