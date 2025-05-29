import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticSpecificationCreateReq,
    CosmeticSpecificationUpdateReq,
    CosmeticSpecificationResponse,
} from './cosmeticSpecification.dto';

export class CosmeticSpecificationService {
    static async getAll(): Promise<CosmeticSpecificationResponse[]> {
        try {
            const specs = await prisma.cosmeticSpec.findMany();
            return specs;
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(
        id: string,
    ): Promise<CosmeticSpecificationResponse | null> {
        const spec = await prisma.cosmeticSpec.findUnique({ where: { id } });
        return spec;
    }

    static async create(
        data: CosmeticSpecificationCreateReq,
    ): Promise<CosmeticSpecificationResponse> {
        const spec = await prisma.cosmeticSpec.create({ data });
        return spec;
    }

    static async update(
        id: string,
        data: CosmeticSpecificationUpdateReq,
    ): Promise<CosmeticSpecificationResponse | null> {
        const spec = await prisma.cosmeticSpec.update({ where: { id }, data });
        return spec;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticSpec.delete({ where: { id } });
    }
}
