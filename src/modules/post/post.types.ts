import { type User } from '@/modules/user/user.types';
import type { Comment } from '@/modules/comment/comment.types';
export type PostWithAuthor = Post & {
    author: Pick<User, 'id' | 'name' | 'email'>;
};

export type PostQueryParams = {
    search?: string;
    sortBy?: 'createdAt' | 'title';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    published?: boolean;
};

export type PostCreateInput = {
    title: string;
    description: string;
    content: string;
    image: string;
    slug: string;
    published?: boolean;
};

export type PostUpdateInput = Partial<PostCreateInput>;

export type PostResponse = {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    slug: string;
    published: boolean;
    author: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
};

export type Post = {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    slug: string;
    published: boolean;
    authorId: string;
    author: User;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
};
