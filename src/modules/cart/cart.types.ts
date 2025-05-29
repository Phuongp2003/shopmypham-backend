import type { User } from '@/modules/user/user.types';
import type { CosmeticVariant } from '@/modules/cosmetic/cosmetic.types';

/**
 * @swagger
 * title: Cart
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID giỏ hàng
 *   userId:
 *     type: string
 *     description: ID người dùng
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   user:
 *     $ref: '#/components/schemas/User'
 *   details:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CartDetail'
 */
export type Cart = {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    details: CartDetail[];
};

/**
 * @swagger
 * title: CartDetail
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID chi tiết giỏ hàng
 *   cartId:
 *     type: string
 *     description: ID giỏ hàng
 *   variantId:
 *     type: string
 *     description: ID biến thể mỹ phẩm
 *   quantity:
 *     type: number
 *     description: Số lượng
 *   price:
 *     type: number
 *     description: Giá đơn vị tại thời điểm thêm vào giỏ
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 *   variant:
 *     $ref: '#/components/schemas/CosmeticVariant'
 */

export type CartDetail = {
    id: string;
    cartId: string;
    variantId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    variant: CosmeticVariant;
};

/**
 * @swagger
 * title: CartResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID giỏ hàng
 *   userId:
 *     type: string
 *     description: ID người dùng
 *   items:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CartItem'
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */

export type CartResponse = {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

/**
 * @swagger
 * title: CartItem
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mục trong giỏ hàng
 *   variantId:
 *     type: string
 *     description: ID biến thể mỹ phẩm
 *   quantity:
 *     type: number
 *     description: Số lượng
 *   price:
 *     type: number
 *     description: Giá đơn vị
 *   totalPrice:
 *     type: number
 *     description: Tổng giá (price * quantity)
 *   sku:
 *     type: string
 *     description: Mã SKU của biến thể
 *   cosmeticName:
 *     type: string
 *     description: Tên mỹ phẩm
 *   options:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           description: Tên tùy chọn (ví dụ: màu sắc, dung tích)
 *         value:
 *           type: string
 *           description: Giá trị tùy chọn (ví dụ: Đỏ cam, 50ml)
 */

export type CartItem = {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  totalPrice: number;

  // Dữ liệu thêm để show
  sku: string;
  cosmeticName: string;
  options: {
    key: string;
    value: string;
  }[];
};


