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
} from './cosmetic.dto';

export class CosmeticService {
    static async getCosmetics(
        params: CosmeticQueryParams,
    ): Promise<PaginatedCosmeticRes> {
        const {
            search,
            type,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            page = 1,
            limit = 10,
            inStock,
            hasVariants,
        } = params;
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
                orderBy: sortBy
                    ? { [sortBy]: sortOrder || 'desc' }
                    : { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.cosmetic.count({ where }),
        ]);
        console.log(cosmetics);
        const result: PaginatedCosmeticRes = {
            cosmetics: cosmetics.map((cosmetic) => this.toCosmeticResponse(cosmetic)) as GetAllCosmeticRes[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
        return result;
    }

    static async getCosmeticById(id: string): Promise<CosmeticRes> {
        const cosmetic = await prisma.cosmetic.findUnique({
            where: { id },
            include: {
                distributor: true,
                specifications: true,
                variants: {
                    include: {
                        CosmeticOption: true,
                        CosmeticVariantOption: {
                            include: { option: true },
                        },
                    },
                },
            },
        });

        if (!cosmetic) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
        }

        return this.toCosmeticResponse(cosmetic);
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
                    const createdVariant = await tx.cosmeticVariant.create({
                        data: {
                            cosmeticId: cosmetic.id,
                            name: variant.name,
                            sku: variant.sku,
                            price: variant.price,
                            stock: variant.stock,
                        },
                    });
                    // Liên kết option-variant
                    for (const optionId of variant.optionIds) {
                        await tx.cosmeticVariantOption.create({
                            data: {
                                variantId: createdVariant.id,
                                optionId,
                            },
                        });
                    }
                }
            }
            // Lấy lại cosmetic với các trường liên quan
            const cosmeticWithVariants = await tx.cosmetic.findUnique({
                where: { id: cosmetic.id },
                include: {
                    variants: {
                        include: {
                            CosmeticVariantOption: {
                                include: { option: true },
                            },
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
                        await tx.cosmeticVariantOption.deleteMany({
                            where: { variantId },
                        });
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
                            },
                        });
                        if (variant.optionIds) {
                            await tx.cosmeticVariantOption.deleteMany({
                                where: { variantId: variant.id },
                            });
                            for (const optionId of variant.optionIds) {
                                await tx.cosmeticVariantOption.create({
                                    data: {
                                        variantId: variant.id,
                                        optionId,
                                    },
                                });
                            }
                        }
                    }
                }
                // Tạo mới các variant
                if (data.variants.create && data.variants.create.length > 0) {
                    for (const variant of data.variants.create) {
                        const createdVariant = await tx.cosmeticVariant.create({
                            data: {
                                cosmeticId: id,
                                name: variant.name,
                                sku: variant.sku,
                                price: variant.price,
                                stock: variant.stock,
                            },
                        });
                        for (const optionId of variant.optionIds) {
                            await tx.cosmeticVariantOption.create({
                                data: {
                                    variantId: createdVariant.id,
                                    optionId,
                                },
                            });
                        }
                    }
                }
            }
            // Lấy lại cosmetic với các trường liên quan
            const cosmeticWithVariants = await tx.cosmetic.findUnique({
                where: { id },
                include: {
                    variants: {
                        include: {
                            CosmeticVariantOption: {
                                include: { option: true },
                            },
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
            // Xoá tất cả các CosmeticVariantOption liên kết với biến thể
            for (const variant of cosmetic.variants) {
                await tx.cosmeticVariantOption.deleteMany({
                    where: { variantId: variant.id },
                });
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

        // Tạo variant mới
        const createdVariant = await prisma.cosmeticVariant.create({
            data: {
                name: data.name,
                sku: data.sku,
                price: data.price,
                stock: data.stock,
                cosmeticId,
            },
        });

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

        // Tạo liên kết giữa variant và các option qua CosmeticVariantOption
        await Promise.all(
            optionRecords.map((option) =>
                prisma.cosmeticVariantOption.create({
                    data: {
                        variantId: createdVariant.id,
                        optionId: option.id,
                    },
                }),
            ),
        );

        // Lấy lại variant kèm options để trả về
        const variantWithOptions = await prisma.cosmeticVariant.findUnique({
            where: { id: createdVariant.id },
            include: {
                CosmeticVariantOption: {
                    include: {
                        option: true,
                    },
                },
            },
        });

        const options =
            variantWithOptions?.CosmeticVariantOption.map((v) => v.option) ??
            [];

        return {
            ...createdVariant,
            options,
            inStock: createdVariant.stock,
        };
    }

    // Helper để chuẩn hóa dữ liệu trả về đúng kiểu CosmeticResponse
    private static toCosmeticResponse(cosmetic: any): CosmeticRes {
        return {
            id: cosmetic.id,
            name: cosmetic.name,
            description: cosmetic.description,
            price: cosmetic.price,
            distributor: this.mapDistributor(cosmetic.distributor),
            specifications: this.mapSpecifications(cosmetic.specifications),
            stock: cosmetic.stock,
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
        return (variants || []).map((variant) => {
            let options = [];
            if (variant.CosmeticOption) {
                options = variant.CosmeticOption;
            } else if (variant.CosmeticVariantOption) {
                options = variant.CosmeticVariantOption.map(
                    (vo: any) => vo.option,
                );
            }
            return {
                name: variant.name,
                options,
                inStock: variant.stock,
            };
        });
    }
}
