import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';

// import {
//   CartResponse,
//   CartSummary,
//   CreateCartDTO,
//   UpdateCartDTO,
// } from "./types/cart.types";

import { CartResponse, CartItemResponse } from './cart.types';
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
                                CosmeticOption: true,
                            },
                        },
                    },
                },
            },
        });

        if (!cart) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Cart not found');
        }

        const cartResponse: CartResponse = {
            id: cart.id,
            userId: cart.userId,
            createdAt: cart.createdAt.toISOString(),
            updatedAt: cart.updatedAt.toISOString(),
            items: cart.details.map((detail: any) => {
                const { variant } = detail;
                return {
                    id: detail.id,
                    variantId: variant.id,
                    quantity: detail.quantity,
                    price: variant.price,
                    totalPrice: detail.quantity * variant.price,
                    sku: variant.sku,
                    stock: variant.stock,
                    cosmeticName: variant.cosmetic.name,
                    image: variant.image,
                    options: (variant.CosmeticOption || []).map((opt: any) => ({
                        key: opt.optionKey,
                        value: opt.optionValue,
                    })),
                };
            }),
        };
        return cartResponse;
    }

    static async addToCart(
        userId: string,
        dto: AddToCartDto,
    ): Promise<CartItemResponse> {
        const { variantId, quantity } = dto;

        // Kiểm tra kho
        const variant = await prisma.cosmeticVariant.findUnique({
            where: { id: variantId },
            select: { stock: true, price: true },
        });
        if (!variant) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Variant not found');
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
            if (newQuantity > variant.stock) {
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
                        CosmeticOption: true,
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
            stock: itemDetail!.variant.stock,
            cosmeticName: itemDetail!.variant.cosmetic.name,
            image: itemDetail!.variant.image || undefined,
            options: (itemDetail!.variant.CosmeticOption || []).map(
                (opt: any) => ({
                    key: opt.optionKey,
                    value: opt.optionValue,
                }),
            ),
        };
    }

    static async updateCartItem(
        userId: string,
        dto: UpdateCartItemDto,
    ): Promise<CartItemResponse> {
        const { variantId, quantity } = dto;

        if (!variantId || typeof quantity !== 'number') {
            throw new HttpException(
                400,
                "Bạn phải truyền 'variantId' và 'quantity' mới để cập nhật.",
            );
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) throw new HttpException(404, 'Không tìm thấy giỏ hàng');

        const cartItem = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                variantId,
            },
        });
        if (!cartItem)
            throw new HttpException(
                404,
                'Không tìm thấy sản phẩm trong giỏ hàng',
            );

        const variant = await prisma.cosmeticVariant.findUnique({
            where: { id: variantId },
        });
        if (!variant) throw new HttpException(404, 'Variant not found');

        if (quantity <= 0) {
            await prisma.cartDetail.delete({
                where: { id: cartItem.id },
            });
            throw new HttpException(200, 'Đã xoá sản phẩm khỏi giỏ hàng');
        }
        if (quantity > variant.stock) {
            throw new HttpException(400, 'Vượt quá số lượng trong kho');
        }

        const updatedItem = await prisma.cartDetail.update({
            where: { id: cartItem.id },
            data: { quantity },
        });

        return this.mapToResponse(updatedItem.id);
    }

    static async addToCartItem(
        userId: string,
        dto: AddToCartDto,
    ): Promise<CartItemResponse> {
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            const newCart = await prisma.cart.create({
                data: { userId },
            });
            return this.addToCart(newCart.id, dto);
        }

        return this.addToCart(userId, dto);
    }

    static async removeCartItem(
        userId: string,
        variantId: string,
    ): Promise<void> {
        const variant = await prisma.cosmeticVariant.findUnique({
            where: { id: variantId },
        });
        if (!variant)
            throw new HttpException(HttpStatus.NOT_FOUND, 'Variant not found');

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

    private static async mapToResponse(
        cartDetailId: string,
    ): Promise<CartItemResponse> {
        const item = await prisma.cartDetail.findUnique({
            where: { id: cartDetailId },
            include: {
                variant: {
                    include: {
                        cosmetic: true,
                        CosmeticOption: true,
                    },
                },
            },
        });

        if (!item) {
            throw new HttpException(404, 'Không tìm thấy chi tiết sản phẩm');
        }

        return {
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.variant.price,
            totalPrice: item.variant.price * item.quantity,
            sku: item.variant.sku,
            cosmeticName: item.variant.cosmetic.name,
            image: item.variant.image || undefined,
            stock: item.variant.stock,
            options: (item.variant.CosmeticOption || []).map((opt: any) => ({
                key: opt.optionKey,
                value: opt.optionValue,
            })),
        };
    }
}
