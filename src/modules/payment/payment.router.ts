import { Router, Request, Response } from 'express';
import { PaymentController } from './payment.controller';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

export class PaymentRouter {
    private router: Router;
    private paymentController: PaymentController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.paymentController = new PaymentController();
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    private setupRoutes() {
        // Create payment (authenticated users)
        this.router.post(
            '/',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.paymentController.createPayment(req as any, res)
        );

        // Create MOMO payment (authenticated users)
        this.router.post(
            '/momo',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.paymentController.createMOMOPayment(req as any, res)
        );

        // MOMO payment callback (public)
        this.router.post(
            '/momo/callback',
            (req: Request, res: Response) => this.paymentController.handleMOMOCallback(req, res)
        );

        // Get payment by id (authenticated users)
        this.router.get(
            '/:id',
            this.authMiddleware.handle,
            (req: Request, res: Response) => this.paymentController.getPaymentById(req, res)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
} 
