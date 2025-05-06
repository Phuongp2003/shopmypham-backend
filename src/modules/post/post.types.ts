import { Post, User } from "@prisma/client";

export type PostWithAuthor = Post & {
  author: Pick<User, "id" | "name" | "email">;
};

export type PostQueryParams = {
  search?: string;
  sortBy?: "createdAt" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  published?: boolean;
};

export type PostCreateInput = {
  title: string;
  content: string;
  published?: boolean;
};

export type PostUpdateInput = Partial<PostCreateInput>;

export type PostResponse = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
