import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticOptionCreateReq,
    CosmeticOptionUpdateReq,
    CosmeticOptionResponse,
} from './cosmesticOptions.dto';

export class CosmeticOptionService {
    static async getAll(): Promise<CosmeticOptionResponse[]> {
        try {
            const options = await prisma.cosmeticOption.findMany();
            return options;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<CosmeticOptionResponse | null> {
        const option = await prisma.cosmeticOption.findUnique({
            where: { id },
        });
        return option;
    }

    static async create(
        data: CosmeticOptionCreateReq,
    ): Promise<CosmeticOptionResponse> {
        const option = await prisma.cosmeticOption.create({ data });
        return option;
    }

    static async update(
        id: string,
        data: CosmeticOptionUpdateReq,
    ): Promise<CosmeticOptionResponse | null> {
        const option = await prisma.cosmeticOption.update({
            where: { id },
            data,
        });
        return option;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticOption.delete({ where: { id } });
    }
}
