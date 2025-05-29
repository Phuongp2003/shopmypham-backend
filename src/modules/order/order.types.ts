import type { User } from "@/modules/user/user.types";
import type { Payment } from "@/modules/payment/payment.types";
import type { CosmeticVariant } from "@/modules/cosmetic/cosmetic.types";

export type Order = {
  id: string;
  userId: string;
  status: string;
  shippingAddress: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
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
