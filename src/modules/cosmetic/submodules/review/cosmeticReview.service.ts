import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticReviewCreateReq,
    CosmeticReviewUpdateReq,
    CosmeticReviewResponse,
    CosmeticReviewQueryParams,
    PaginatedCosmeticReviewRes,
} from './cosmeticReview.dto';

export class CosmeticReviewService {
    static async getAll(): Promise<CosmeticReviewResponse[]> {
        try {
            const reviews = await prisma.cosmeticReview.findMany();
            return reviews.map((r) => {
                const { userId, title, content, ...rest } = r;
                return {
                    ...rest,
                    userId: userId === null ? undefined : userId,
                    title: title === null ? undefined : title,
                    content: content === null ? undefined : content,
                };
            });
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<CosmeticReviewResponse | null> {
        const review = await prisma.cosmeticReview.findUnique({
            where: { id },
        });
        if (!review) return null;
        const { userId, title, content, ...rest } = review;
        return {
            ...rest,
            userId: userId === null ? undefined : userId,
            title: title === null ? undefined : title,
            content: content === null ? undefined : content,
        };
    }

    static async getByCosmeticId(
        cosmeticId: string,
    ): Promise<CosmeticReviewResponse[]> {
        try {
            const reviews = await prisma.cosmeticReview.findMany({
                where: { cosmeticId },
            });
            return reviews.map((r) => {
                const { userId, title, content, ...rest } = r;
                return {
                    ...rest,
                    userId: userId === null ? undefined : userId,
                    title: title === null ? undefined : title,
                    content: content === null ? undefined : content,
                };
            });
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async create(
        data: CosmeticReviewCreateReq & { userId: string },
    ): Promise<CosmeticReviewResponse> {
        const existed = await prisma.cosmeticReview.findFirst({
            where: {
                cosmeticId: data.cosmeticId,
                userId: data.userId,
            },
        });
        if (existed) {
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                'Bạn đã đánh giá sản phẩm này rồi',
            );
        }

        const review = await prisma.cosmeticReview.create({
            data: {
                cosmeticId: data.cosmeticId,
                userId: data.userId,
                rating: data.rating,
                title: data.title,
                content: data.content,
                isVerified: true,
                isApproved: true,
            },
        });
        const { userId: uId, title, content, ...rest } = review;
        const cosmetic = await prisma.cosmetic.findUnique({
            where: { id: data.cosmeticId },
            include: {
                reviews: true,
            },
        });
        let averageRating = 0;
        if (cosmetic && cosmetic.reviews && cosmetic.reviews.length > 0) {
            averageRating =
                cosmetic.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0,
                ) / cosmetic.reviews.length;
        }
        await prisma.cosmetic.update({
            where: { id: data.cosmeticId },
            data: {
                averageRating: averageRating,
            },
        });
        return {
            ...rest,
            userId: uId === null ? undefined : uId,
            title: title === null ? undefined : title,
            content: content === null ? undefined : content,
        };
    }

    static async update(
        id: string,
        data: CosmeticReviewUpdateReq,
    ): Promise<CosmeticReviewResponse | null> {
        const review = await prisma.cosmeticReview.update({
            where: { id },
            data,
        });
        const { userId, title, content, ...rest } = review;
        return {
            ...rest,
            userId: userId === null ? undefined : userId,
            title: title === null ? undefined : title,
            content: content === null ? undefined : content,
        };
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticReview.delete({ where: { id } });
    }
}
