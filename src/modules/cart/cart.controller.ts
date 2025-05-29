import { Request, Response } from 'express';

import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';

import { CartService } from './cart.service';
import { CreateCartDTO, UpdateCartDTO } from './types/cart.types';

export class CartController {
    static getCart = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            const userId = req.user.id;
            const cart = await CartService.getCart(userId);
            res.json(cart);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                });
            }
        }
    };

    static createCart = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            const userId = req.user.id;
            const dto: CreateCartDTO = req.body;
            const cart = await CartService.createCart(userId, dto);
            res.status(HttpStatus.CREATED).json(cart);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                });
            }
        }
    };

    static updateCart = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            const userId = req.user.id;
            const dto: UpdateCartDTO = req.body;
            const cart = await CartService.updateCart(userId, dto);
            res.json(cart);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                });
            }
        }
    };

    static clearCart = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            const userId = req.user.id;
            await CartService.clearCart(userId);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                });
            }
        }
    };

    static getCartSummary = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new HttpException(
                    HttpStatus.UNAUTHORIZED,
                    'User not authenticated',
                );
            }
            const userId = req.user.id;
            const summary = await CartService.getCartSummary(userId);
            res.json(summary);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                });
            }
        }
    };
}
