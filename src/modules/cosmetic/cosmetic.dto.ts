import { QueryParams } from './../../common/types/query.types';
import {
    VariantResponse,
    type Cosmetic,
    type CosmeticType,
} from './cosmetic.types';
import { Paginated } from '@/common/types/paginated.type';
import type { CosmeticBenefitResponse } from './submodules/benefit/cosmeticBenefit.dto';
import type { CosmeticBadgeResponse } from './submodules/badge/cosmeticBadge.dto';
import type { ShippingPolicyResponse } from './submodules/shipping/shippingPolicy.dto';
import type { CosmeticReviewResponse } from './submodules/review/cosmeticReview.dto';

/**
 * @swagger
 * title: CosmeticRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   image:
 *     type: string
 *     description: URL hình ảnh mỹ phẩm
 *   distributor:
 *     $ref: '#/components/schemas/CosmeticDistributor'
 *     description: Nhà phân phối
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpec'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantResponse'
 *     description: Danh sách biến thể
 *   inStock:
 *     type: boolean
 *     description: Còn hàng
 *   hasVariants:
 *     type: boolean
 *     description: Có biến thể
 */
export interface CosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    type: Cosmetic['type'];
    price: Cosmetic['price'];
    stock: Cosmetic['stock'];
    image?: Cosmetic['image'];
    distributor?: Cosmetic['distributor'];
    specifications: Cosmetic['specifications'];
    variants: VariantResponse[];
}

/**
 * @swagger
 * title: EnhancedCosmeticDetailRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   image:
 *     type: string
 *     description: URL hình ảnh mỹ phẩm
 *   usageInstructions:
 *     type: string
 *     description: Hướng dẫn sử dụng (HTML)
 *   averageRating:
 *     type: number
 *     description: Điểm đánh giá trung bình (0-5)
 *   totalReviews:
 *     type: number
 *     description: Tổng số đánh giá
 *   distributor:
 *     $ref: '#/components/schemas/CosmeticDistributor'
 *     description: Nhà phân phối
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpec'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VariantResponse'
 *     description: Danh sách biến thể
 *   benefits:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticBenefitResponse'
 *     description: Lợi ích sản phẩm
 *   badges:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticBadgeResponse'
 *     description: Huy hiệu tin cậy
 *   shippingPolicy:
 *     $ref: '#/components/schemas/ShippingPolicyResponse'
 *     description: Chính sách vận chuyển
 *   reviews:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticReviewResponse'
 *     description: Đánh giá sản phẩm
 */
export interface EnhancedCosmeticDetailRes extends CosmeticRes {
    usageInstructions?: string;
    averageRating?: number;
    totalReviews?: number;
    benefits: CosmeticBenefitResponse[];
    badges: CosmeticBadgeResponse[];
    shippingPolicy?: ShippingPolicyResponse;
    reviews?: CosmeticReviewResponse[];
}

/**
 * @swagger
 * title: GetAllCosmeticRes
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: ID mỹ phẩm
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   image:
 *     type: string
 *     description: URL hình ảnh mỹ phẩm
 *   averageRating:
 *     type: number
 *     description: Điểm đánh giá trung bình
 */
export interface GetAllCosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    price: Cosmetic['price'];
    stock: Cosmetic['stock'];
    image?: Cosmetic['image'];
    averageRating: number;
    totalReviews: number;
}

/**
 * @swagger
 * title: PaginatedCosmeticRes
 * type: object
 * properties:
 *   total:
 *     type: number
 *     description: Tổng số mỹ phẩm
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   totalPages:
 *     type: number
 *     description: Tổng số trang
 *   cosmetics:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/GetAllCosmeticRes'
 *     description: Danh sách mỹ phẩm
 */
export interface PaginatedCosmeticRes extends Paginated {
    cosmetics: GetAllCosmeticRes[];
}

/**
 * @swagger
 * title: CosmeticQueryParams
 * type: object
 * properties:
 *   search:
 *     type: string
 *     description: Từ khóa tìm kiếm
 *   type:
 *     type: string
 *     description: Loại mỹ phẩm
 *   minPrice:
 *     type: number
 *     description: Giá tối thiểu
 *   maxPrice:
 *     type: number
 *     description: Giá tối đa
 *   minRating:
 *     type: number
 *     description: Điểm đánh giá tối thiểu
 *   sortBy:
 *     type: string
 *     enum: [price, name, createdAt, averageRating]
 *     description: Trường sắp xếp
 *   sortOrder:
 *     type: string
 *     enum: [asc, desc]
 *     description: Thứ tự sắp xếp
 *   page:
 *     type: number
 *     description: Trang hiện tại
 *   limit:
 *     type: number
 *     description: Số lượng mỗi trang
 *   inStock:
 *     type: boolean
 *     description: Chỉ lấy sản phẩm còn hàng
 *   hasVariants:
 *     type: boolean
 *     description: Chỉ lấy sản phẩm có biến thể
 */
export type CosmeticQueryParams = QueryParams & {
    type?: CosmeticType;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'price' | 'name' | 'createdAt' | 'averageRating';
    inStock?: boolean;
    hasVariants?: boolean;
};

/**
 * @swagger
 * title: CosmeticVariantInput
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên biến thể
 *   sku:
 *     type: string
 *     description: Mã sản phẩm
 *   price:
 *     type: number
 *     description: Giá biến thể
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   image:
 *     type: string
 *     description: URL hình ảnh biến thể
 *   optionIds:
 *     type: array
 *     items:
 *       type: string
 *     description: Danh sách ID options
 */
export type CosmeticVariantInput = {
    name: string;
    sku: string;
    price: number;
    stock: number;
    image?: string;
    optionIds: string[];
};

/**
 * @swagger
 * title: CosmeticSpecificationInput
 * type: object
 * properties:
 *   key:
 *     type: string
 *     description: Tên thông số kỹ thuật
 *   value:
 *     type: string
 *     description: Giá trị thông số kỹ thuật
 */
export type CosmeticSpecificationInput = {
    key: string;
    value: string;
};

/**
 * @swagger
 * title: CosmeticBenefitInput
 * type: object
 * properties:
 *   benefitKey:
 *     type: string
 *     description: Tên lợi ích
 *   benefitValue:
 *     type: string
 *     description: Mô tả chi tiết lợi ích
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBenefitInput = {
    benefitKey: string;
    benefitValue: string;
    orderIndex?: number;
};

/**
 * @swagger
 * title: CosmeticBadgeInput
 * type: object
 * properties:
 *   badgeType:
 *     type: string
 *     enum: [MADE_IN, QUALITY, SHIPPING, RETURN_POLICY, WARRANTY, CERTIFICATION]
 *     description: Loại huy hiệu
 *   title:
 *     type: string
 *     description: Tiêu đề huy hiệu
 *   icon:
 *     type: string
 *     description: Icon identifier
 *   color:
 *     type: string
 *     description: CSS color class
 *   orderIndex:
 *     type: number
 *     description: Thứ tự hiển thị
 */
export type CosmeticBadgeInput = {
    badgeType: string;
    title: string;
    icon?: string;
    color?: string;
    orderIndex?: number;
};

/**
 * @swagger
 * title: CosmeticCreateReq
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   type:
 *     type: string
 *     description: Loại mỹ phẩm
 *   image:
 *     type: string
 *     description: URL hình ảnh mỹ phẩm
 *   usageInstructions:
 *     type: string
 *     description: Hướng dẫn sử dụng (HTML)
 *   distributorId:
 *     type: string
 *     description: ID nhà phân phối
 *   shippingPolicyId:
 *     type: string
 *     description: ID chính sách vận chuyển
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpecificationInput'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticVariantInput'
 *     description: Danh sách biến thể
 *   benefits:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticBenefitInput'
 *     description: Lợi ích sản phẩm
 *   badges:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticBadgeInput'
 *     description: Huy hiệu tin cậy
 */
export type CosmeticCreateReq = {
    name: string;
    description?: string;
    price: number;
    stock: number;
    type: CosmeticType;
    image?: string;
    usageInstructions?: string;
    distributorId: string;
    shippingPolicyId?: string;
    specifications?: CosmeticSpecificationInput[];
    variants?: CosmeticVariantInput[];
    benefits?: CosmeticBenefitInput[];
    badges?: CosmeticBadgeInput[];
};

/**
 * @swagger
 * title: CosmeticUpdateReq
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên mỹ phẩm
 *   description:
 *     type: string
 *     description: Mô tả mỹ phẩm
 *   price:
 *     type: number
 *     description: Giá mỹ phẩm
 *   stock:
 *     type: number
 *     description: Số lượng tồn kho
 *   type:
 *     type: string
 *     description: Loại mỹ phẩm
 *   image:
 *     type: string
 *     description: URL hình ảnh mỹ phẩm
 *   usageInstructions:
 *     type: string
 *     description: Hướng dẫn sử dụng (HTML)
 *   distributorId:
 *     type: string
 *     description: ID nhà phân phối
 *   shippingPolicyId:
 *     type: string
 *     description: ID chính sách vận chuyển
 *   specifications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/CosmeticSpecificationInput'
 *     description: Thông số kỹ thuật
 *   variants:
 *     type: object
 *     description: Thao tác với biến thể
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/CosmeticVariantInput'
 *         description: Tạo biến thể mới
 *       update:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID biến thể
 *             name:
 *               type: string
 *               description: Tên biến thể
 *             sku:
 *               type: string
 *               description: Mã sản phẩm
 *             price:
 *               type: number
 *               description: Giá biến thể
 *             stock:
 *               type: number
 *               description: Số lượng tồn kho
 *             image:
 *               type: string
 *               description: URL hình ảnh biến thể
 *             optionIds:
 *               type: array
 *               items:
 *                 type: string
 *               description: Danh sách ID options
 *         description: Cập nhật biến thể
 *       delete:
 *         type: array
 *         items:
 *           type: string
 *         description: Xóa biến thể (danh sách ID)
 *   benefits:
 *     type: object
 *     description: Thao tác với lợi ích
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/CosmeticBenefitInput'
 *       update:
 *         type: array
 *         items:
 *           allOf:
 *             - $ref: '#/components/schemas/CosmeticBenefitInput'
 *             - type: object
 *               properties:
 *                 id:
 *                   type: string
 *       delete:
 *         type: array
 *         items:
 *           type: string
 *   badges:
 *     type: object
 *     description: Thao tác với huy hiệu
 *     properties:
 *       create:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/CosmeticBadgeInput'
 *       update:
 *         type: array
 *         items:
 *           allOf:
 *             - $ref: '#/components/schemas/CosmeticBadgeInput'
 *             - type: object
 *               properties:
 *                 id:
 *                   type: string
 *       delete:
 *         type: array
 *         items:
 *           type: string
 */
export type CosmeticUpdateReq = Partial<
    Omit<CosmeticCreateReq, 'variants' | 'benefits' | 'badges'>
> & {
    variants?: {
        create?: CosmeticVariantInput[];
        update?: (CosmeticVariantInput & { id: string })[];
        delete?: string[];
    };
    benefits?: {
        create?: CosmeticBenefitInput[];
        update?: (CosmeticBenefitInput & { id: string })[];
        delete?: string[];
    };
    badges?: {
        create?: CosmeticBadgeInput[];
        update?: (CosmeticBadgeInput & { id: string })[];
        delete?: string[];
    };
};
