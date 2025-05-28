import type { User } from "@/modules/user/user.types";
import type { CosmeticVariant } from "@/modules/cosmetic/cosmetic.types";

export type Cart = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  details: CartDetail[];
};

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
