import { Request, Response } from "express";
import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { validateRequest } from "@/common/middlewares/validate-request.middleware";
import {
  postCreateSchema,
  postQueryParamsSchema,
  postUpdateSchema,
} from "./post.dto";
import { PostService } from "./post.service";

export class PostController {
  static async getPosts(req: Request, res: Response) {
    try {
      const { posts, total } = await PostService.getPosts(req.query);
      res.json({
        status: "success",
        data: { posts, total },
        message: "Lấy danh sách bài viết thành công.",
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          status: "error",
          message: error.message,
          code: error.status,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message:
            "Đã xảy ra lỗi khi lấy danh sách bài viết. Vui lòng thử lại sau.",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      res.json({
        status: "success",
        data: post,
        message: "Lấy thông tin bài viết thành công.",
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          status: "error",
          message: error.message,
          code: error.status,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message:
            "Đã xảy ra lỗi khi lấy thông tin bài viết. Vui lòng thử lại sau.",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static createPost = [
    validateRequest({ body: postCreateSchema }),
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            "Vui lòng đăng nhập để tạo bài viết mới.",
          );
        }
        const post = await PostService.createPost(req.user.id, req.body);
        res.status(HttpStatus.CREATED).json({
          status: "success",
          data: post,
          message: "Tạo bài viết mới thành công.",
        });
      } catch (error) {
        if (error instanceof HttpException) {
          res.status(error.status).json({
            status: "error",
            message: error.message,
            code: error.status,
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Đã xảy ra lỗi khi tạo bài viết. Vui lòng thử lại sau.",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        }
      }
    },
  ];

  static updatePost = [
    validateRequest({ body: postUpdateSchema }),
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new HttpException(
            HttpStatus.UNAUTHORIZED,
            "Vui lòng đăng nhập để cập nhật bài viết.",
          );
        }
        const post = await PostService.updatePost(
          req.params.id,
          req.user.id,
          req.body,
        );
        res.json({
          status: "success",
          data: post,
          message: "Cập nhật bài viết thành công.",
        });
      } catch (error) {
        if (error instanceof HttpException) {
          res.status(error.status).json({
            status: "error",
            message: error.message,
            code: error.status,
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message:
              "Đã xảy ra lỗi khi cập nhật bài viết. Vui lòng thử lại sau.",
            code: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        }
      }
    },
  ];

  static async deletePost(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          "Vui lòng đăng nhập để xóa bài viết.",
        );
      }
      await PostService.deletePost(req.params.id, req.user.id);
      res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        message: "Xóa bài viết thành công.",
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          status: "error",
          message: error.message,
          code: error.status,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại sau.",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
