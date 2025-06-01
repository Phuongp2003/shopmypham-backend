import { prisma } from '../src/config/prisma';
import { PaymentStatus, OrderStatus } from '@prisma/client';

// Mảng các trạng thái order hợp lệ
const ORDER_STATUSES: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

function getRandomOrderStatus(): OrderStatus {
  const randomIndex = Math.floor(Math.random() * ORDER_STATUSES.length);
  return ORDER_STATUSES[randomIndex];
}

export async function seedOrders(
  users: any[], addressMap: Record<string, string>
) {
  const allVariants = await prisma.cosmeticVariant.findMany();
  let totalOrdersCreated = 0;

  for (const user of users) {
    await prisma.$transaction(async (tx) => {
       const ordersToCreate = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < ordersToCreate; i++) {
        // Chọn ngẫu nhiên 1–3 sản phẩm (variant) cho mỗi đơn
        const variantsInOrder = allVariants.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 3));

        const details = variantsInOrder.map((variant: any) => {
          const quantity = 1 + Math.floor(Math.random() * 3);
          return {
            variantId: variant.id,
            quantity,
            price: 100000, // Hoặc lấy variant.price nếu muốn
          };
        });

        const randomStatus = getRandomOrderStatus();

        const amount = details.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Tạo order
        const order = await tx.order.create({
          data: {
            userId: user.id,
            addressId: addressMap[user.id],
            note: `Đơn hàng ${i + 1} cho user ${user.id}`,
            status: randomStatus,
            details: { create: details },
          },
        });

        // Tạo payment
        await tx.payment.create({
          data: {
            order: { connect: { id: order.id } },
            paymentMethod: 'CASH',
            amount,
            status: PaymentStatus.PENDING,
          },
        });

        totalOrdersCreated++;
      }
    });
  }

  console.log(`✅ Đã tạo tổng cộng ${totalOrdersCreated} đơn hàng cho ${users.length} users`);
}
// export async function seedOrders(users: any[], addressMap: Record<string, string>) {
//   for (const user of users) {
//     await prisma.$transaction(async (tx) => {
//       const cart = await tx.cart.findUnique({
//         where: { userId: user.id },
//         include: { details: true },
//       });
//       if (!cart || !cart.details.length) return;
//       // Tạo order
//       const order = await tx.order.create({
//         data: {
//           userId: user.id,
//           addressId: addressMap[user.id],
//           note: 'Order demo tự động từ cart',
//           status: 'PENDING',
//           details: {
//             create: cart.details.map((item: any) => ({
//               variantId: item.variantId,
//               quantity: item.quantity,
//               price: 100000, // Có thể lấy giá từ variant nếu cần
//             })),
//           },
//         },
//       });
//       // Tạo payment và connect với order
//       await tx.payment.create({
//         data: {
//           order: { connect: { id: order.id } },
//           paymentMethod: 'CASH',
//           amount: cart.details.reduce((sum: number, item: any) => sum + 100000 * item.quantity, 0),
//           status: PaymentStatus.PENDING,
//         },
//       });
//     });
//   }
//   console.log(`✅ Seeded orders for ${users.length} users`);
// } 
