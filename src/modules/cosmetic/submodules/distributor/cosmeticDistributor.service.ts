import { prisma } from '@/config/prisma';
import type { CosmeticDistributor as CosmeticDistributorType } from './cosmeticDistributor.types';
import type {
    CosmeticDistributorCreateReq,
    CosmeticDistributorUpdateReq,
} from './cosmeticDistributor.dto';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class CosmeticDistributorService {
    static async getAll(): Promise<CosmeticDistributorType[]> {
        try {
            const distributors = await prisma.cosmeticDistributor.findMany({
                include: { cosmetics: true },
            });
            return distributors as CosmeticDistributorType[];
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<CosmeticDistributorType | null> {
        const distributor = await prisma.cosmeticDistributor.findUnique({
            where: { id },
            include: { cosmetics: true },
        });
        return distributor as CosmeticDistributorType | null;
    }

    static async create(
        data: CosmeticDistributorCreateReq,
    ): Promise<CosmeticDistributorType> {
        const distributor = await prisma.cosmeticDistributor.create({
            data,
            include: { cosmetics: true },
        });
        return distributor as CosmeticDistributorType;
    }

    static async update(
        id: string,
        data: CosmeticDistributorUpdateReq,
    ): Promise<CosmeticDistributorType | null> {
        const distributor = await prisma.cosmeticDistributor.update({
            where: { id },
            data,
            include: { cosmetics: true },
        });
        return distributor as CosmeticDistributorType | null;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticDistributor.delete({ where: { id } });
    }
}
