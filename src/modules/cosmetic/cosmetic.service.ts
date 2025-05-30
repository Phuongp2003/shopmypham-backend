import { CacheService } from '@/common/services/cache.service';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';
import { VariantResponse } from './cosmetic.types';

import {
    CosmeticCreateReq,
    CosmeticQueryParams,
    CosmeticUpdateReq,
    CosmeticRes,
    PaginatedCosmeticRes,
    GetAllCosmeticRes,
    EnhancedCosmeticDetailRes,
} from './cosmetic.dto';

export class CosmeticService {
    static async getCosmetics(
        params: CosmeticQueryParams,
    ): Promise<PaginatedCosmeticRes> {
        const {
            search,
            type,
            sortBy,
            sortOrder,
            inStock,
            hasVariants,
        } = params;
        const minPrice = Number(params.minPrice);
        const maxPrice = Number(params.maxPrice);
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 10;

        const cacheKey = CacheService.generateKeyV2('cosmetics', params);
        const isCacheExist = await CacheService.exists(cacheKey);
        if (isCacheExist) {
            const cachedResult = await CacheService.get(cacheKey);
            CacheService.refreshCache(cacheKey);
            return cachedResult as PaginatedCosmeticRes;
        }

        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(type && { type }),
            ...(minPrice && { price: { gte: minPrice } }),
            ...(maxPrice && { price: { lte: maxPrice } }),
            ...(inStock !== undefined && { stock: { gt: 0 } }),
            ...(hasVariants !== undefined && {
                variants: hasVariants ? { some: {} } : { none: {} },
            }),
        };

        const [cosmetics, total] = await Promise.all([
            prisma.cosmetic.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    stock: true,
                    image: true,
                    averageRating: true,
                },
                orderBy: sortBy
                    ? { [sortBy]: sortOrder || 'desc' }
                    : { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.cosmetic.count({ where }),
        ]);
        const result: PaginatedCosmeticRes = {
            cosmetics: cosmetics.map((cosmetic) => ({
                id: cosmetic.id,
                name: cosmetic.name,
                description: cosmetic.description,
                price: cosmetic.price,
                stock: cosmetic.stock,
                image: cosmetic.image,
                averageRating: cosmetic.averageRating,
            })) as GetAllCosmeticRes[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
        return result;
    }

    static async getCosmeticById(id: string): Promise<EnhancedCosmeticDetailRes> {
        const cosmetic = await prisma.cosmetic.findUnique({
            where: { id },
            include: {
                distributor: true,
                specifications: true,
                variants: {
                    include: {
                        CosmeticOption: true,
                    },
                },
                benefits: {
                    orderBy: { orderIndex: 'asc' },
                },
                badges: {
                    where: { isActive: true },
                    orderBy: { orderIndex: 'asc' },
                },
                reviews: {
                    where: { isApproved: true },
                    include: {
                        user: {
                            select: { name: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                shippingPolicy: {
                    include: {
                        features: {
                            orderBy: { orderIndex: 'asc' },
                        },
                    },
                },
            },
        });

        if (!cosmetic) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
        }
        return this.toEnhancedCosmeticResponse(cosmetic);
    }

    static async createCosmetic(
        request: CosmeticCreateReq,
    ): Promise<CosmeticRes> {
        return await prisma.$transaction(async (tx) => {
            // Check if distributor exists
            const distributor = await tx.cosmeticDistributor.findUnique({
                where: { id: request.distributorId },
            });
            if (!distributor) {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Không tìm thấy nhà phân phối',
                );
            }
            // Tạo cosmetic
            const cosmetic = await tx.cosmetic.create({
                data: {
                    name: request.name,
                    description: request.description,
                    price: request.price,
                    stock: request.stock,
                    type: request.type,
                    image: request.image,
                    distributorId: request.distributorId,
                },
            });
            // Tạo specifications
            if (request.specifications && request.specifications.length > 0) {
                for (const spec of request.specifications) {
                    await tx.cosmeticSpec.create({
                        data: {
                            cosmeticId: cosmetic.id,
                            specKey: spec.key,
                            specValue: spec.value,
                        },
                    });
                }
            }
            // Tạo variants và liên kết option
            if (request.variants && request.variants.length > 0) {
                for (const variant of request.variants) {
                    await tx.cosmeticVariant.create({
                        data: {
                            cosmeticId: cosmetic.id,
                            name: variant.name,
                            sku: variant.sku,
                            price: variant.price,
                            stock: variant.stock,
                            image: variant.image,
                            CosmeticOption: {
                                connect: variant.optionIds.map(id => ({ id }))
                            }
                        },
                    });
                }
            }
            // Lấy lại cosmetic với các trường liên quan
            const cosmeticWithVariants = await tx.cosmetic.findUnique({
                where: { id: cosmetic.id },
                include: {
                    variants: {
                        include: {
                            CosmeticOption: true,
                        },
                    },
                    specifications: true,
                    distributor: true,
                },
            });
            return this.toCosmeticResponse(cosmeticWithVariants!);
        });
    }

    static async updateCosmetic(
        id: string,
        data: CosmeticUpdateReq,
    ): Promise<CosmeticRes> {
        return await prisma.$transaction(async (tx) => {
            // Kiểm tra sự tồn tại của mỹ phẩm
            const cosmetic = await tx.cosmetic.findUnique({
                where: { id },
                include: {
                    variants: true,
                    specifications: true,
                },
            });
            if (!cosmetic) {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Cosmetic not found',
                );
            }
            // Kiểm tra sự tồn tại của nhà phân phối nếu có cập nhật
            if (data.distributorId) {
                const distributor = await tx.cosmeticDistributor.findUnique({
                    where: { id: data.distributorId },
                });
                if (!distributor) {
                    throw new HttpException(
                        HttpStatus.NOT_FOUND,
                        'Không tìm thấy nhà phân phối',
                    );
                }
            }
            // Cập nhật mỹ phẩm
            const updatedCosmetic = await tx.cosmetic.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    type: data.type,
                    image: data.image,
                    distributorId: data.distributorId,
                },
            });
            // Xử lý specifications
            if (data.specifications) {
                await tx.cosmeticSpec.deleteMany({ where: { cosmeticId: id } });
                for (const spec of data.specifications) {
                    await tx.cosmeticSpec.create({
                        data: {
                            cosmeticId: id,
                            specKey: spec.key,
                            specValue: spec.value,
                        },
                    });
                }
            }
            // Xử lý variants (tạo, update, xoá)
            if (data.variants) {
                // Xoá các variant
                if (data.variants.delete && data.variants.delete.length > 0) {
                    for (const variantId of data.variants.delete) {
                        await tx.cosmeticVariant.delete({
                            where: { id: variantId },
                        });
                    }
                }
                // Update các variant
                if (data.variants.update && data.variants.update.length > 0) {
                    for (const variant of data.variants.update) {
                        await tx.cosmeticVariant.update({
                            where: { id: variant.id },
                            data: {
                                name: variant.name,
                                sku: variant.sku,
                                price: variant.price,
                                stock: variant.stock,
                                image: variant.image,
                                ...(variant.optionIds && {
                                    CosmeticOption: {
                                        set: variant.optionIds.map(id => ({ id }))
                                    }
                                })
                            },
                        });
                    }
                }
                // Tạo mới các variant
                if (data.variants.create && data.variants.create.length > 0) {
                    for (const variant of data.variants.create) {
                        await tx.cosmeticVariant.create({
                            data: {
                                cosmeticId: id,
                                name: variant.name,
                                sku: variant.sku,
                                price: variant.price,
                                stock: variant.stock,
                                image: variant.image,
                                CosmeticOption: {
                                    connect: variant.optionIds.map(id => ({ id }))
                                }
                            },
                        });
                    }
                }
            }
            // Lấy lại cosmetic với các trường liên quan
            const cosmeticWithVariants = await tx.cosmetic.findUnique({
                where: { id },
                include: {
                    variants: {
                        include: {
                            CosmeticOption: true,
                        },
                    },
                    specifications: true,
                    distributor: true,
                },
            });
            return this.toCosmeticResponse(cosmeticWithVariants!);
        });
    }

    static async deleteCosmetic(id: string): Promise<void> {
        return await prisma.$transaction(async (tx) => {
            // Kiểm tra sự tồn tại của mỹ phẩm
            const cosmetic = await tx.cosmetic.findUnique({
                where: { id },
                include: {
                    variants: true,
                },
            });
            if (!cosmetic) {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    'Cosmetic not found',
                );
            }
            // Xoá tất cả các variant (Prisma sẽ tự động xoá quan hệ trong bảng trung gian)
            for (const variant of cosmetic.variants) {
                await tx.cosmeticVariant.delete({ where: { id: variant.id } });
            }
            // Xoá các thông số kỹ thuật
            await tx.cosmeticSpec.deleteMany({ where: { cosmeticId: id } });
            // Cuối cùng xoá mỹ phẩm
            await tx.cosmetic.delete({ where: { id } });
        });
    }

    // Variant specific methods
    static async createVariant(
        cosmeticId: string,
        data: {
            name: string;
            sku: string;
            price: number;
            stock: number;
            options: { key: string; value: string }[];
        },
    ): Promise<VariantResponse> {
        // Kiểm tra cosmetic tồn tại không
        const cosmetic = await prisma.cosmetic.findUnique({
            where: { id: cosmeticId },
        });

        if (!cosmetic) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
        }

        // Với mỗi option trong data.options, tạo CosmeticOption nếu chưa tồn tại hoặc lấy option hiện có
        const optionRecords = await Promise.all(
            data.options.map(async (opt) => {
                // Tìm xem optionKey + optionValue này đã có chưa (để tránh tạo trùng)
                let optionRecord = await prisma.cosmeticOption.findFirst({
                    where: {
                        optionKey: opt.key,
                        optionValue: opt.value,
                    },
                });

                if (!optionRecord) {
                    optionRecord = await prisma.cosmeticOption.create({
                        data: {
                            optionKey: opt.key,
                            optionValue: opt.value,
                        },
                    });
                }

                return optionRecord;
            }),
        );

        // Tạo variant mới với liên kết options
        const createdVariant = await prisma.cosmeticVariant.create({
            data: {
                name: data.name,
                sku: data.sku,
                price: data.price,
                stock: data.stock,
                cosmeticId,
                CosmeticOption: {
                    connect: optionRecords.map(option => ({ id: option.id }))
                }
            },
            include: {
                CosmeticOption: true,
            },
        });

        return {
            ...createdVariant,
            options: createdVariant.CosmeticOption,
            inStock: createdVariant.stock,
            image: createdVariant.image ?? undefined,
        };
    }

    // Helper để chuẩn hóa dữ liệu trả về đúng kiểu CosmeticResponse
    private static toCosmeticResponse(cosmetic: any): CosmeticRes {
        return {
            id: cosmetic.id,
            name: cosmetic.name,
            description: cosmetic.description,
            price: cosmetic.price,
            stock: cosmetic.stock,
            image: cosmetic.image,
            distributor: this.mapDistributor(cosmetic.distributor),
            specifications: this.mapSpecifications(cosmetic.specifications),
            variants: this.mapVariants(cosmetic.variants),
        };
    }
    private static mapDistributor(distributor: any) {
        if (!distributor) return undefined;
        return {
            id: distributor.id,
            name: distributor.name,
            address: distributor.address ?? '',
            phone: distributor.phone ?? '',
            email: distributor.email ?? '',
            createdAt: distributor.createdAt,
            updatedAt: distributor.updatedAt,
            cosmetics: distributor.cosmetics ?? [],
        };
    }
    private static mapSpecifications(specs: any[]) {
        return (specs || []).map((s) => ({
            id: s.id,
            cosmeticId: s.cosmeticId,
            specKey: s.specKey,
            specValue: s.specValue,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
            cosmetic: s.cosmetic ?? undefined,
        }));
    }
    private static mapVariants(variants: any[]) {
        return (variants || []).map((variant) => ({
            name: variant.name,
            options: variant.CosmeticOption || [],
            inStock: variant.stock,
            image: variant.image,
            price: variant.price,
        }));
    }

    private static toEnhancedCosmeticResponse(cosmetic: any): EnhancedCosmeticDetailRes {
        return {
            id: cosmetic.id,
            name: cosmetic.name,
            description: cosmetic.description,
            price: cosmetic.price,
            stock: cosmetic.stock,
            image: cosmetic.image,
            usageInstructions: cosmetic.usageInstructions,
            averageRating: cosmetic.averageRating,
            totalReviews: cosmetic.totalReviews,
            distributor: this.mapDistributor(cosmetic.distributor),
            specifications: this.mapSpecifications(cosmetic.specifications),
            variants: this.mapVariants(cosmetic.variants),
            benefits: cosmetic.benefits?.map((benefit: any) => ({
                id: benefit.id,
                cosmeticId: benefit.cosmeticId,
                benefitKey: benefit.benefitKey,
                benefitValue: benefit.benefitValue,
                orderIndex: benefit.orderIndex,
                createdAt: benefit.createdAt,
                updatedAt: benefit.updatedAt,
            })) || [],
            badges: cosmetic.badges?.map((badge: any) => ({
                id: badge.id,
                cosmeticId: badge.cosmeticId,
                badgeType: badge.badgeType,
                title: badge.title,
                icon: badge.icon,
                color: badge.color,
                isActive: badge.isActive,
                orderIndex: badge.orderIndex,
                createdAt: badge.createdAt,
                updatedAt: badge.updatedAt,
            })) || [],
            reviews: cosmetic.reviews?.map((review: any) => ({
                id: review.id,
                cosmeticId: review.cosmeticId,
                userId: review.userId,
                rating: review.rating,
                title: review.title,
                content: review.content,
                isVerified: review.isVerified,
                isApproved: review.isApproved,
                userName: review.user?.name,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            })) || [],
            shippingPolicy: cosmetic.shippingPolicy ? {
                id: cosmetic.shippingPolicy.id,
                name: cosmetic.shippingPolicy.name,
                description: cosmetic.shippingPolicy.description,
                deliveryTime: cosmetic.shippingPolicy.deliveryTime,
                freeShippingThreshold: cosmetic.shippingPolicy.freeShippingThreshold,
                isActive: cosmetic.shippingPolicy.isActive,
                createdAt: cosmetic.shippingPolicy.createdAt,
                updatedAt: cosmetic.shippingPolicy.updatedAt,
                features: cosmetic.shippingPolicy.features?.map((feature: any) => ({
                    id: feature.id,
                    shippingPolicyId: feature.shippingPolicyId,
                    title: feature.title,
                    description: feature.description,
                    icon: feature.icon,
                    orderIndex: feature.orderIndex,
                })) || [],
            } : undefined,
        };
    }
}
