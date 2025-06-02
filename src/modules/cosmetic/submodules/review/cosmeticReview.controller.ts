import { Request, Response } from 'express';
import { CosmeticReviewService } from './cosmeticReview.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';
import type { CosmeticReviewCreateReq } from './cosmeticReview.dto';
import { HttpException } from '@/common/exceptions/http.exception';

@Controller({
    tag: 'cosmetics/reviews',
    description: 'Quản lý đánh giá mỹ phẩm',
})
export class CosmeticReviewController {
    @Get(
        {
            name: 'get-all-reviews',
            description: 'Lấy tất cả đánh giá',
            path: '/',
        },
        { response: 'CosmeticReviewResponse' },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const reviews = await CosmeticReviewService.getAll();
            res.json(reviews);
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    @Get(
        {
            name: 'get-review-by-id',
            description: 'Lấy đánh giá theo id',
            path: '/:id',
        },
        { response: 'CosmeticReviewResponse' },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const review = await CosmeticReviewService.getById(id);
            if (!review)
                return res.status(404).json({ message: 'Review not found' });
            res.json(review);
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    @Get(
        {
            name: 'get-reviews-by-cosmetic',
            description: 'Lấy đánh giá theo mỹ phẩm',
            path: '/cosmetic/:cosmeticId',
        },
        { response: 'CosmeticReviewResponse' },
    )
    static async getByCosmeticId(req: Request, res: Response) {
        try {
            const { cosmeticId } = req.params;
            const reviews =
                await CosmeticReviewService.getByCosmeticId(cosmeticId);
            res.json(reviews);
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    @Post(
        {
            name: 'create-review',
            description: 'Tạo đánh giá',
            path: '/',
        },
        { body: 'CosmeticReviewCreateReq', response: 'CosmeticReviewResponse' },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data: CosmeticReviewCreateReq = req.body;
            if (!data.cosmeticId) {
                return res.status(400).json({ message: 'Missing cosmeticId' });
            }
            const review = await CosmeticReviewService.create({
                ...data,
                userId: req.user?.id ?? '',
            });
            res.status(201).json(review);
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    @Put(
        {
            name: 'update-review',
            description: 'Cập nhật đánh giá',
            path: '/:id',
        },
        { body: 'CosmeticReviewUpdateReq', response: 'CosmeticReviewResponse' },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const review = await CosmeticReviewService.update(id, data);
            if (!review)
                return res.status(404).json({ message: 'Review not found' });
            res.json(review);
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    @Delete(
        {
            name: 'delete-review',
            description: 'Xoá đánh giá',
            path: '/:id',
        },
        { response: 'CosmeticReviewResponse' },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CosmeticReviewService.delete(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof HttpException) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
