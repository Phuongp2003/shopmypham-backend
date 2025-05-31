import { prisma } from '@/config/prisma';
import type { Address } from './address.types';
import type { CreateAddressDto, UpdateAddressDto } from './address.dto';

export class AddressService {
    static async getAll(userId: string): Promise<Address[]> {
        return prisma.address.findMany({
            where: { userId },
            orderBy: { isDefault: 'desc' },
        });
    }

    static async getById(userId: string, id: string): Promise<Address | null> {
        return prisma.address.findFirst({ where: { id, userId } });
    }

    static async create(
        userId: string,
        data: CreateAddressDto,
    ): Promise<Address> {
        // Nếu set isDefault, unset các address cũ
        if (data.isDefault) {
            await prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false },
            });
        }
        return prisma.address.create({
            data: { ...data, userId },
        });
    }

    static async update(
        userId: string,
        id: string,
        data: UpdateAddressDto,
    ): Promise<Address> {
        const address = await prisma.address.findFirst({
            where: { id, userId },
        });
        if (!address) throw new Error('Address not found or not owned by user');
        if (data.isDefault) {
            await prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false },
            });
        }
        return prisma.address.update({ where: { id }, data });
    }

    static async delete(userId: string, id: string): Promise<void> {
        const address = await prisma.address.findFirst({
            where: { id, userId },
        });
        if (!address) throw new Error('Address not found or not owned by user');
        await prisma.address.delete({ where: { id } });
    }
}
