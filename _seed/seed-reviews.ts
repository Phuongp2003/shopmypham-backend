import { prisma } from '../src/config/prisma';
import { faker } from '@faker-js/faker';

export async function seedReviews(users: any[]) {
  // Lấy tất cả sản phẩm và variant
  const cosmetics = await prisma.cosmetic.findMany({ include: { variants: true } });
  // Lấy 5 user cuối cùng (user mới)
  const reviewUsers = users.slice(-5);
  // Đếm số lượng cần seed để 80% sản phẩm có >= 4 đánh giá
  const targetCount = Math.ceil(cosmetics.length * 0.8);
  let reviewedCosmeticIds: string[] = [];
  let reviewCount = 0;

  for (const cosmetic of cosmetics) {
    let count = 0;
    for (const user of reviewUsers) {
      // Kiểm tra đã có order DELIVERED chứa cosmetic này chưa
      let order = await prisma.order.findFirst({
        where: {
          userId: user.id,
          status: 'DELIVERED',
          details: {
            some: {
              variant: {
                cosmeticId: cosmetic.id,
              },
            },
          },
        },
        include: { details: true },
      });
      // Nếu chưa có, tạo order DELIVERED với 1 variant của cosmetic này
      if (!order) {
        const variant = cosmetic.variants[0];
        if (!variant) continue;
        order = await prisma.order.create({
          data: {
            userId: user.id,
            addressId: (await prisma.address.findFirst({ where: { userId: user.id } }))?.id ?? '',
            status: 'DELIVERED',
            note: `Auto order for review - ${cosmetic.name}`,
            details: {
              create: [{ variantId: variant.id, quantity: 1, price: 100000 }],
            },
          },
          include: { details: true },
        });
      }
      // Kiểm tra đã có review chưa
      const existed = await prisma.cosmeticReview.findFirst({
        where: {
          cosmeticId: cosmetic.id,
          userId: user.id,
          orderId: order.id,
        },
      });
      if (!existed) {
        await prisma.cosmeticReview.create({
          data: {
            cosmeticId: cosmetic.id,
            userId: user.id,
            orderId: order.id,
            rating: 4 + Math.floor(Math.random() * 2),
            title: faker.lorem.words(3),
            content: faker.lorem.sentences(2),
          },
        });
        count++;
        reviewCount++;
      }
      if (count >= 4) break;
    }
    if (count >= 4) reviewedCosmeticIds.push(cosmetic.id);
    if (reviewedCosmeticIds.length >= targetCount) break;
  }

  // Cập nhật lại averageRating và totalReviews cho từng cosmetic
  for (const cosmetic of cosmetics) {
    const reviews = await prisma.cosmeticReview.findMany({ where: { cosmeticId: cosmetic.id } });
    let averageRating = 0;
    if (reviews.length > 0) {
      averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    }
    const totalReviews = reviews.length;
    await prisma.cosmetic.update({
      where: { id: cosmetic.id },
      data: { averageRating, totalReviews },
    });
  }

  console.log(`✅ Seeded reviews: ${reviewCount} (>=4 reviews for ${reviewedCosmeticIds.length}/${cosmetics.length} cosmetics)`);
} 
