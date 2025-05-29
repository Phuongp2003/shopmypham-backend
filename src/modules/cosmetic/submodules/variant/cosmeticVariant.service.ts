import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticVariantCreateReq,
    CosmeticVariantUpdateReq,
    CosmeticVariantResponse,
} from './cosmeticVariant.dto';

export class CosmeticVariantService {
    static async getAll(): Promise<CosmeticVariantResponse[]> {
        try {
            const variants = await prisma.cosmeticVariant.findMany();
            return variants;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<CosmeticVariantResponse | null> {
        const variant = await prisma.cosmeticVariant.findUnique({
            where: { id },
        });
        return variant;
    }

    static async create(
        data: CosmeticVariantCreateReq,
    ): Promise<CosmeticVariantResponse> {
        const variant = await prisma.cosmeticVariant.create({ data });
        return variant;
    }

    static async update(
        id: string,
        data: CosmeticVariantUpdateReq,
    ): Promise<CosmeticVariantResponse | null> {
        const variant = await prisma.cosmeticVariant.update({
            where: { id },
            data,
        });
        return variant;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticVariant.delete({ where: { id } });
    }
}
