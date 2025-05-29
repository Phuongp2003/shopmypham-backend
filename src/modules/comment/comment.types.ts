import type { Post } from "@/modules/post/post.types";
import type { User } from "@/modules/user/user.types";

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  post: Post;
};
