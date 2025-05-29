import { Request, Response } from 'express';

import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";

import { CartService } from "./cart.service";
// import { CartResponse, CreateCartDTO, UpdateCartDTO } from "./types/cart.types";
import { CartResponse } from "./cart.types";
import { SwaggerController, Get, Post, Put, Delete } from "@/common/annotation/swagger.annotation";
import { GetCartParams  } from "./cart.dto";
@SwaggerController({ tag: "Cart", description: "Quản lý giỏ hàng" })
export class CartController {
  @Get(
    {
      name: "get-cart",
      description: "Lấy giỏ hàng của người dùng",
      path: "/cart/:userId",
    },
    {
      params: "GetCartParams",
      response: "CartResponse"
    }
  )

  static async getCart(req: Request, res: Response): Promise<void> {
    try {
      // if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      // const userId = req.user.id;
      console.log("🧾 req.params:", req.params);
       const userId = req.params.userId;
       console.log("Received userId:", userId);


    if (!userId) {
      throw new HttpException(HttpStatus.BAD_REQUEST, "Missing userId parameter");
    }
      const cart: CartResponse = await CartService.getCart(userId);
      console.log("Found cart:", cart);

      res.json(cart);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }

    }
    
  
  // @Post(
  //   {
  //     name: "create-cart",
  //     description: "Tạo mới giỏ hàng",
  //     path: "/cart",
  //   },
  //   {
  //     body: "CreateCartDTO",
  //     response: "CartResponse",
  //   }
  // )
  // static async createCart(req: Request, res: Response): Promise<void> {
  //   try {
  //     if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
  //     const userId = req.user.id;
  //     const dto: CreateCartDTO = req.body;
  //     const cart = await CartService.createCart(userId, dto);
  //     res.status(HttpStatus.CREATED).json(cart);
  //   } catch (error: unknown) {
  //     const errorResponse: ErrorResponse = {
  //       status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error instanceof Error ? error.message : "Internal server error",
  //     };
  //     res.status(errorResponse.status).json(errorResponse);
  //   }
  // }

  // // static createCart = async (req: Request, res: Response) => {
  // //   try {
  // //     if (!req.user) {
  // //       throw new HttpException(
  // //         HttpStatus.UNAUTHORIZED,
  // //         "User not authenticated",
  // //       );
  // //     }
  // //     const userId = req.user.id;
  // //     const dto: CreateCartDTO = req.body;
  // //     const cart = await CartService.createCart(userId, dto);
  // //     res.status(HttpStatus.CREATED).json(cart);
  // //   } catch (error) {
  // //     if (error instanceof HttpException) {
  // //       res.status(error.status).json({ message: error.message });
  // //     } else {
  // //       res
  // //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
  // //         .json({ message: "Internal server error" });
  // //     }
  // //   }
  // // };

  //  @Put(
  //   {
  //     name: "update-cart",
  //     description: "Cập nhật giỏ hàng",
  //     path: "/cart",
  //   },
  //   {
  //     body: "UpdateCartDTO",
  //     response: "CartResponse"
  //   }
  // )

  // static async updateCart(req: Request, res: Response): Promise<void> {
  //   try {
  //     if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
  //     const userId = req.user.id;
  //     const dto: UpdateCartDTO = req.body;
  //     const cart = await CartService.updateCart(userId, dto);
  //     res.json(cart);
  //   } catch (error: unknown) {
  //     const errorResponse: ErrorResponse = {
  //       status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error instanceof Error ? error.message : "Internal server error",
  //     };
  //     res.status(errorResponse.status).json(errorResponse);
  //   }
  // }


  // // static updateCart = async (req: Request, res: Response) => {
  // //   try {
  // //     if (!req.user) {
  // //       throw new HttpException(
  // //         HttpStatus.UNAUTHORIZED,
  // //         "User not authenticated",
  // //       );
  // //     }
  // //     const userId = req.user.id;
  // //     const dto: UpdateCartDTO = req.body;
  // //     const cart = await CartService.updateCart(userId, dto);
  // //     res.json(cart);
  // //   } catch (error) {
  // //     if (error instanceof HttpException) {
  // //       res.status(error.status).json({ message: error.message });
  // //     } else {
  // //       res
  // //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
  // //         .json({ message: "Internal server error" });
  // //     }
  // //   }
  // // };

  //  @Delete(
  //   {
  //     name: "clear-cart",
  //     description: "Xoá toàn bộ giỏ hàng",
  //     path: "/cart",
  //   }
  // )
  // static async clearCart(req: Request, res: Response): Promise<void> {
  //   try {
  //     if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
  //     const userId = req.user.id;
  //     await CartService.clearCart(userId);
  //     res.status(HttpStatus.NO_CONTENT).send();
  //   } catch (error: unknown) {
  //     const errorResponse: ErrorResponse = {
  //       status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error instanceof Error ? error.message : "Internal server error",
  //     };
  //     res.status(errorResponse.status).json(errorResponse);
  //   }
  // }

  // static clearCart = async (req: Request, res: Response) => {
  //   try {
  //     if (!req.user) {
  //       throw new HttpException(
  //         HttpStatus.UNAUTHORIZED,
  //         "User not authenticated",
  //       );
  //     }
  //     const userId = req.user.id;
  //     await CartService.clearCart(userId);
  //     res.status(HttpStatus.NO_CONTENT).send();
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       res.status(error.status).json({ message: error.message });
  //     } else {
  //       res
  //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //         .json({ message: "Internal server error" });
  //     }
  //   }
  // };

  // @Get(
  //   {
  //     name: "get-cart-summary",
  //     description: "Lấy tổng quan giỏ hàng",
  //     path: "/cart/summary",
  //   },
  //   {
  //     response: "CartSummaryResponse"
  //   }
  // )
  // static async getCartSummary(req: Request, res: Response): Promise<void> {
  //   try {
  //     if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
  //     const userId = req.user.id;
  //     const summary = await CartService.getCartSummary(userId);
  //     res.json(summary);
  //   } catch (error: unknown) {
  //     const errorResponse: ErrorResponse = {
  //       status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error instanceof Error ? error.message : "Internal server error",
  //     };
  //     res.status(errorResponse.status).json(errorResponse);
  //   }
  // }
  // static getCartSummary = async (req: Request, res: Response) => {
  //   try {
  //     if (!req.user) {
  //       throw new HttpException(
  //         HttpStatus.UNAUTHORIZED,
  //         "User not authenticated",
  //       );
  //     }
  //     const userId = req.user.id;
  //     const summary = await CartService.getCartSummary(userId);
  //     res.json(summary);
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       res.status(error.status).json({ message: error.message });
  //     } else {
  //       res
  //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //         .json({ message: "Internal server error" });
  //     }
  //   }
  // };
}
