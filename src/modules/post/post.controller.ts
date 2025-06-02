import { Request, Response } from 'express';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { validateRequest } from '@/common/middlewares/validate-request.middleware';
import { ErrorResponse } from '@/common/interfaces/error-response.interface';
import { PostService } from './post.service';
import { prisma } from '@/config/prisma';
import {
    PostQueryParamsSchema,
    PaginatedPostResponse,
    CreatePostDto,
    SuccessResponse,
} from './post.dto';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({ tag: 'Post', description: 'Quản lý bài viết' })
export class PostController {
    @Get(
        {
            name: 'get-all-post',
            description: 'Lấy danh sách bài viết',
            path: '/',
        },
        {
            query: 'PostQueryParamsSchema',
            response: 'PaginatedPostResponse',
        },
    )
    @RequireHeader()
    static async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const params: PostQueryParamsSchema = {
                ...req.query,
            } as PostQueryParamsSchema;

            const result = await PostService.getPosts(params);
            res.status(200).json(result);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Get(
        {
            name: 'get-post-id',
            description: 'Lấy bài viết id',
            path: '/:id',
        },
        {
            response: 'PostResponse',
        },
    )
    @RequireHeader()
    static async getPostById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Missing or invalid 'id' parameter",
                });
                return;
            }
            const post = await PostService.getPostById(id);
            console.log('Found post:', post);
            res.status(HttpStatus.OK).json(post);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Post(
        {
            name: 'create-post',
            description: 'Tạo bài viết mới',
            path: '/',
        },
        {
            body: 'CreatePostDto',
            response: 'PostResponse',
        },
    )
    @RequireHeader()
    static async createPost(req: Request, res: Response): Promise<void> {
        try {
            const data: CreatePostDto = req.body;

            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            console.log('Creating post with data:', req.user);
            const userId = req.user.id;
            console.log('Creating post for user:', userId, 'with data:', data);

            // // Optional: kiểm tra user có tồn tại không
            // const user = await prisma.user.findUnique({
            //     where: { id: userId },
            // });
            // console.log('User found:', user);
            // if (!user) {
            //     throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
            // }

            const post = await PostService.createPost(userId, data);
            res.status(HttpStatus.CREATED).json(post);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }
    @Put(
        {
            name: 'update-post-by-id',
            description: 'Cập nhật bài viết',
            path: '/:id',
        },
        {
            body: 'CreatePostDto',
            response: 'PostResponse',
        },
    )
    @RequireHeader()
    static async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data: CreatePostDto = req.body;

            if (!id || typeof id !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Missing or invalid 'id' parameter",
                });
                return;
            }

            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }

            const userId = req.user.id;

            const post = await PostService.updatePost(userId, id, data);

            res.status(HttpStatus.OK).json(post);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }
    @Delete(
        {
            name: 'remove-cart-item',
            description: 'Xoá 1 sản phẩm khỏi giỏ hàng',
            path: '/:id',
        },
        {
            response: 'SuccessResponse',
        },
    )
    @RequireHeader()
    static async deletePost(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }

            const userId = req.user.id;
            const { id: postId } = req.params;

            if (!postId) {
                throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Missing postId parameter',
                );
            }

            await PostService.deletePost(userId, postId);

            res.status(HttpStatus.OK).json({
                message: 'Xoá bài viết thành công',
            } satisfies SuccessResponse);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Lỗi hệ thống',
                });
            }
        }
    }
}
