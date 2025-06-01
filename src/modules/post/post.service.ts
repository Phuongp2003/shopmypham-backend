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
import {
    CreatePostDto,
    PaginatedPostResponse,
    PostQueryParamsSchema,
    PostResponse,
} from './post.dto';

export class PostService {
    static readonly CACHE_PREFIX = 'post';

    static async getPosts(
        query: PostQueryParamsSchema,
    ): Promise<PaginatedPostResponse> {
        const { authorId, sortBy = 'createdAt', sortOrder = 'desc', search } = query;
        const published = query.published ? query.published == 'true' : undefined;
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        // Tạo điều kiện truy vấn
        const where = {
            ...(authorId && { authorId }),
            ...(published !== undefined && { published }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                    { content: { contains: search } },
                ],
            }),
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
            description: post.description,
            image: post.image || '',
            slug: post.slug,
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

    static async getPostById(
        userId: string,
        postId: string,
    ): Promise<PostResponse> {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                comments: true,
            },
        });

        if (!post) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Không tìm thấy bài viết',
            );
        }

        const response: PostResponse = {
            id: post.id,
            title: post.title,
            description: post.description,
            image: post.image || '',
            slug: post.slug,
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
        dto: CreatePostDto,
    ): Promise<PostResponse> {
        const { title, content, published, description, image } = dto;

        // Tạo bài viết trong transaction để dễ mở rộng (gắn tag, gắn category...)
        return await prisma.$transaction(async (tx) => {
            // 1. Kiểm tra user tồn tại
            const user = await tx.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Người dùng không tồn tại',
                );
            }

            // 2. Tạo bài viết
            const slug = this.generateSlug(title);
            const post = await tx.post.create({
                data: {
                    title,
                    content,
                    published: published ?? false,
                    authorId: userId,
                    description,
                    image,
                    slug,
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
                description: post.description,
                image: post.image || '',
                slug: post.slug,
                authorId: post.authorId,
                comments: [],
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

        if (!post) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Không tìm thấy bài viết',
            );
        }
        const slug = this.generateSlug(data.title || '');
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                ...data,
                description: data.description,
                image: data.image || '',
                slug: slug,
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
        await CacheService.clearByPrefix(`${PostService.CACHE_PREFIX}:list`);
        await CacheService.delete(
            CacheService.generateKey(`${PostService.CACHE_PREFIX}:detail`, {
                postId,
            }),
        );
        const response: PostResponse = {
            id: updatedPost.id,
            title: updatedPost.title,
            description: updatedPost.description,
            image: updatedPost.image || '',
            slug: updatedPost.slug,
            content: updatedPost.content,
            published: updatedPost.published,
            authorId: updatedPost.author.id,
            comments: [],
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
        return response;
    }

    static async deletePost(userId: string, postId: string): Promise<void> {
        // 1. Tìm bài viết
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                'Không tìm thấy bài viết',
            );
        }

        await prisma.comment.deleteMany({
            where: { postId },
        });
        
        await prisma.post.delete({
            where: { id: postId },
        });
    }

    private static generateSlug(title: string): string {
        const randomString = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substring(0, 5)
        const slug = `${title}-${randomString}`
            .toLowerCase()
            .normalize('NFD')
            .replace(/[^\u0000-\u007F]/g, '') // Remove non-ASCII characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '') // Remove all non-word characters
        return slug
    }
}
