import { prisma } from '../src/config/prisma';
import { PaymentStatus } from '@prisma/client';

export async function seedOrders(users: any[], addressMap: Record<string, string>) {
  for (const user of users) {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId: user.id },
        include: { details: true },
      });
      if (!cart || !cart.details.length) return;
      // Tạo order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          addressId: addressMap[user.id],
          note: 'Order demo tự động từ cart',
          status: 'PENDING',
          details: {
            create: cart.details.map((item: any) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: 100000, // Có thể lấy giá từ variant nếu cần
            })),
          },
        },
      });
      // Tạo payment và connect với order
      await tx.payment.create({
        data: {
          order: { connect: { id: order.id } },
          paymentMethod: 'CASH',
          amount: cart.details.reduce((sum: number, item: any) => sum + 100000 * item.quantity, 0),
          status: PaymentStatus.PENDING,
        },
      });
    });
  }
  console.log(`✅ Seeded orders for ${users.length} users`);
} 
