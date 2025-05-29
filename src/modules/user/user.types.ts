import type { Post } from '@/modules/post/post.types';
import type { Comment } from '@/modules/comment/comment.types';
import type { Order } from '@/modules/order/order.types';
import type { Cart } from '@/modules/cart/cart.types';

export type User = {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: string;
    googleId: string | null;
    googleName: string | null;
    googleEmail: string | null;
    secretKey: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    posts?: Post[];
    comments?: Comment[];
    orders?: Order[];
    cart?: Cart | null;
};

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
