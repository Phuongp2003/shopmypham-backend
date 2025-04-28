import { prisma } from '@/config/prisma';
import { Cart, CartDetail, Cosmetic } from '@prisma/client';
import { CreateCartDTO, UpdateCartDTO, CartResponse, CartSummary } from './types/cart.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class CartService {
  async getCart(userId: string): Promise<CartResponse> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        details: {
          include: {
            cosmetic: true
          }
        }
      }
    });

    if (!cart) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    return cart;
  }

  async createCart(userId: string, dto: CreateCartDTO): Promise<CartResponse> {
    // Check if cart already exists
    const existingCart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (existingCart) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Cart already exists');
    }

    // Validate cosmetics and calculate prices
    const validatedItems = await this.validateCartItems(dto.items);

    const cart = await prisma.cart.create({
      data: {
        userId,
        details: {
          create: validatedItems.map(item => ({
            cosmeticId: item.cosmeticId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        details: {
          include: {
            cosmetic: true
          }
        }
      }
    });

    return cart;
  }

  async updateCart(userId: string, dto: UpdateCartDTO): Promise<CartResponse> {
    // Validate cosmetics and calculate prices
    const validatedItems = await this.validateCartItems(dto.items);

    const cart = await prisma.cart.update({
      where: { userId },
      data: {
        details: {
          deleteMany: {},
          create: validatedItems.map(item => ({
            cosmeticId: item.cosmeticId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        details: {
          include: {
            cosmetic: true
          }
        }
      }
    });

    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    await prisma.cart.update({
      where: { userId },
      data: {
        details: {
          deleteMany: {}
        }
      }
    });
  }

  async getCartSummary(userId: string): Promise<CartSummary> {
    const cart = await this.getCart(userId);
    
    const items = cart.details.map(detail => ({
      cosmeticId: detail.cosmeticId,
      name: detail.cosmetic.name,
      quantity: detail.quantity,
      price: detail.price,
      total: detail.quantity * detail.price
    }));

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

    return {
      totalItems,
      totalPrice,
      items
    };
  }

  private async validateCartItems(items: { cosmeticId: string; quantity: number }[]): Promise<{ cosmeticId: string; quantity: number; price: number }[]> {
    const cosmetics = await prisma.cosmetic.findMany({
      where: {
        id: {
          in: items.map(item => item.cosmeticId)
        }
      }
    });

    if (cosmetics.length !== items.length) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Some cosmetics not found');
    }

    return items.map(item => {
      const cosmetic = cosmetics.find(c => c.id === item.cosmeticId);
      if (!cosmetic) {
        throw new HttpException(HttpStatus.BAD_REQUEST, `Cosmetic ${item.cosmeticId} not found`);
      }
      if (cosmetic.stock < item.quantity) {
        throw new HttpException(HttpStatus.BAD_REQUEST, `Insufficient stock for cosmetic ${cosmetic.name}`);
      }
      return {
        cosmeticId: item.cosmeticId,
        quantity: item.quantity,
        price: cosmetic.price
      };
    });
  }
} 
