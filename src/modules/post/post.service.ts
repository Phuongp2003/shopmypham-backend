import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { CacheService } from "@/common/services/cache.service";
import { prisma } from "@/config/prisma";

import {
  PostCreateInput,
  PostQueryParams,
  PostUpdateInput,
  PostWithAuthor,
} from "./post.types";

export class PostService {
  static cacheService = CacheService.getInstance();
  static readonly CACHE_PREFIX = "post";

  static async getPosts(
    params: PostQueryParams,
  ): Promise<{ posts: PostWithAuthor[]; total: number }> {
    const cacheKey = PostService.cacheService.generateKey(
      `${PostService.CACHE_PREFIX}:list`,
      params,
    );
    return PostService.cacheService.getOrSet(cacheKey, async () => {
      const {
        search,
        sortBy,
        sortOrder,
        page = 1,
        limit = 10,
        published,
      } = params;
      const where = {
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(published !== undefined && { published }),
      };
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.post.count({ where }),
      ]);
      return { posts, total };
    });
  }

  static async getPostById(id: string): Promise<PostWithAuthor> {
    const cacheKey = PostService.cacheService.generateKey(
      `${PostService.CACHE_PREFIX}:detail`,
      { id },
    );
    return PostService.cacheService.getOrSet(cacheKey, async () => {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      if (!post) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Post not found");
      }
      return post;
    });
  }

  static async createPost(
    userId: string,
    data: PostCreateInput,
  ): Promise<PostWithAuthor> {
    const post = await prisma.post.create({
      data: {
        ...data,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    await PostService.cacheService.clearByPrefix(
      `${PostService.CACHE_PREFIX}:list`,
    );
    return post;
  }

  static async updatePost(
    id: string,
    userId: string,
    data: PostUpdateInput,
  ): Promise<PostWithAuthor> {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Post not found");
    }
    if (post.authorId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }
    const updatedPost = await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    await PostService.cacheService.clearByPrefix(
      `${PostService.CACHE_PREFIX}:list`,
    );
    await PostService.cacheService.delete(
      PostService.cacheService.generateKey(
        `${PostService.CACHE_PREFIX}:detail`,
        { id },
      ),
    );
    return updatedPost;
  }

  static async deletePost(id: string, userId: string): Promise<void> {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Post not found");
    }
    if (post.authorId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }
    await prisma.post.delete({
      where: { id },
    });
    await PostService.cacheService.clearByPrefix(
      `${PostService.CACHE_PREFIX}:list`,
    );
    await PostService.cacheService.delete(
      PostService.cacheService.generateKey(
        `${PostService.CACHE_PREFIX}:detail`,
        { id },
      ),
    );
  }
}
