import type { User } from "@/modules/user/user.types";
//import type { PaymentStatus } from "@/modules/payment/payment.types";
import type { CosmeticVariant } from '@/modules/cosmetic/submodules/variant/cosmeticVariant.types';
import { OrderStatus, PaymentStatus } from "@prisma/client";


export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  addressId: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  user: User;
  details: OrderDetail[];
  payments: Payment[];
};

export type OrderDetail = {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  price: number;
  order: Order;
  variant: CosmeticVariant;
};


/**
 * @swagger
 * title: Address
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID địa chỉ
 *   userId:
 *     type: string
 *     description: ID người dùng
 *   recipientName:
 *     type: string
 *     description: Tên người nhận
 *   phone:
 *     type: string
 *     description: Số điện thoại
 *   addressLine:
 *     type: string
 *     description: Địa chỉ cụ thể
 *   district:
 *     type: string
 *     description: Quận/Huyện
 *   city:
 *     type: string
 *     description: Tỉnh/Thành phố
 *   isDefault:
 *     type: boolean
 *     description: Địa chỉ mặc định hay không
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Thời gian tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Thời gian cập nhật
 */
export type Address = {
  id: string;
  userId: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  district: string;
  city: string;
  isDefault: boolean;
  //user: User;
  //orders: Order[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * @swagger
 * title: Payment
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID thanh toán
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   status:
 *     type: string
 *     description: Trạng thái thanh toán
 *   paymentMethod:
 *     type: string
 *     description: Phương thức thanh toán
 *   transactionId:
 *     type: string
 *     description: ID giao dịch thanh toán
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Thời gian tạo thanh toán
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Thời gian cập nhật thanh toán
 */
export type Payment = {
  id: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
  order: Order;

}

// export interface Order {
//   id: string;
//   userId: string;
//   status: OrderStatus;
//   shippingAddress: string;
//   note?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface OrderDetail {
//   id: string;
//   orderId: string;
//   cosmeticId: string;
//   quantity: number;
//   price: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface OrderWithDetails extends Order {
//   details: OrderDetail[];
// }

// export interface CreateOrderDto {
//   shippingAddress: string;
//   note?: string;
//   details: {
//     cosmeticId: string;
//     quantity: number;
//     price: number;
//   }[];
// }

// export interface UpdateOrderStatusDto {
//   status: OrderStatus;
// }

// export interface OrderQueryDto {
//   status?: OrderStatus;
//   userId?: string;
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }