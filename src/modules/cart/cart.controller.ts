import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { CreateCartDTO, UpdateCartDTO } from './types/cart.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const cart = await this.cartService.getCart(userId);
      res.json(cart);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  createCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const dto: CreateCartDTO = req.body;
      const cart = await this.cartService.createCart(userId, dto);
      res.status(HttpStatus.CREATED).json(cart);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  updateCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const dto: UpdateCartDTO = req.body;
      const cart = await this.cartService.updateCart(userId, dto);
      res.json(cart);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  clearCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      await this.cartService.clearCart(userId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  getCartSummary = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const summary = await this.cartService.getCartSummary(userId);
      res.json(summary);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };
} 
