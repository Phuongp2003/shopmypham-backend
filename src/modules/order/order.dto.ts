import { Order, OrderStatus } from '@/modules/order/order.types';
import { Address } from '@/modules/user/submodules/address/address.types';
import { Paginated } from '@/common/types/paginated.type';

/**
 * @swagger
 * title: CreateOrderDto
 * type: object
 * properties:
 *   addressId:
 *     type: string
 *     nullable: true
 *     description: ID địa chỉ nhận hàng (có thể null nếu chưa chọn)
 *   note:
 *     type: string
 *     description: Ghi chú thêm cho đơn hàng
 *   payment:
 *     type: object
 *     properties:
 *       paymentMethod:
 *         type: string
 *         example: 'CASH'
 *         description: Phương thức thanh toán (CASH, CREDIT_CARD, VNPAY, ...)
 *       amount:
 *         type: number
 *         format: float
 *         example: 500000
 *         description: Số tiền thanh toán
 *       transactionId:
 *         type: string
 *         nullable: true
 *         description: Mã giao dịch nếu có (có thể null nếu thanh toán khi nhận hàng)
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Ngày tạo giao dịch thanh toán
 *       updatedAt:
 *        type: string
 *        format: date-time
 *        description: Ngày cập nhật giao dịch thanh toán
 *       status:
 *         type: string
 *         enum: [PENDING, COMPLETED, FAILED]
 *         description: Trạng thái thanh toán
 */

export interface CreateOrderDto {
    // Không cần userId nếu lấy từ token
    addressId: string | null;
    note?: string;

    // Thông tin thanh toán
    payment?: {
        paymentMethod: string; // Ví dụ: 'CASH', 'CREDIT_CARD', 'VNPAY', ...
        amount: number; // Số tiền thanh toán
        transactionId?: string; // Mã giao dịch nếu có (có thể null nếu thanh toán khi nhận hàng)
        createdAt?: Date; // Ngày tạo thanh toán
        updatedAt?: Date; // Ngày cập nhật thanh toán
        status?: 'PENDING' | 'COMPLETED' | 'FAILED'; // Trạng thái thanh toán
    };
}

// export const UpdateOrderStatusDto = z.object({
//     status: z.nativeEnum(OrderStatus),
// });

/**
 * @swagger
 * title: OrderQueryDto
 * type: object
 * properties:
 *   status:
 *     type: string
 *     enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *     description: Trạng thái đơn hàng
 *   userId:
 *     type: string
 *     description: ID người dùng (nếu cần lọc theo người dùng)
 *   page:
 *     type: integer
 *     description: Trang hiện tại (bắt đầu từ 1)
 *   limit:
 *     type: integer
 *     description: Số lượng bản ghi mỗi trang
 *   sortBy:
 *     type: string
 *     description: Trường cần sắp xếp (vd createdAt)
 *   sortOrder:
 *     type: string
 *     enum: [asc, desc]
 *     description: Thứ tự sắp xếp (tăng hoặc giảm)
 */

export interface OrderQueryDto {
    userId?: string; // ID người dùng (nếu cần lọc theo người dùng)
    status?: OrderStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * @swagger
 * title: OrderResponse
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: Mã đơn hàng
 *   userId:
 *     type: string
 *     description: ID người dùng
 *   status:
 *     type: string
 *     enum: [PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED]
 *     description: Trạng thái đơn hàng
 *   address:
 *     $ref: '#/components/schemas/Address'
 *     description: Địa chỉ giao hàng
 *   note:
 *     type: string
 *     description: Ghi chú (nếu có)
 *   payments:
 *     type: string
 *     description: Danh sách thanh toán
 *     items:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         method:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *   details:
 *     type: array
 *     description: Chi tiết đơn hàng
 *     items:
 *       type: object
 *       properties:
 *         variantId:
 *           type: string
 *           description: ID biến thể mỹ phẩm
 *         quantity:
 *           type: number
 *           description: Số lượng
 *         price:
 *           type: number
 *           description: Đơn giá
 */

export interface OrderResponse {
    id: Order['id'];
    userId: string;
    status: OrderStatus;
    address: Address|null; // Địa chỉ có thể null nếu chưa chọn
    note?: string| null; // Ghi chú có thể null nếu không có
    payment: {
        id: string;
        paymentMethod: string;
        amount: number;
        status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
        transactionId?: string | null;
        createdAt: Date;
        updatedAt: Date;
    }| null; // Thông tin thanh toán có thể null nếu chưa thanh toán
    details: {
        variantId: string;
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
}

/**
 * @swagger
 * title: PaginatedOrderResponse
 * type: object
 * properties:
 *   total:
 *     type: integer
 *     description: Tổng số phần tử
 *   page:
 *     type: integer
 *     description: Trang hiện tại
 *   limit:
 *     type: integer
 *     description: Số phần tử mỗi trang
 *   totalPages:
 *     type: integer
 *     description: Tổng số trang
 *   orders:
 *     type: array
 *     description: Danh sách đơn hàng
 *     items:
 *     $ref: '#/components/schemas/OrderResponse'
 */

export interface PaginatedOrderResponse extends Paginated {
    orders: OrderResponse[];
}

/**
 * @swagger
 * title: UpdateOrderStatusDto
 * type: object
 * properties:
 *   status:
 *     type: string
 *     enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *     description: Trạng thái đơn hàng
 *   addressId:
 *     type: string
 *     description: ID của địa chỉ giao hàng mới (nếu cần cập nhật)
 */


export interface UpdateOrderStatusDto {
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    addressId?: string ; // Cập nhật địa chỉ nếu cần
}
