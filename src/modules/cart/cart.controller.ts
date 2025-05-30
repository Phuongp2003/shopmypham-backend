import { Request, Response } from 'express';

import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";

import { CartService } from "./cart.service";
// import { CartResponse, CreateCartDTO, UpdateCartDTO } from "./types/cart.types";
import { CartResponse, CartItemResponse, CartItem, SuccessResponse } from "./cart.types";
import { Controller, Get, Post, Put, Delete, RequireHeader } from "@/common/annotation/swagger.annotation";
import { GetCart, AddToCartDto, UpdateCartItemDto  } from "./cart.dto";
@Controller({ tag: "Cart", description: "Quản lý giỏ hàng" })
export class CartController {
  @Get(
    {
      name: "get-cart-by-user",
      description: "Lấy giỏ hàng của người dùng",
      path: "/",
    },
    {
      response: "CartResponse"
    }
  )
  @RequireHeader()
  static async getCart(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      // const userId = req.user.id;

      const userId = req.user.id as string;
      // console.log("User ID from request:", userId);

    if (!userId) {
      throw new HttpException(HttpStatus.BAD_REQUEST, "Missing userId parameter");
    }
      const cart: CartResponse = await CartService.getCart(userId);
      // console.log("Found cart:", cart);

      res.json(cart);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
    }
  
  @Post(
    {
      name: "add-cart-by-user",
      description: "Thêm sản phẩm vào giỏ hàng của người dùng",
      path: "/",
    },
    {
      body: "AddToCartDto",
      response: "CartItemResponse",
    }
  )
  @RequireHeader()
  static async createCart(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      const userId = req.user.id;
      console.log("User ID from request:", userId);
      const dto: AddToCartDto = req.body;
      const cart = await CartService.addToCart(userId, dto);
      res.status(HttpStatus.CREATED).json(cart);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

   @Put(
    {
      name: "update-cart-item",
      description: "Cập nhật sản phẩm trong giỏ hàng",
      path: "/:variantId",
    },
    {
      body: "UpdateCartItemDto",
      response: "CartItemResponse"
    }
  )

  @RequireHeader()
  static async updateCart(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      const userId = req.user.id;
      const { variantId } = req.params;
      console.log("variantId:", variantId);
      if (!variantId) {
        throw new HttpException(HttpStatus.BAD_REQUEST, "Missing variantId parameter");
      }
      const dto: UpdateCartItemDto = req.body;
      const cart = await CartService.updateCartItem(userId, variantId, dto);
      res.json(cart);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }


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

   @Delete(
    {
      name: "remove-cart-item",
      description: "Xoá 1 sản phẩm khỏi giỏ hàng",
      path: "/:variantId",
    },
    {
      response: "SuccessResponse",
    }
  )
  @RequireHeader()
  static async removeCartItem(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      const userId = req.user.id;
      const { variantId } = req.params;
      if (!variantId) {
        throw new HttpException(HttpStatus.BAD_REQUEST, "Missing variantId parameter");
      }
      await CartService.removeCartItem(userId, variantId);
      res.status(200).json({ message: 'Xoá sản phẩm khỏi giỏ hàng thành công' } satisfies SuccessResponse);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
  }

  @Delete(
    {
      name: "clear-cart",
      description: "Xoá tất cả sản phẩm khỏi giỏ hàng",
      path: "/",
    },
    {
      response: "SuccessResponse",
    }
  )
  @RequireHeader()
  static async clearCart(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new HttpException(HttpStatus.UNAUTHORIZED, "User not authenticated");
      const userId = req.user.id;
      await CartService.clearCart(userId);
      res.status(200).json({ message: 'Xoá tất cả sản phẩm khỏi giỏ hàng thành công' } satisfies SuccessResponse);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

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
