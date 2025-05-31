import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticBenefitCreateReq,
    CosmeticBenefitUpdateReq,
    CosmeticBenefitResponse,
} from './cosmeticBenefit.dto';

export class CosmeticBenefitService {
    static async getBenefitsByCosmetic(
        cosmeticId: string,
    ): Promise<CosmeticBenefitResponse[]> {
        try {
            const benefits = await prisma.cosmeticBenefit.findMany({
                where: { cosmeticId },
                orderBy: { orderIndex: 'asc' },
            });
            return benefits;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch cosmetic benefits',
            );
        }
    }

    static async getBenefitById(
        id: string,
    ): Promise<CosmeticBenefitResponse | null> {
        try {
            const benefit = await prisma.cosmeticBenefit.findUnique({
                where: { id },
            });
            return benefit;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch cosmetic benefit',
            );
        }
    }

    static async createBenefit(
        cosmeticId: string,
        data: CosmeticBenefitCreateReq,
    ): Promise<CosmeticBenefitResponse> {
        try {
            // Check if cosmetic exists
            const cosmetic = await prisma.cosmetic.findUnique({
                where: { id: cosmeticId },
            });

            if (!cosmetic) {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Cosmetic not found',
                );
            }

            // If no orderIndex provided, use the next available index
            let orderIndex = data.orderIndex ?? 0;
            if (orderIndex === 0) {
                const maxOrder = await prisma.cosmeticBenefit.aggregate({
                    where: { cosmeticId },
                    _max: { orderIndex: true },
                });
                orderIndex = (maxOrder._max.orderIndex ?? 0) + 1;
            }

            const benefit = await prisma.cosmeticBenefit.create({
                data: {
                    cosmeticId,
                    benefitKey: data.benefitKey,
                    benefitValue: data.benefitValue,
                    orderIndex,
                },
            });

            return benefit;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to create cosmetic benefit',
            );
        }
    }

    static async updateBenefit(
        id: string,
        data: CosmeticBenefitUpdateReq,
    ): Promise<CosmeticBenefitResponse | null> {
        try {
            const benefit = await prisma.cosmeticBenefit.update({
                where: { id },
                data,
            });
            return benefit;
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Benefit not found',
                );
            }
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to update cosmetic benefit',
            );
        }
    }

    static async deleteBenefit(id: string): Promise<void> {
        try {
            await prisma.cosmeticBenefit.delete({
                where: { id },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Benefit not found',
                );
            }
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to delete cosmetic benefit',
            );
        }
    }

    static async deleteAllBenefitsByCosmetic(
        cosmeticId: string,
    ): Promise<void> {
        try {
            await prisma.cosmeticBenefit.deleteMany({
                where: { cosmeticId },
            });
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to delete cosmetic benefits',
            );
        }
    }
}
