import { prisma } from '@/config/prisma';
import { CosmeticQueryParams, CosmeticCreateInput, CosmeticUpdateInput, CosmeticResponse } from './cosmetic.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { CacheService } from '@/common/services/cache.service';

export class CosmeticService {
  private cacheService: CacheService;
  private readonly CACHE_PREFIX = 'cosmetic';

  constructor() {
    this.cacheService = CacheService.getInstance();
  }

  async getCosmetics(params: CosmeticQueryParams): Promise<{ cosmetics: CosmeticResponse[]; total: number }> {
    const cacheKey = this.cacheService.generateKey(`${this.CACHE_PREFIX}:list`, params);
    
    return this.cacheService.getOrSet(cacheKey, async () => {
      const { search, type, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 10, inStock } = params;

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
      };

      const [cosmetics, total] = await Promise.all([
        prisma.cosmetic.findMany({
          where,
          orderBy: sortBy ? { [sortBy]: sortOrder || 'desc' } : { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.cosmetic.count({ where }),
      ]);

      const cosmeticsWithStock = cosmetics.map(cosmetic => ({
        ...cosmetic,
        inStock: cosmetic.stock > 0,
      }));

      return { cosmetics: cosmeticsWithStock, total };
    });
  }

  async getCosmeticById(id: string): Promise<CosmeticResponse> {
    const cacheKey = this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id });
    
    return this.cacheService.getOrSet(cacheKey, async () => {
      const cosmetic = await prisma.cosmetic.findUnique({
        where: { id },
      });

      if (!cosmetic) {
        throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
      }

      return {
        ...cosmetic,
        inStock: cosmetic.stock > 0,
      };
    });
  }

  async createCosmetic(data: CosmeticCreateInput): Promise<CosmeticResponse> {
    // Check if distributor and style exist
    const [distributor, style] = await Promise.all([
      prisma.cosmeticDistributor.findUnique({
        where: { id: data.distributorId },
      }),
      prisma.cosmeticStyle.findUnique({
        where: { id: data.styleId },
      }),
    ]);

    if (!distributor) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Distributor not found');
    }

    if (!style) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Style not found');
    }

    const cosmetic = await prisma.cosmetic.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        type: data.type,
        distributorId: data.distributorId,
        styleId: data.styleId,
      },
    });

    // Clear list cache since we added a new cosmetic
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);

    return {
      ...cosmetic,
      inStock: cosmetic.stock > 0,
    };
  }

  async updateCosmetic(id: string, data: CosmeticUpdateInput): Promise<CosmeticResponse> {
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
    });

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
    }

    // If updating distributor or style, check if they exist
    if (data.distributorId) {
      const distributor = await prisma.cosmeticDistributor.findUnique({
        where: { id: data.distributorId },
      });
      if (!distributor) {
        throw new HttpException(HttpStatus.NOT_FOUND, 'Distributor not found');
      }
    }

    if (data.styleId) {
      const style = await prisma.cosmeticStyle.findUnique({
        where: { id: data.styleId },
      });
      if (!style) {
        throw new HttpException(HttpStatus.NOT_FOUND, 'Style not found');
      }
    }

    const updatedCosmetic = await prisma.cosmetic.update({
      where: { id },
      data,
    });

    // Clear both list and detail cache
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await this.cacheService.delete(this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }));

    return {
      ...updatedCosmetic,
      inStock: updatedCosmetic.stock > 0,
    };
  }

  async deleteCosmetic(id: string): Promise<void> {
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
    });

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
    }

    await prisma.cosmetic.delete({
      where: { id },
    });

    // Clear both list and detail cache
    await this.cacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
    await this.cacheService.delete(this.cacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }));
  }
} 
