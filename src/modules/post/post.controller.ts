import { Request, Response } from 'express';
import { PostService } from './post.service';
import { postQueryParamsSchema, postCreateSchema, postUpdateSchema } from './post.dto';
import { validateRequest } from '@/common/middlewares/validate-request.middleware';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  getPosts = [
    validateRequest({ query: postQueryParamsSchema }),
    async (req: Request, res: Response) => {
      try {
        const { posts, total } = await this.postService.getPosts(req.query);
        res.json({ 
          status: 'success',
          data: { posts, total },
          message: 'Lấy danh sách bài viết thành công.'
        });
      } catch (error) {
        if (error instanceof HttpException) {
          res.status(error.status).json({ 
            status: 'error',
            message: error.message,
            code: error.status
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
            status: 'error',
            message: 'Đã xảy ra lỗi khi lấy danh sách bài viết. Vui lòng thử lại sau.',
            code: HttpStatus.INTERNAL_SERVER_ERROR
          });
        }
      }
    },
  ];

  getPostById = async (req: Request, res: Response) => {
    try {
      const post = await this.postService.getPostById(req.params.id);
      res.json({ 
        status: 'success',
        data: post,
        message: 'Lấy thông tin bài viết thành công.'
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ 
          status: 'error',
          message: error.message,
          code: error.status
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
          status: 'error',
          message: 'Đã xảy ra lỗi khi lấy thông tin bài viết. Vui lòng thử lại sau.',
          code: HttpStatus.INTERNAL_SERVER_ERROR
        });
      }
    }
  };

  createPost = [
    validateRequest({ body: postCreateSchema }),
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            'Vui lòng đăng nhập để tạo bài viết mới.'
          );
        }
        const post = await this.postService.createPost(req.user.id, req.body);
        res.status(HttpStatus.CREATED).json({ 
          status: 'success',
          data: post,
          message: 'Tạo bài viết mới thành công.'
        });
      } catch (error) {
        if (error instanceof HttpException) {
          res.status(error.status).json({ 
            status: 'error',
            message: error.message,
            code: error.status
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
            status: 'error',
            message: 'Đã xảy ra lỗi khi tạo bài viết. Vui lòng thử lại sau.',
            code: HttpStatus.INTERNAL_SERVER_ERROR
          });
        }
      }
    },
  ];

  updatePost = [
    validateRequest({ body: postUpdateSchema }),
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            'Vui lòng đăng nhập để cập nhật bài viết.'
          );
        }
        const post = await this.postService.updatePost(req.params.id, req.user.id, req.body);
        res.json({ 
          status: 'success',
          data: post,
          message: 'Cập nhật bài viết thành công.'
        });
      } catch (error) {
        if (error instanceof HttpException) {
          res.status(error.status).json({ 
            status: 'error',
            message: error.message,
            code: error.status
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
            status: 'error',
            message: 'Đã xảy ra lỗi khi cập nhật bài viết. Vui lòng thử lại sau.',
            code: HttpStatus.INTERNAL_SERVER_ERROR
          });
        }
      }
    },
  ];

  deletePost = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          'Vui lòng đăng nhập để xóa bài viết.'
        );
      }
      await this.postService.deletePost(req.params.id, req.user.id);
      res.status(HttpStatus.NO_CONTENT).json({ 
        status: 'success',
        message: 'Xóa bài viết thành công.'
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ 
          status: 'error',
          message: error.message,
          code: error.status
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
          status: 'error',
          message: 'Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại sau.',
          code: HttpStatus.INTERNAL_SERVER_ERROR
        });
      }
    }
  };
} 
