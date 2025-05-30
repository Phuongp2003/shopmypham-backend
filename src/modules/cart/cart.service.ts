import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';

// import {
//   CartResponse,
//   CartSummary,
//   CreateCartDTO,
//   UpdateCartDTO,
// } from "./types/cart.types";

import { CartResponse, CartItemResponse } from "./cart.types";
import { AddToCartDto, UpdateCartItemDto } from './cart.dto';

export class CartService {
  static async getCart(userId: string): Promise<CartResponse> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        details: {
          include: {
            variant: {
              include: {
                cosmetic: true,
                CosmeticVariantOption: {
                  include: {
                    option: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!cart) {
  throw new HttpException(HttpStatus.NOT_FOUND, "Cart not found");
  }

const cartResponse: CartResponse = {
        id: cart.id,
        userId: cart.userId,
        createdAt: cart.createdAt.toISOString(),
        updatedAt: cart.updatedAt.toISOString(),
        items: cart.details.map((detail) => {
          const { variant } = detail;
          return {
            id: detail.id,
            variantId: variant.id,
            quantity: detail.quantity,
            price: variant.price,
            totalPrice: detail.quantity * variant.price,
            sku: variant.sku,
            cosmeticName: variant.cosmetic.name,
            options: variant.CosmeticVariantOption.map((vo) => ({
              key: vo.option.optionKey,
              value: vo.option.optionValue,
            })),
          };
        }),
      };
    return cartResponse;
}


  static async addToCart(userId: string, dto: AddToCartDto): Promise<CartItemResponse> {
    const { variantId, quantity} = dto;

    // Kiểm tra kho
    const variant = await prisma.cosmeticVariant.findUnique({
      where: { id: variantId },
      select: {stock: true, price: true}
    });
    if (!variant) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Variant not found");
    }

    if (variant.stock < quantity) {
    throw new HttpException(
      HttpStatus.BAD_REQUEST,
      `Không đủ hàng trong kho. Tồn kho còn: ${variant.stock}`,
    );
  }
    // Tìm cart của user
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // Nếu chưa có thì tạo mới
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ
    let cartItem = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        variantId,
      },
    });

    if (cartItem) {
      // Nếu có, cập nhật số lượng và kiểm tra so với stock
      const newQuantity = cartItem.quantity + quantity;
      if( newQuantity > variant.stock) {
        throw new HttpException(
          HttpStatus.BAD_REQUEST,
          `Vượt quá số lượng tồn kho. Tối đa có thể thêm là: ${variant.stock - cartItem.quantity}`,
        );
      }
      // Cập nhật số lượng
      cartItem = await prisma.cartDetail.update({
        where: { id: cartItem.id },
        data: {
          quantity: newQuantity,
        },
      });
    } else {
      // Nếu chưa có, thêm mới
      cartItem = await prisma.cartDetail.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    // Lấy lại thông tin chi tiết của sản phẩm vừa thêm
    const itemDetail = await prisma.cartDetail.findUnique({
      where: { id: cartItem.id },
      include: {
        variant: {
          include: {
            cosmetic: true,
            CosmeticVariantOption: {
              include: {
                option: true,
              },
            },
          },
        },
      },
    });

    // Trả về đúng định dạng CartItemResponse
    return {
      id: cartItem.id,
      variantId: itemDetail!.variantId,
      quantity: cartItem.quantity,
      price: itemDetail!.variant.price,
      totalPrice: itemDetail!.variant.price * cartItem.quantity,

      sku: itemDetail!.variant.sku,
      cosmeticName: itemDetail!.variant.cosmetic.name,
      options: itemDetail!.variant.CosmeticVariantOption.map((v) => ({
        key: v.option.optionKey,
        value: v.option.optionValue,
      })),
    };
}

static async updateCartItem(
  userId: string,
  oldVariantId: string,
  dto: UpdateCartItemDto
): Promise<CartItemResponse> {
  const { variantId: newVariantId, quantity } = dto;

  if (!newVariantId && quantity === undefined) {
    throw new HttpException(400, "Bạn phải truyền 'variantId' mới hoặc 'quantity' mới để cập nhật.");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  if (!cart) throw new HttpException(404, "Không tìm thấy giỏ hàng");

  const cartItem = await prisma.cartDetail.findFirst({
    where: {
      cartId: cart.id,
      variantId: oldVariantId,
    },
  });
  if (!cartItem) throw new HttpException(404, "Không tìm thấy sản phẩm trong giỏ hàng");

  
  // Nếu chỉ đổi số lượng
  if (!newVariantId && typeof quantity === "number") {
    const variant = await prisma.cosmeticVariant.findUnique({
      where: { id: oldVariantId },
    });
    if (!variant) throw new HttpException(404, "Variant not found");

    if( quantity <= 0) {
      await prisma.cartDetail.delete({
        where: {id : cartItem.id},
      });
      throw new HttpException(200, "Đã xoá sản phẩm khỏi giỏ hàng");
    }
    if (quantity > variant.stock) {
      throw new HttpException(400, "Vượt quá số lượng trong kho");
    }

    const updatedItem = await prisma.cartDetail.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

    return this.mapToResponse(updatedItem.id);
  }
  
  // Nếu chỉ đổi loại sản phẩm
  if (newVariantId && typeof quantity !== "number") {
    if (newVariantId === oldVariantId) {
      throw new HttpException(400, "Loại sản phẩm mới giống cũ");
    }

    const newVariant = await prisma.cosmeticVariant.findUnique({
      where: { id: newVariantId },
    });
    if (!newVariant) throw new HttpException(404, "Variant mới không tồn tại");

    const existingItem = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        variantId: newVariantId,
      },
    });

    if (existingItem) {
      const totalQuantity = existingItem.quantity + cartItem.quantity;
      if (totalQuantity > newVariant.stock) {
        throw new HttpException(400, "Tổng số lượng vượt quá kho");
      }

      // Cộng dồn số lượng và xoá cái cũ
      await prisma.cartDetail.update({
        where: { id: existingItem.id },
        data: { quantity: totalQuantity },
      });
      await prisma.cartDetail.delete({
        where: { id: cartItem.id },
      });

      return this.mapToResponse(existingItem.id);
    } else {
      if (cartItem.quantity > newVariant.stock) {
        throw new HttpException(400, "Số lượng vượt quá kho sản phẩm mới");
      }

      const updatedItem = await prisma.cartDetail.update({
        where: { id: cartItem.id },
        data: { variantId: newVariantId },
      });

      return this.mapToResponse(updatedItem.id);
    }
  }

  throw new HttpException(400, "Không có thay đổi nào được thực hiện");
}

  
  // static async updateCart(
  //   userId: string,
  //   dto: UpdateCartItemDto,
  // ): Promise<CartResponse> {
  //   // Validate cosmetics and calculate prices
  //   const validatedItems = await this.validateCartItems(dto.items);

  //   const cart = await prisma.cart.update({
  //     where: { userId },
  //     data: {
  //       details: {
  //         deleteMany: {},
  //         create: validatedItems.map((item) => ({
  //           cosmeticId: item.cosmeticId,
  //           quantity: item.quantity,
  //           price: item.price,
  //         })),
  //       },
  //     },
  //     include: {
  //       details: {
  //         include: {
  //           cosmetic: true,
  //         },
  //       },
  //     },
  //   });

  //   return cart;
  // }


  // static async updateCart(
  //   userId: string,
  //   dto: UpdateCartItemDto,
  // ): Promise<CartResponse> {
  //   // Validate cosmetics and calculate prices
  //   const validatedItems = await this.validateCartItems(dto.items);

  //   const cart = await prisma.cart.update({
  //     where: { userId },
  //     data: {
  //       details: {
  //         deleteMany: {},
  //         create: validatedItems.map((item) => ({
  //           cosmeticId: item.cosmeticId,
  //           quantity: item.quantity,
  //           price: item.price,
  //         })),
  //       },
  //     },
  //     include: {
  //       details: {
  //         include: {
  //           cosmetic: true,
  //         },
  //       },
  //     },
  //   });

  //   return cart;
  // }

  static async removeCartItem(userId: string, variantId: string): Promise<void> {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return;

    await prisma.cartDetail.deleteMany({
      where: {
        cartId: cart.id,
        variantId,
      },
  });
  }

  static async clearCart(userId: string): Promise<void> {
     const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return;

    await prisma.cartDetail.deleteMany({
      where: { cartId: cart.id },
    });
  }

  // static async getCartSummary(userId: string): Promise<CartSummary> {
  //   const cart = await this.getCart(userId);

  //   const items = cart.details.map((detail) => ({
  //     cosmeticId: detail.cosmeticId,
  //     name: detail.cosmetic.name,
  //     quantity: detail.quantity,
  //     price: detail.price,
  //     total: detail.quantity * detail.price,
  //   }));

  //   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  //   const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  //   return {
  //     totalItems,
  //     totalPrice,
  //     items,
  //   };
  // }

  // private static async validateCartItems(
  //   items: { cosmeticId: string; quantity: number }[],
  // ): Promise<{ cosmeticId: string; quantity: number; price: number }[]> {
  //   const cosmetics = await prisma.cosmetic.findMany({
  //     where: {
  //       id: {
  //         in: items.map((item) => item.cosmeticId),
  //       },
  //     },
  //   });

  //   if (cosmetics.length !== items.length) {
  //     throw new HttpException(
  //       HttpStatus.BAD_REQUEST,
  //       "Some cosmetics not found",
  //     );
  //   }

  //   return items.map((item) => {
  //     const cosmetic = cosmetics.find((c) => c.id === item.cosmeticId);
  //     if (!cosmetic) {
  //       throw new HttpException(
  //         HttpStatus.BAD_REQUEST,
  //         `Cosmetic ${item.cosmeticId} not found`,
  //       );
  //     }
  //     if (cosmetic.stock < item.quantity) {
  //       throw new HttpException(
  //         HttpStatus.BAD_REQUEST,
  //         `Insufficient stock for cosmetic ${cosmetic.name}`,
  //       );
  //     }
  //     return {
  //       cosmeticId: item.cosmeticId,
  //       quantity: item.quantity,
  //       price: cosmetic.price,
  //     };
  //   });
  // }

  private static async mapToResponse(cartDetailId: string): Promise<CartItemResponse> {
  const item = await prisma.cartDetail.findUnique({
    where: { id: cartDetailId },
    include: {
      variant: {
        include: {
          cosmetic: true,
          CosmeticVariantOption: {
            include: {
              option: true,
            },
          },
        },
      },
    },
  });

  if (!item) {
    throw new HttpException(404, "Không tìm thấy chi tiết sản phẩm");
  }

  return {
    id: item.id,
    variantId: item.variantId,
    quantity: item.quantity,
    price: item.variant.price,
    totalPrice: item.variant.price * item.quantity,
    sku: item.variant.sku,
    cosmeticName: item.variant.cosmetic.name,
    options: item.variant.CosmeticVariantOption.map((o) => ({
      key: o.option.optionKey,
      value: o.option.optionValue,
    })),
  };
}

}
