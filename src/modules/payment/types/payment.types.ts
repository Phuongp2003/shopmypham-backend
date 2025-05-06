import { PaymentStatus } from "@prisma/client";

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

export interface CreatePaymentDto {
  orderId: string;
  amount: number;
  paymentMethod: string;
}

export interface MOMOPaymentRequest {
  orderId: string;
  amount: number;
  orderInfo: string;
  redirectUrl: string;
  ipnUrl: string;
  requestType: string;
  extraData: string;
}

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
