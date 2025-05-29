import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { prisma } from "@/config/prisma";
import {
  CosmeticCreateInput,
  CosmeticQueryParams,
  CosmeticUpdateInput,
  VariantResponse,
} from "./cosmetic.types";

import { CosmeticResponse, PaginatedCosmeticResponse } from "./cosmetic.dto";
export class CosmeticService {
  static async getCosmetics(
    params: CosmeticQueryParams
  ): Promise<PaginatedCosmeticResponse> {
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
        variants: hasVariants ? { some: {} } : { none: {} },
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
              CosmeticVariantOption: {
                include: {
                  option: true, // lấy thông tin cặp key/value
                },
              },
            },
          },
        },
      }),
      prisma.cosmetic.count({ where }),
    ]);

    const formattedCosmetics = cosmetics.map((cosmetic) => ({
      id: cosmetic.id,
      name: cosmetic.name,
      distributor: cosmetic.distributor,
      specifications: cosmetic.specifications,
      inStock: cosmetic.stock > 0,
      hasVariants: cosmetic.variants.length > 0,
	  variants: cosmetic.variants.map(variant => {
		const options = variant.CosmeticVariantOption.map(vvo => vvo.option);
		return {
		  id: variant.id,
		  cosmeticId: variant.cosmeticId,
		  sku: variant.sku,
		  price: variant.price,
		  stock: variant.stock,
		  createdAt: variant.createdAt,
		  updatedAt: variant.updatedAt,
		  options,                                        // mảng CosmeticOption[]
		  displayName: options.map(o => o.optionValue).join('/'),
		  inStock: variant.stock > 0,
		};
	  })
	}));
  

    return {
		cosmetics: formattedCosmetics,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	  };
	}

  private static getVariantDisplayName(
    options: { optionKey: string; optionValue: string }[]
  ): string {
    return options.map((opt) => opt.optionValue).join("/");
  }

  static async getCosmeticById(id: string): Promise<CosmeticResponse> {
	console.log('Searching cosmetic with ID:', id);

    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            CosmeticVariantOption: {
                include: {
                  option: true, // lấy thông tin cặp key/value
                },
              },
          },
        },
        specifications: true,
        distributor: true,
      },
    });
console.log('Searching cosmetic with ID:', id);

    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }

    return {
		...cosmetic,
		inStock: cosmetic.stock > 0,
		hasVariants: cosmetic.variants.length > 0,
		variants: cosmetic.variants.map((variant) => {
		  const options = variant.CosmeticVariantOption?.map(vo => vo.option) || [];
	  
		  return {
			...variant,
			options,
			displayName: this.getVariantDisplayName(options),
			inStock: variant.stock > 0,
		  };
		}),
	  };
	}
	
  static async createCosmetic(
    request: CosmeticCreateInput
  ): Promise<CosmeticResponse> {
    // Check if distributor exists
    const distributor = await prisma.cosmeticDistributor.findUnique({
      where: { id: request.distributorId },
    });

    if (!distributor) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
    }

    // Tạo cosmetic trước
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
            data:
              request.specifications?.map((spec) => ({
                specKey: spec.key,
                specValue: spec.value,
              })) || [],
          },
        },
      },
      include: {
        variants: {
          include: {
            CosmeticVariantOption: {
                include: {
                  option: true, // lấy thông tin cặp key/value
                },
              },
          },
        },
        specifications: true,
        distributor: true,
      },
    });

    // Nếu có variants, tạo từng option và variant
    if (request.variants && request.variants.length > 0) {
		for (const variant of request.variants) {
		  // Tạo CosmeticVariant
		  const createdVariant = await prisma.cosmeticVariant.create({
			data: {
			  sku: variant.sku,
			  price: variant.price,
			  stock: variant.stock,
			  cosmeticId: cosmetic.id,
			},
		  });
	  
		  // Với mỗi option của variant (thường là 1 hoặc nhiều)
		  for (const optionInput of variant.options) {
			// Kiểm tra nếu option đã tồn tại (optional)
			const createdOption = await prisma.cosmeticOption.create({
			  data: {
				optionKey: optionInput.key,
				optionValue: optionInput.value,
			  },
			});
	  
			// Tạo liên kết giữa variant và option
			await prisma.cosmeticVariantOption.create({
			  data: {
				variantId: createdVariant.id,
				optionId: createdOption.id,
			  },
			});
		  }
		}
	  }
	  

    // Lấy lại cosmetic với variants mới tạo
    const cosmeticWithVariants = await prisma.cosmetic.findUnique({
		where: { id: cosmetic.id },
		include: {
		  variants: {
			include: {
				CosmeticVariantOption: {
					include: {
					  option: true
					}
				  }
			},
		  },
		  specifications: true,
		  distributor: true,
		},
	  });
	  

	  return {
		...cosmeticWithVariants!,
		inStock: cosmeticWithVariants!.stock > 0,
		hasVariants: cosmeticWithVariants!.variants.length > 0,
		variants: cosmeticWithVariants!.variants.map((variant) => {
			const options = variant.CosmeticVariantOption?.map(vo => vo.option) || [];

		  return {
			...variant,
			options,
			displayName: this.getVariantDisplayName(options),
			inStock: variant.stock > 0,
		  };
		}),
	  };
  }  

  static async updateCosmetic(
    id: string,
    data: CosmeticUpdateInput
  ): Promise<CosmeticResponse> {
    // Kiểm tra sự tồn tại của mỹ phẩm
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
      include: {
        variants: true,
        specifications: true,
      },
    });
  
    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }
  
    // Kiểm tra sự tồn tại của nhà phân phối nếu có cập nhật
    if (data.distributorId) {
      const distributor = await prisma.cosmeticDistributor.findUnique({
        where: { id: data.distributorId },
      });
      if (!distributor) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Distributor not found");
      }
    }
  
    // Cập nhật mỹ phẩm
    const updatedCosmetic = await prisma.cosmetic.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        type: data.type,
        distributorId: data.distributorId,
        specifications: data.specifications
          ? {
              deleteMany: {},
              createMany: {
                data: data.specifications.map((spec) => ({
                  specKey: spec.key,
                  specValue: spec.value,
                })),
              },
            }
          : undefined,
      },
      include: {
        variants: {
          include: {
            CosmeticVariantOption: {
              include: {
                option: true, // lấy thông tin cặp key/value
              },
            },
          },
        },
        specifications: true,
        distributor: true,
      },
    });
  
    return {
      ...updatedCosmetic,
      inStock: updatedCosmetic.stock > 0,
      hasVariants: updatedCosmetic.variants.length > 0,
      variants: updatedCosmetic.variants.map((variant) => {
        const options = variant.CosmeticVariantOption.map((vo) => vo.option);
        return {
          ...variant,
          options,
          displayName: this.getVariantDisplayName(options),
          inStock: variant.stock > 0,
        };
      }),
    };
  }
  

  static async deleteCosmetic(id: string): Promise<void> {
    // Kiểm tra sự tồn tại của mỹ phẩm
    const cosmetic = await prisma.cosmetic.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            CosmeticVariantOption: true,
          },
        },
      },
    });
  
    if (!cosmetic) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
    }
  
    // Xoá tất cả các CosmeticVariantOption liên kết với biến thể
    for (const variant of cosmetic.variants) {
      await prisma.cosmeticVariantOption.deleteMany({
        where: { variantId: variant.id },
      });
  
      // Sau đó xoá biến thể
      await prisma.cosmeticVariant.delete({
        where: { id: variant.id },
      });
    }
  
    // Xoá các thông số kỹ thuật
    await prisma.cosmeticSpec.deleteMany({
      where: { cosmeticId: id },
    });
  
    // Cuối cùng xoá mỹ phẩm
    await prisma.cosmetic.delete({
      where: { id },
    });
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
	// Kiểm tra cosmetic tồn tại không
	const cosmetic = await prisma.cosmetic.findUnique({
	  where: { id: cosmeticId },
	});
  
	if (!cosmetic) {
	  throw new HttpException(HttpStatus.NOT_FOUND, "Cosmetic not found");
	}
  
	// Tạo variant mới
	const variant = await prisma.cosmeticVariant.create({
	  data: {
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
	  })
	);
  
	// Tạo liên kết giữa variant và các option qua CosmeticVariantOption
	await Promise.all(
	  optionRecords.map((option) =>
		prisma.cosmeticVariantOption.create({
		  data: {
			variantId: variant.id,
			optionId: option.id,
		  },
		})
	  )
	);
  
	// Lấy lại variant kèm options để trả về
	const variantWithOptions = await prisma.cosmeticVariant.findUnique({
	  where: { id: variant.id },
	  include: {
		CosmeticVariantOption: {
		  include: {
			option: true,
		  },
		},
	  },
	});
  
	const options = variantWithOptions?.CosmeticVariantOption.map((v) => v.option) ?? [];
  
	return {
	  ...variant,
	  options,
	  displayName: this.getVariantDisplayName(options),
	  inStock: variant.stock > 0,
	};
  }
  
}
