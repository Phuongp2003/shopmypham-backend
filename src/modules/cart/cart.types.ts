import type { User } from '@/modules/user/user.types';
import type { CosmeticVariant } from '@/modules/cosmetic/cosmetic.types';


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

export type CartResponse = {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

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

