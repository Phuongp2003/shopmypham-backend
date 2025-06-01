import { Request, Response, Router } from 'express';
import { AuthMiddleware } from '@/common/middlewares/auth.middleware';
import { PaymentController } from './payment.controller';

const paymentRouter = Router();

paymentRouter.post('/', AuthMiddleware.handle, (req: Request, res: Response) =>
    PaymentController.createPayment(req as any, res),
);

paymentRouter.post(
    '/momo',
    AuthMiddleware.handle,
    PaymentController.createMOMOPayment,
);

paymentRouter.post('/momo/callback', (req: Request, res: Response) =>
    PaymentController.handleMOMOCallback(req, res),
);

paymentRouter.get(
    '/:id',
    AuthMiddleware.handle,
    PaymentController.getPaymentById,
);

export default paymentRouter;
