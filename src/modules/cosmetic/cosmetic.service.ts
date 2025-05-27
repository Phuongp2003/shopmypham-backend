import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { prisma } from '@/config/prisma';
import {
	CosmeticCreateInput,
	CosmeticQueryParams,
	CosmeticUpdateInput,
	VariantResponse,
} from './cosmetic.types';

import { CosmeticResponse, PaginatedCosmeticResponse } from './cosmetic.dto';
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
				include: {
					distributor: true,
					specifications: true,
					variants: {
						include: {
							option: true,
						},
					},
				},
			}),
			prisma.cosmetic.count({ where }),
		]);

		const formattedCosmetics = cosmetics.map((cosmetic) => ({
			...cosmetic,
			inStock: cosmetic.stock > 0,
			hasVariants: cosmetic.variants.length > 0,
			variants: cosmetic.variants.map((variant) => ({
				...variant,
				options: variant.option ? [variant.option] : [],
				displayName: this.getVariantDisplayName(
					variant.option ? [variant.option] : []
				),
				inStock: variant.stock > 0,
			})),
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
		return options.map((opt) => opt.optionValue).join('/');
	}

	static async getCosmeticById(id: string): Promise<CosmeticResponse> {
		const cosmetic = await prisma.cosmetic.findUnique({
			where: { id },
			include: {
				variants: {
					include: {
						option: true,
					},
				},
				specifications: true,
				distributor: true,
			},
		});

		if (!cosmetic) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
		}

		return {
			...cosmetic,
			inStock: cosmetic.stock > 0,
			hasVariants: cosmetic.variants.length > 0,
			variants: cosmetic.variants.map((variant) => ({
				...variant,
				options: variant.option ? [variant.option] : [],
				displayName: this.getVariantDisplayName(
					variant.option ? [variant.option] : []
				),
				inStock: variant.stock > 0,
			})),
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
			throw new HttpException(
				HttpStatus.NOT_FOUND,
				'Distributor not found'
			);
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
						option: true,
					},
				},
				specifications: true,
				distributor: true,
			},
		});

		// Nếu có variants, tạo từng option và variant
		if (request.variants && request.variants.length > 0) {
			for (const variant of request.variants) {
				const option = await prisma.cosmeticOption.create({
					data: {
						optionKey: variant.options[0].key,
						optionValue: variant.options[0].value,
					},
				});
				await prisma.cosmeticVariant.create({
					data: {
						sku: variant.sku,
						price: variant.price,
						stock: variant.stock,
						cosmeticId: cosmetic.id,
						optionId: option.id,
					},
				});
			}
		}

		// Lấy lại cosmetic với variants mới tạo
		const cosmeticWithVariants = await prisma.cosmetic.findUnique({
			where: { id: cosmetic.id },
			include: {
				variants: {
					include: {
						option: true,
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
			variants: cosmeticWithVariants!.variants.map((variant) => ({
				...variant,
				options: variant.option ? [variant.option] : [],
				displayName: this.getVariantDisplayName(
					variant.option ? [variant.option] : []
				),
				inStock: variant.stock > 0,
			})),
		};
	}

	static async updateCosmetic(
		id: string,
		data: CosmeticUpdateInput
	): Promise<CosmeticResponse> {
		// Check if cosmetic exists
		const cosmetic = await prisma.cosmetic.findUnique({
			where: { id },
			include: {
				variants: true,
				specifications: true,
			},
		});

		if (!cosmetic) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
		}

		// Check if distributor exists if updating
		if (data.distributorId) {
			const distributor = await prisma.cosmeticDistributor.findUnique({
				where: { id: data.distributorId },
			});
			if (!distributor) {
				throw new HttpException(
					HttpStatus.NOT_FOUND,
					'Distributor not found'
				);
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
						option: true,
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
			variants: updatedCosmetic.variants.map((variant) => ({
				...variant,
				options: variant.option ? [variant.option] : [],
				displayName: this.getVariantDisplayName(
					variant.option ? [variant.option] : []
				),
				inStock: variant.stock > 0,
			})),
		};
	}

	static async deleteCosmetic(id: string): Promise<void> {
		// Check if cosmetic exists
		const cosmetic = await prisma.cosmetic.findUnique({
			where: { id },
			include: {
				variants: true,
			},
		});

		if (!cosmetic) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
		}

		// Delete variants and their options first
		for (const variant of cosmetic.variants) {
			await prisma.cosmeticVariant.delete({ where: { id: variant.id } });
			await prisma.cosmeticOption.delete({
				where: { id: variant.optionId },
			});
		}

		// Delete specifications
		await prisma.cosmeticSpec.deleteMany({
			where: { cosmeticId: id },
		});

		// Finally delete the cosmetic
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
		const cosmetic = await prisma.cosmetic.findUnique({
			where: { id: cosmeticId },
		});

		if (!cosmetic) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'Cosmetic not found');
		}

		// Tạo option trước
		const option = await prisma.cosmeticOption.create({
			data: {
				optionKey: data.options[0].key,
				optionValue: data.options[0].value,
			},
		});

		const variant = await prisma.cosmeticVariant.create({
			data: {
				sku: data.sku,
				price: data.price,
				stock: data.stock,
				cosmeticId,
				optionId: option.id,
			},
			include: {
				option: true,
			},
		});

		return {
			...variant,
			options: variant.option ? [variant.option] : [],
			displayName: this.getVariantDisplayName(
				variant.option ? [variant.option] : []
			),
			inStock: variant.stock > 0,
		};
	}
}
