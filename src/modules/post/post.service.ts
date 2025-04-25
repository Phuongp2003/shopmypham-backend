import { prisma } from '@/config/prisma';
import { PostQueryParams, PostCreateInput, PostUpdateInput, PostWithAuthor } from './post.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { CacheService } from '@/common/services/cache.service';

export class PostService {
  private cacheService: CacheService;
  private readonly CACHE_PREFIX = 'post';

  constructor() {
    this.cacheService = CacheService.getInstance();
  }

  async getPosts(params: PostQueryParams): Promise<{ posts: PostWithAuthor[]; total: number }> {
    const cacheKey = this.cacheService.generateKey(`${this.CACHE_PREFIX}:list`, params);
    
    return this.cacheService.getOrSet(cacheKey, async () => {
      const { search, sortBy, sortOrder, page = 1, limit = 10, published } = params;

      const where = {
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
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
          orderBy: sortBy ? { [sortBy]: sortOrder || 'desc' } : { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.post.count({ where }),
      ]);

      return { posts, total };
    });
  }

  async getPostById(id: string): Promise<PostWithAuthor> {
    const cacheKey = this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id });
    
    return this.cacheService.getOrSet(cacheKey, async () => {
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
        throw new HttpException(HttpStatus.NOT_FOUND, 'Post not found');
      }

      return post;
    });
  }

  async createPost(userId: string, data: PostCreateInput): Promise<PostWithAuthor> {
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

    // Clear list cache since we added a new post
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);

    return post;
  }

  async updatePost(id: string, userId: string, data: PostUpdateInput): Promise<PostWithAuthor> {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Post not found');
    }

    if (post.authorId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
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

    // Clear both list and detail cache
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await this.cacheService.delete(this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }));

    return updatedPost;
  }

  async deletePost(id: string, userId: string): Promise<void> {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Post not found');
    }

    if (post.authorId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    await prisma.post.delete({
      where: { id },
    });

    // Clear both list and detail cache
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await this.cacheService.delete(this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }));
  }
} 
