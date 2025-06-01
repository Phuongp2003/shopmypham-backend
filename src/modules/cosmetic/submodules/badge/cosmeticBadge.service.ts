import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    CosmeticBadgeCreateReq,
    CosmeticBadgeUpdateReq,
    CosmeticBadgeResponse,
} from './cosmeticBadge.dto';

export class CosmeticBadgeService {
    static async getAll(): Promise<CosmeticBadgeResponse[]> {
        try {
            const badges = await prisma.cosmeticBadge.findMany();
            return badges.map((b) => ({
                ...b,
                icon: b.icon ?? undefined,
                color: b.color ?? undefined,
            }));
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<CosmeticBadgeResponse | null> {
        const badge = await prisma.cosmeticBadge.findUnique({ where: { id } });
        return badge
            ? {
                  ...badge,
                  icon: badge.icon ?? undefined,
                  color: badge.color ?? undefined,
              }
            : null;
    }

    static async create(
        data: CosmeticBadgeCreateReq,
    ): Promise<CosmeticBadgeResponse> {
        const badge = await prisma.cosmeticBadge.create({ data });
        return {
            ...badge,
            icon: badge.icon ?? undefined,
            color: badge.color ?? undefined,
        };
    }

    static async update(
        id: string,
        data: CosmeticBadgeUpdateReq,
    ): Promise<CosmeticBadgeResponse | null> {
        const badge = await prisma.cosmeticBadge.update({ where: { id }, data });
        return badge
            ? {
                  ...badge,
                  icon: badge.icon ?? undefined,
                  color: badge.color ?? undefined,
              }
            : null;
    }

    static async delete(id: string): Promise<void> {
        await prisma.cosmeticBadge.delete({ where: { id } });
    }
} 
