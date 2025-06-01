import { prisma } from '@/config/prisma';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import type {
    ShippingPolicyCreateReq,
    ShippingPolicyUpdateReq,
    ShippingPolicyResponse,
} from './shippingPolicy.dto';

function mapFeature(feature: any) {
    return {
        id: feature.id,
        shippingPolicyId: feature.shippingPolicyId,
        title: feature.title,
        description: feature.description ?? undefined,
        icon: feature.icon ?? undefined,
        orderIndex: feature.orderIndex,
    };
}

function mapPolicy(policy: any): ShippingPolicyResponse {
    return {
        id: policy.id,
        name: policy.name,
        description: policy.description ?? undefined,
        deliveryTime: policy.deliveryTime ?? undefined,
        freeShippingThreshold: policy.freeShippingThreshold ?? undefined,
        isActive: policy.isActive,
        createdAt: policy.createdAt,
        updatedAt: policy.updatedAt,
        features: (policy.features || []).map(mapFeature),
    };
}

export class ShippingPolicyService {
    static async getAll(): Promise<ShippingPolicyResponse[]> {
        try {
            const policies = await prisma.shippingPolicy.findMany({
                include: { features: true },
            });
            return policies.map(mapPolicy);
        } catch (error) {
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error',
            );
        }
    }

    static async getById(id: string): Promise<ShippingPolicyResponse | null> {
        const policy = await prisma.shippingPolicy.findUnique({
            where: { id },
            include: { features: true },
        });
        return policy ? mapPolicy(policy) : null;
    }

    static async create(
        data: ShippingPolicyCreateReq,
    ): Promise<ShippingPolicyResponse> {
        const policy = await prisma.shippingPolicy.create({
            data: {
                name: data.name,
                description: data.description,
                deliveryTime: data.deliveryTime,
                freeShippingThreshold: data.freeShippingThreshold,
                features: data.features ? { create: data.features } : undefined,
            },
            include: { features: true },
        });
        return mapPolicy(policy);
    }

    static async update(
        id: string,
        data: ShippingPolicyUpdateReq,
    ): Promise<ShippingPolicyResponse | null> {
        const policy = await prisma.shippingPolicy.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                deliveryTime: data.deliveryTime,
                freeShippingThreshold: data.freeShippingThreshold,
                isActive: data.isActive,
            },
            include: { features: true },
        });
        return policy ? mapPolicy(policy) : null;
    }

    static async delete(id: string): Promise<void> {
        await prisma.shippingPolicy.delete({ where: { id } });
    }
}
