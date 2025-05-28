import type { Post } from "@/modules/post/post.types";
import type { Comment } from "@/modules/comment/comment/types";
import type { Order } from "@/modules/order/order.types";
import type { Cart } from "@/modules/cart/cart.types";

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
  googleId: string | null;
  secretKey: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: Comment[];
  orders: Order[];
  cart: Cart | null;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
