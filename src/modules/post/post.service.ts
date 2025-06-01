import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { CacheService } from '@/common/services/cache.service';
import { prisma } from '@/config/prisma';

import {
    PostCreateInput,
    PostQueryParams,
    PostUpdateInput,
    PostWithAuthor,
} from './post.types';
import { CreatePostDto, PaginatedPostResponse, PostQueryParamsSchema, PostResponse } from './post.dto';

export class PostService {
    static readonly CACHE_PREFIX = 'post';

    static async getPosts(query: PostQueryParamsSchema): Promise<PaginatedPostResponse> {
        const {
            authorId,
            published,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = query;
    
        // Tạo điều kiện truy vấn
        const where = {
            ...(authorId && { authorId }),
            ...(published !== undefined && { published }),
        };
    
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                include: {
                    author: true, // assuming relation to User model
                    comments: true, // assuming relation to Comment model
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            }),
            prisma.post.count({ where }),
        ]);
    
        const formattedPosts: PostResponse[] = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            authorId: post.authorId,
            comments: post.comments.map((c) => c.id), // assuming you just want the comment IDs
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));
    
        return {
            posts: formattedPosts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    

    static async getPostById(userId: string, postId: string): Promise<PostResponse> {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                comments: true,
            },
        });
    
        if (!post) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Không tìm thấy bài viết');
        }

    
        const response: PostResponse = {
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            authorId: post.authorId,
            comments: post.comments.map((c) => c.id),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    
        return response;
    }
    
    static async createPost(
        userId: string,
        dto: CreatePostDto
      ): Promise<PostResponse> {
        const { title, content, published } = dto;
        console.log('>>> userId truyền vào:', userId);

        // Tạo bài viết trong transaction để dễ mở rộng (gắn tag, gắn category...)
        return await prisma.$transaction(async (tx) => {
          // 1. Kiểm tra user tồn tại
          const user = await tx.user.findUnique({
            where: { id: userId },
          });
      
          if (!user) {
            throw new HttpException(
              HttpStatus.BAD_REQUEST,
              'Người dùng không tồn tại'
            );
          }
      
          // 2. Tạo bài viết
          const post = await tx.post.create({
            data: {
              title,
              content,
              published: published ?? false,
              authorId: userId,
            },
            include: {
              author: true,
              comments: true,
            },
          });
      
          // 3. Trả về dữ liệu
          const response: PostResponse = {
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            authorId: post.authorId,
            comments: post.comments.map((c) => c.id),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
      
          return response;
        });
      }

    static async updatePost(
        userId: string,
        postId: string,
        data: PostUpdateInput,
    ): Promise<PostResponse> {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                comments: true,
            },
        });
        console.log('postId received:', postId);

        if (!post) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Không tìm thấy bài viết');
        }
    
        // Kiểm tra quyền truy cập (chỉ tác giả mới xem được)
        if (post.authorId !== userId) {
            throw new HttpException(HttpStatus.FORBIDDEN, 'Bạn không có quyền xem bài viết này');
        }
        const updatedPost = await prisma.post.update({
            where: { id: postId },
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
        await CacheService.clearByPrefix(`${PostService.CACHE_PREFIX}:list`);
        await CacheService.delete(
            CacheService.generateKey(`${PostService.CACHE_PREFIX}:detail`, {
                postId,
            }),
        );
        return updatedPost;
    }

    static async deletePost(userId: string, postId: string): Promise<void> {
        // 1. Tìm bài viết
        const post = await prisma.post.findUnique({
          where: { id: postId },
        });
      
        if (!post) {
          throw new HttpException(HttpStatus.NOT_FOUND, 'Không tìm thấy bài viết');
        }
      
        // 2. Kiểm tra quyền xóa (chỉ tác giả mới được xóa)
        if (post.authorId !== userId) {
          throw new HttpException(
            HttpStatus.FORBIDDEN,
            'Bạn không có quyền xóa bài viết này',
          );
        }
      
        // 3. Xóa các liên kết nếu cần (ví dụ: comment, tag)
        await prisma.comment.deleteMany({
          where: { postId },
        });
      
        // 4. Xóa bài viết
        await prisma.post.delete({
          where: { id: postId },
        });
      }
      
}
