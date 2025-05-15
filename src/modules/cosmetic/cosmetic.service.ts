  import { HttpStatus } from "@/common/enums/http-status.enum";
  import { HttpException } from "@/common/exceptions/http.exception";
  import { CacheService } from "@/common/services/cache.service";
  import { prisma } from "@/config/prisma";

  import {
    CosmeticCreateInput,
    CosmeticQueryParams,
    CosmeticResponse,
    CosmeticUpdateInput,
  } from "./cosmetic.types";

  export class CosmeticService {
    private static readonly CACHE_PREFIX = "cosmetic";

    static async getCosmetics(
      params: CosmeticQueryParams,  
    ): Promise<{ cosmetics: CosmeticResponse[]; total: number }> {
      const cacheKey = CacheService.generateKey(
        `${this.CACHE_PREFIX}:list`,
        params,
      );
      // Try cache, fallback to DB if null
      const cached = await CacheService.getOrSet(cacheKey, async () => {
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
        };

        const [cosmetics, total] = await Promise.all([
          prisma.cosmetic.findMany({
            where,
            orderBy: sortBy
              ? { [sortBy]: sortOrder || "desc" }
              : { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            include: { meta: true },
          }),
          prisma.cosmetic.count({ where }),
        ]);

        const cosmeticsWithMeta = await Promise.all(
          cosmetics.map(async (cosmetic) => {
            const meta = await prisma.cosmeticMeta.findMany({
              where: { cosId: cosmetic.id },
            });
            const metaObj = meta.length
              ? meta.reduce((obj, item) => {
                  obj[item.key] = item.value;
                  return obj;
                }, {} as Record<string, string>)
              : null;

            return {
              ...cosmetic,
              inStock: cosmetic.stock > 0,
              meta: metaObj,
            };
          }),
        );

        return { cosmetics: cosmeticsWithMeta, total };
      });
      if (cached) return cached;
      // fallback: fetch from DB (same as cache miss logic)
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
      };
      const [cosmetics, total] = await Promise.all([
        prisma.cosmetic.findMany({
          where,
          orderBy: sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
          include: { meta: true },
        }),
        prisma.cosmetic.count({ where }),
      ]);
      const cosmeticsWithMeta = await Promise.all(
        cosmetics.map(async (cosmetic) => {
          const meta = await prisma.cosmeticMeta.findMany({
            where: { cosId: cosmetic.id },
          });
          const metaObj = meta.length
            ? meta.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
              }, {} as Record<string, string>)
            : null;
          return {
            ...cosmetic,
            inStock: cosmetic.stock > 0,
            meta: metaObj,
          };
        }),
      );
      return { cosmetics: cosmeticsWithMeta, total };
    }

    static async getCosmeticById(id: string): Promise<CosmeticResponse> {
      const cacheKey = CacheService.generateKey(`${this.CACHE_PREFIX}:detail`, {
        id,
      });
      const cached = await CacheService.getOrSet(cacheKey, async () => {
        const cosmetic = await prisma.cosmetic.findUnique({
          where: { id },
        });
    
        if (!cosmetic) {
          throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
        }
    
        // Lấy metadata liên quan đến cosmetic
        const meta = await prisma.cosmeticMeta.findMany({
          where: { cosId: cosmetic.id },
        });
    
        // Chuyển đổi các metadata thành đối tượng key-value
        const metaObj = meta.length
          ? meta.reduce((obj, item) => {
              obj[item.key] = item.value;
              return obj;
            }, {} as Record<string, string>)
          : null;
    
        // Trả về kết quả bao gồm cả meta
        return {
          ...cosmetic,
          inStock: cosmetic.stock > 0,
          meta: metaObj,  // Chứa meta nếu có
        };
      });
      if (cached) return cached;
      // fallback: fetch from DB (same as cache miss logic)
      const cosmetic = await prisma.cosmetic.findUnique({
        where: { id },
      });
      if (!cosmetic) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
      }
      const meta = await prisma.cosmeticMeta.findMany({
        where: { cosId: cosmetic.id },
      });
      const metaObj = meta.length
        ? meta.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj;
          }, {} as Record<string, string>)
        : null;
      return {
        ...cosmetic,
        inStock: cosmetic.stock > 0,
        meta: metaObj,
      };
    }
    

    static async createCosmetic(
      request: CosmeticCreateInput,
    ): Promise<CosmeticResponse> {
      // Check if distributor and style exist
      const [distributor] = await Promise.all([
        prisma.cosmeticDistributor.findUnique({
          where: { id: request.distributorId },
        })
      ]);

      if (!distributor) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
      }

      /**
       * prisma.cosmeticStyle.create({
       *  data: {
       *   name: meta.key,
       *   value: meta.value,
       * })
      */ 
      

      const cosmetic = await prisma.cosmetic.create({
        include: {
          meta: true, // 👈 Thêm dòng này để lấy dữ liệu meta kèm theo
        },
        data: {
          name: request.name,
          description: request.description,
          price: request.price,
          stock: request.stock,
          type: request.type,
          distributorId: request.distributorId
        },
      });

      // Tạo các metadata nếu có
    if (request.meta) {
      const metaEntries = Object.entries(request.meta).map(([key, value]) => ({
        key,
        value,
        cosId: cosmetic.id,
      }));

      await prisma.cosmeticMeta.createMany({
        data: metaEntries,
      });
    }

    // Gọi lại để lấy cosmetic kèm meta
    const cosmeticWithMeta = await prisma.cosmetic.findUnique({
      where: { id: cosmetic.id },
      include: { meta: true },
    });

    if (!cosmeticWithMeta) {
      throw new Error("Cosmetic not found after creation");
    }

    // Chuyển array meta thành object nếu có, hoặc null nếu không có
  const metaObj = cosmeticWithMeta.meta?.length
    ? cosmeticWithMeta.meta.reduce((obj, item) => {
        obj[item.key] = item.value;
        return obj;
      }, {} as Record<string, string>)
    : null;

      // Clear list cache since we added a new cosmetic
      await CacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);

      return {
    id: cosmeticWithMeta.id,
    name: cosmeticWithMeta.name,
    description: cosmeticWithMeta.description,
    price: cosmeticWithMeta.price,
    stock: cosmeticWithMeta.stock,
    type: cosmeticWithMeta.type,
    distributorId: cosmeticWithMeta.distributorId,
    createdAt: cosmeticWithMeta.createdAt,
    updatedAt: cosmeticWithMeta.updatedAt,
    inStock: cosmeticWithMeta.stock > 0,
    meta: metaObj, // 👈 sẽ là object nếu có hoặc null nếu không có
  };
    }

    static async updateCosmetic(
      id: string,
      data: CosmeticUpdateInput,
    ): Promise<CosmeticResponse> {
      const cosmetic = await prisma.cosmetic.findUnique({
        where: { id },
      });

      if (!cosmetic) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
      }

      // If updating distributor or style, check if they exist
      if (data.distributorId) {
        const distributor = await prisma.cosmeticDistributor.findUnique({
          where: { id: data.distributorId },
        });
        if (!distributor) {
          throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
        }
      }

      const updatedCosmetic = await prisma.cosmetic.update({
        where: { id },
        data: {
          ...data,
          meta: undefined, // Prevent direct update of meta
        },
      });

      if (data.meta) {
        await prisma.cosmeticMeta.deleteMany({ where: { cosId: id } });
        const metaEntries = Object.entries(data.meta).map(([key, value]) => ({
          key,
          value,
          cosId: id,
        }));
        await prisma.cosmeticMeta.createMany({ data: metaEntries });
      }

      const cosmeticWithMeta = await prisma.cosmetic.findUnique({
        where: { id },
        include: { meta: true },
      });

      if (!cosmeticWithMeta) {
        throw new Error("Cosmetic not found after update");
      }

      const metaObj = cosmeticWithMeta.meta?.length
        ? cosmeticWithMeta.meta.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj;
          }, {} as Record<string, string>)
        : null;

      // Clear both list and detail cache
      await CacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
      await CacheService.delete(
        CacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }),
      );

      return {
        id: cosmeticWithMeta.id,
        name: cosmeticWithMeta.name,
        description: cosmeticWithMeta.description,
        price: cosmeticWithMeta.price,
        stock: cosmeticWithMeta.stock,
        type: cosmeticWithMeta.type,
        distributorId: cosmeticWithMeta.distributorId,
        createdAt: cosmeticWithMeta.createdAt,
        updatedAt: cosmeticWithMeta.updatedAt,
        inStock: cosmeticWithMeta.stock > 0,
        meta: metaObj,
      };
    }

    static async deleteCosmetic(id: string): Promise<void> {
      const cosmetic = await prisma.cosmetic.findUnique({
        where: { id },
      });

      if (!cosmetic) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
      }
      
      await prisma.cosmeticMeta.deleteMany({
        where: { cosId: id },
      });
      
      await prisma.cosmetic.delete({
        where: { id },
      });

      // Clear both list and detail cache
      await CacheService.clearByPrefix(`${this.CACHE_PREFIX}:list`);
      await CacheService.delete(
        CacheService.generateKey(`${this.CACHE_PREFIX}:detail`, { id }),
      );
    }
  }
