import type { CosmeticVariant } from "../cosmetic/submodules/variant/cosmeticVariant.types";

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

/**
 * @swagger
 * title: GetUserCartRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *   userId:
 *     type: string
 *   createdAt:
 *     type: string
 *   updatedAt:
 *     type: string
 *   items:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               variantId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *               image:
 *               sku:
 *                 type: string
 *               cosmeticName:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     value:
 *                       type: string
 */
export type GetUserCartRes = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CosmeticVariant[];
}
