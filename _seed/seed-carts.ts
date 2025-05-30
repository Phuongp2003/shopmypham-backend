import { prisma } from '../src/config/prisma';

export async function seedCarts(users: any[], allVariants: any[]) {
  const carts: any[] = [];
  for (const user of users) {
    // Chọn random 2-4 variant cho cart
    const cartVariants = allVariants.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 3));
    // Tạo cart nếu chưa có
    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    // Xoá cartDetail cũ (nếu có)
    await prisma.cartDetail.deleteMany({ where: { cartId: cart.id } });
    // Thêm sản phẩm vào cart
    for (const variant of cartVariants) {
      await prisma.cartDetail.create({
        data: {
          cartId: cart.id,
          variantId: variant.id,
          quantity: 1 + Math.floor(Math.random() * 3),
        },
      });
    }
    carts.push(cart);
  }
  console.log(`✅ Seeded carts for ${users.length} users`);
  return carts;
} 
