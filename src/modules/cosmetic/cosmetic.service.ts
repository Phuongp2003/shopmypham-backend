import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { CacheService } from "@/common/services/cache.service";
import { prisma } from "@/config/prisma";
import {
  CosmeticCreateInput,
  CosmeticQueryParams,
  CosmeticResponse,
  CosmeticUpdateInput,
  VariantResponse,
  PaginatedCosmeticResponse
} from "./cosmetic.types";

export class CosmeticService {
  private static readonly CACHE_PREFIX = "cosmetic";

  static async getCosmetics(
    params: CosmeticQueryParams,
  ): Promise<PaginatedCosmeticResponse> {
    const cacheService = CacheService.getInstance();
    const cacheKey = cacheService.generateKey(
      `${this.CACHE_PREFIX}:list`,
      params,
    );

    return cacheService.getOrSet(cacheKey, async () => {
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

      const where = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(type && { type }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(inStock !== undefined && { stock: { gt: 0 } }),
        ...(hasVariants !== undefined && {
          variants: hasVariants ? { some: {} } : { none: {} }
        }),
      };

      const [cosmetics, total] = await Promise.all([
        prisma.cosmetic.findMany({
          where,
          orderBy: sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
          include: { 
            distributor: true,
            specifications: true,
            variants: {
              include: {
                options: true
              }
            }
          },
        }),
        prisma.cosmetic.count({ where }),
      ]);

      const formattedCosmetics = cosmetics.map(cosmetic => ({
        ...cosmetic,
        inStock: cosmetic.stock > 0,
        hasVariants: cosmetic.variants.length > 0,
        variants: cosmetic.variants.map(variant => ({
          ...variant,
          displayName: this.getVariantDisplayName(variant.options),
          inStock: variant.stock > 0
        }))
      }));

      return {
        cosmetics: formattedCosmetics,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    });
  }

  private static getVariantDisplayName(options: { optionKey: string, optionValue: string }[]): string {
    return options.map(opt => opt.optionValue).join('/');
  }

  static async getCosmeticById(id: string): Promise<CosmeticResponse> {
    const cacheService = CacheService.getInstance();
    const cacheKey = cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, {
      id,
    });
  
    return cacheService.getOrSet(cacheKey, async () => {
      const cosmetic = await prisma.cosmetic.findUnique({
        where: { id },
        include: { 
          variants: {
            include: {
              options: true
            }
          },
          specifications: true,
          distributor: true 
        },
      });
  
      if (!cosmetic) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
      }
  
      return {
        ...cosmetic,
        inStock: cosmetic.stock > 0,
        hasVariants: cosmetic.variants.length > 0,
        variants: cosmetic.variants.map(variant => ({
          ...variant,
          displayName: this.getVariantDisplayName(variant.options),
          inStock: variant.stock > 0
        }))
      };
    });
  }

  static async createCosmetic(
    request: CosmeticCreateInput,
  ): Promise<CosmeticResponse> {
    const cacheService = CacheService.getInstance();
    
    // Check if distributor exists
    const distributor = await prisma.cosmeticDistributor.findUnique({
      where: { id: request.distributorId },
    });

    if (!distributor) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
    }

    const cosmetic = await prisma.cosmetic.create({
      data: {
        name: request.name,
        description: request.description,
        price: request.price,
        stock: request.stock,
        type: request.type,
        distributorId: request.distributorId,
        specifications: {
          createMany: {
            data: request.specifications?.map(spec => ({
              specKey: spec.key,
              specValue: spec.value
            })) || []
          }
        },
        variants: {
          create: request.variants?.map(variant => ({
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            options: {
              create: variant.options.map(opt => ({
                optionKey: opt.key,
                optionValue: opt.value
              }))
            }
          })) || []
        }
      },
      include: {
        variants: {
          include: {
            options: true
          }
        },
        specifications: true,
        distributor: true
      }
    });

    // Clear cache
    await cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);

    return {
      ...cosmetic,
      inStock: cosmetic.stock > 0,
      hasVariants: cosmetic.variants.length > 0,
      variants: cosmetic.variants.map(variant => ({
        ...variant,
        displayName: this.getVariantDisplayName(variant.options),
        inStock: variant.stock > 0
      }))
    };
  }

  static async updateCosmetic(
    id: string,
    data: CosmeticUpdateInput,
  ): Promise<CosmeticResponse> {
    const cacheService = CacheService.getInstance();
    
    // Check if cosmetic exists
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
      include: {
        variants: true,
        specifications: true
      }
    });

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }

    // Check if distributor exists if updating
    if (data.distributorId) {
      const distributor = await prisma.cosmeticDistributor.findUnique({
        where: { id: data.distributorId },
      });
      if (!distributor) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
      }
    }

    // Update cosmetic
    const updatedCosmetic = await prisma.cosmetic.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        type: data.type,
        distributorId: data.distributorId,
        specifications: data.specifications ? {
          deleteMany: {},
          createMany: {
            data: data.specifications.map(spec => ({
              specKey: spec.key,
              specValue: spec.value
            }))
          }
        } : undefined
      },
      include: {
        variants: {
          include: {
            options: true
          }
        },
        specifications: true,
        distributor: true
      }
    });

    // Clear cache
    await cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await cacheService.delete(
      cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }),
    );

    return {
      ...updatedCosmetic,
      inStock: updatedCosmetic.stock > 0,
      hasVariants: cosmetic.variants.length > 0,
      variants: updatedCosmetic.variants.map(variant => ({
        ...variant,
        displayName: this.getVariantDisplayName(variant.options),
        inStock: variant.stock > 0
      }))
    };
  }

  static async deleteCosmetic(id: string): Promise<void> {
    const cacheService = CacheService.getInstance();
    
    // Check if cosmetic exists
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
      include: {
        variants: true
      }
    });

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }

    // Delete variants and their options first
    await prisma.cosmeticOption.deleteMany({
      where: {
        variantId: {
          in: cosmetic.variants.map(v => v.id)
        }
      }
    });

    await prisma.cosmeticVariant.deleteMany({
      where: { cosmeticId: id }
    });

    // Delete specifications
    await prisma.cosmeticSpec.deleteMany({
      where: { cosmeticId: id }
    });

    // Finally delete the cosmetic
    await prisma.cosmetic.delete({
      where: { id }
    });

    // Clear cache
    await cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await cacheService.delete(
      cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }),
    );
  }

  // Variant specific methods
  static async createVariant(
    cosmeticId: string,
    data: {
      sku: string;
      price: number;
      stock: number;
      options: { key: string; value: string }[];
    }
  ): Promise<VariantResponse> {
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id: cosmeticId }
    });

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }

    const variant = await prisma.cosmeticVariant.create({
      data: {
        sku: data.sku,
        price: data.price,
        stock: data.stock,
        cosmeticId,
        options: {
          create: data.options.map(opt => ({
            optionKey: opt.key,
            optionValue: opt.value
          }))
        }
      },
      include: {
        options: true
      }
    });

    // Clear relevant caches
    const cacheService = CacheService.getInstance();
    await cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await cacheService.delete(
      cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id: cosmeticId }),
    );

    return {
      ...variant,
      displayName: this.getVariantDisplayName(variant.options),
      inStock: variant.stock > 0
    };
  }
}