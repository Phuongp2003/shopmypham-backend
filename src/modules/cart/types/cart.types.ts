import { Cosmetic } from "@prisma/client";

export interface CartItem {
  cosmeticId: string;
  quantity: number;
  price: number;
}

export interface CreateCartDTO {
  items: CartItem[];
}

export interface UpdateCartDTO {
  items: CartItem[];
}

export interface CartResponse {
  id: string;
  userId: string;
  details: {
    id: string;
    cosmeticId: string;
    quantity: number;
    price: number;
    cosmetic: Cosmetic;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  items: {
    cosmeticId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}
