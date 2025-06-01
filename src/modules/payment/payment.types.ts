/**
 * @swagger
 * type: object
 * title: Payment
 * properties:
 *   id:
 *     type: string
 *     description: ID thanh toán
 *   orderId:
 *     type: string
 *     description: ID đơn hàng liên kết
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   status:
 *     type: string
 *     description: Trạng thái thanh toán
 *   paymentMethod:
 *     type: string
 *     description: Phương thức thanh toán
 *   transactionId:
 *     type: string
 *     description: Mã giao dịch (nếu có)
 *   createdAt:
 *     type: string
 *     format: date-time
 *     description: Ngày tạo
 *   updatedAt:
 *     type: string
 *     format: date-time
 *     description: Ngày cập nhật
 */
export interface Payment {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * title: PaymentStatus
 * type: string
 * enum:
 *   - PENDING (Chờ thanh toán)
 *   - COMPLETED (Đã thanh toán)
 *   - FAILED (Thất bại)
 */
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

/**
 * @swagger
 * type: object
 * title: CreatePaymentDto
 * properties:
 *   orderId:
 *     type: string
 *     description: ID đơn hàng
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   paymentMethod:
 *     type: string
 *     description: Phương thức thanh toán
 */
export interface CreatePaymentDto {
    orderId: string;
    amount: number;
    paymentMethod: string;
}

/**
 * @swagger
 * type: object
 * title: MOMOPaymentRequest
 * properties:
 *   orderId:
 *     type: string
 *     description: ID đơn hàng
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   orderInfo:
 *     type: string
 *     description: Thông tin đơn hàng
 *   redirectUrl:
 *     type: string
 *     description: URL chuyển hướng sau thanh toán
 *   ipnUrl:
 *     type: string
 *     description: URL nhận callback IPN
 *   requestType:
 *     type: string
 *     description: Loại yêu cầu (captureWallet...)
 *   extraData:
 *     type: string
 *     description: Dữ liệu bổ sung (base64)
 */
export interface MOMOPaymentRequest {
    orderId: string;
    amount: number;
    orderInfo: string;
    redirectUrl: string;
    ipnUrl: string;
    requestType: string;
    extraData: string;
}

/**
 * @swagger
 * type: object
 * title: MOMOPaymentResponse
 * properties:
 *   requestId:
 *     type: string
 *     description: ID request MoMo
 *   orderId:
 *     type: string
 *     description: ID đơn hàng
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   responseTime:
 *     type: number
 *     description: Thời gian phản hồi
 *   message:
 *     type: string
 *     description: Thông báo MoMo
 *   resultCode:
 *     type: number
 *     description: Mã kết quả MoMo
 *   payUrl:
 *     type: string
 *     description: URL thanh toán MoMo
 *   deeplink:
 *     type: string
 *     description: Deep link MoMo
 *   qrCodeUrl:
 *     type: string
 *     description: URL QR code
 */
export interface MOMOPaymentResponse {
    requestId: string;
    orderId: string;
    amount: number;
    responseTime: number;
    message: string;
    resultCode: number;
    payUrl: string;
    deeplink: string;
    qrCodeUrl: string;
}

/**
 * @swagger
 * type: object
 * title: MOMOPaymentCallback
 * properties:
 *   partnerCode:
 *     type: string
 *     description: Mã đối tác MoMo
 *   orderId:
 *     type: string
 *     description: ID đơn hàng
 *   requestId:
 *     type: string
 *     description: ID request MoMo
 *   amount:
 *     type: number
 *     description: Số tiền thanh toán
 *   orderInfo:
 *     type: string
 *     description: Thông tin đơn hàng
 *   orderType:
 *     type: string
 *     description: Loại đơn hàng
 *   transId:
 *     type: string
 *     description: Mã giao dịch MoMo
 *   resultCode:
 *     type: number
 *     description: Mã kết quả MoMo
 *   message:
 *     type: string
 *     description: Thông báo MoMo
 *   payType:
 *     type: string
 *     description: Loại thanh toán
 *   responseTime:
 *     type: number
 *     description: Thời gian phản hồi
 *   extraData:
 *     type: string
 *     description: Dữ liệu bổ sung (base64)
 *   signature:
 *     type: string
 *     description: Chữ ký MoMo
 */
export interface MOMOPaymentCallback {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    orderInfo: string;
    orderType: string;
    transId: string;
    resultCode: number;
    message: string;
    payType: string;
    responseTime: number;
    extraData: string;
    signature: string;
}
