import { prisma } from '@/config/prisma';
import type {
    CosmeticDistributor as CosmeticDistributorType,
    PaginatedDistributor,
} from './cosmeticDistributor.types';
import type {
    CosmeticDistributorCreateReq,
    CosmeticDistributorUpdateReq,
} from './cosmeticDistributor.dto';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type { QueryParams } from '@/common/types/query.types';
export class CosmeticDistributorService {
    static async getAll(query: QueryParams): Promise<PaginatedDistributor> {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;

            const where = {
                name: {
                    contains: query.search || '',
                },
            };

            const distributors = await prisma.cosmeticDistributor.findMany({
                where,
                take: limit,
                skip,
            });
            const total = await prisma.cosmeticDistributor.count();
            const totalPages = Math.ceil(total / limit);
            const paginatedDistributors = {
                distributors:
                    distributors as unknown as CosmeticDistributorType[],
                total,
                page,
                limit,
                totalPages,
            };
            return paginatedDistributors;
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
        return distributor as unknown as CosmeticDistributorType | null;
    }

    static async create(
        data: CosmeticDistributorCreateReq,
    ): Promise<CosmeticDistributorType> {
        const distributor = await prisma.cosmeticDistributor.create({
            data,
            include: { cosmetics: true },
        });
        return distributor as unknown as CosmeticDistributorType;
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
        return distributor as unknown as CosmeticDistributorType | null;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticDistributor.delete({ where: { id } });
    }
}
