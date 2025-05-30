import { prisma } from '@/config/prisma';
import { CosmeticType } from '../cosmetic.types';

// Helper function to generate placeholder images
const generateImageUrl = (width: number = 400, height: number = 400, seed?: string): string => {
  if (seed) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }
  return `https://picsum.photos/${width}/${height}`;
};

// Sample data
const optionSampleData = [
  { optionKey: "Loại da", optionValue: "Da dầu", id: "option-1" },
  { optionKey: "Loại da", optionValue: "Da khô", id: "option-2" },
  { optionKey: "Loại da", optionValue: "Da hỗn hợp", id: "option-3" },
  { optionKey: "Mùi hương", optionValue: "Trà xanh", id: "option-4" },
  { optionKey: "Mùi hương", optionValue: "Hoa hồng", id: "option-5" },
  { optionKey: "Mùi hương", optionValue: "Dâu tây", id: "option-6" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 30", id: "option-7" },
  { optionKey: "Chỉ số chống nắng", optionValue: "SPF 50+", id: "option-8" },
  { optionKey: "Dạng sản phẩm", optionValue: "Tuýp", id: "option-9" },
  { optionKey: "Dạng sản phẩm", optionValue: "Xịt", id: "option-10" }
];

const shippingPolicyData = [
  {
    id: "shipping-policy-1",
    name: "Chính sách giao hàng tiêu chuẩn",
    description: "Chính sách giao hàng tiêu chuẩn cho các sản phẩm chăm sóc da",
    deliveryTime: "3-5 ngày làm việc",
    freeShippingThreshold: 500000,
    features: [
      {
        title: "Giao hàng nhanh",
        description: "3-5 ngày làm việc",
        icon: "🚚",
        orderIndex: 1
      },
      {
        title: "Miễn phí vận chuyển",
        description: "cho đơn hàng từ 500.000₫",
        icon: "💰",
        orderIndex: 2
      },
      {
        title: "Đóng gói cẩn thận",
        description: "Bảo vệ sản phẩm trong quá trình vận chuyển",
        icon: "📦",
        orderIndex: 3
      },
      {
        title: "Theo dõi đơn hàng",
        description: "Cập nhật tình trạng theo thời gian thực",
        icon: "📱",
        orderIndex: 4
      }
    ]
  },
  {
    id: "shipping-policy-2", 
    name: "Chính sách giao hàng cao cấp",
    description: "Chính sách giao hàng cao cấp cho các sản phẩm makeup và skincare",
    deliveryTime: "1-2 ngày làm việc",
    freeShippingThreshold: 300000,
    features: [
      {
        title: "Giao hàng siêu tốc",
        description: "1-2 ngày làm việc",
        icon: "⚡",
        orderIndex: 1
      },
      {
        title: "Miễn phí ship",
        description: "cho đơn hàng từ 300.000₫",
        icon: "🎁",
        orderIndex: 2
      },
      {
        title: "Giao hàng COD",
        description: "Thanh toán khi nhận hàng",
        icon: "💳",
        orderIndex: 3
      },
      {
        title: "Đổi trả miễn phí",
        description: "trong vòng 7 ngày",
        icon: "↩️",
        orderIndex: 4
      },
      {
        title: "Hỗ trợ 24/7",
        description: "Tư vấn và hỗ trợ mọi lúc",
        icon: "📞",
        orderIndex: 5
      }
    ]
  }
];

const cosmeticSampleData = [
  {
    name: "Sữa rửa mặt dịu nhẹ",
    description: "Làm sạch sâu, phù hợp da nhạy cảm.",
    price: 120000,
    stock: 100,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "cleanser"),
    usageInstructions: "<p>Bước 1: Làm ướt mặt với nước ấm</p><p>Bước 2: Lấy lượng vừa đủ sản phẩm, massage nhẹ nhàng</p><p>Bước 3: Rửa sạch với nước và thấm khô</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "150ml" },
      { key: "Thành phần", value: "Chiết xuất trà xanh" }
    ],
    benefits: [
      {
        benefitKey: "Làm sạch sâu",
        benefitValue: "Công thức đặc biệt giúp làm sạch sâu các tạp chất và bụi bẩn trong lỗ chân lông",
        orderIndex: 1
      },
      {
        benefitKey: "Dịu nhẹ cho da",
        benefitValue: "Chiết xuất thiên nhiên giúp làm dịu da, phù hợp cho da nhạy cảm",
        orderIndex: 2
      },
      {
        benefitKey: "Cân bằng độ ẩm",
        benefitValue: "Không làm khô da, duy trì độ ẩm tự nhiên của da",
        orderIndex: 3
      }
    ],
    badges: [
      {
        badgeType: "QUALITY",
        title: "Chất lượng cao cấp",
        icon: "⭐",
        color: "gold",
        orderIndex: 1
      },
      {
        badgeType: "MADE_IN",
        title: "Sản xuất tại Việt Nam",
        icon: "🇻🇳",
        color: "green",
        orderIndex: 2
      }
    ],
    reviews: [
      {
        rating: 5,
        title: "Sản phẩm tuyệt vời!",
        content: "Mình đã dùng sản phẩm này được 2 tháng và thấy da mình cải thiện rõ rệt. Sữa rửa mặt rất dịu nhẹ, không gây khô da.",
        isVerified: true,
        isApproved: true,
        userName: "Nguyễn Thị Lan"
      },
      {
        rating: 4,
        title: "Khá ổn cho da nhạy cảm",
        content: "Da mình khá nhạy cảm nhưng dùng sản phẩm này không bị kích ứng. Tuy nhiên mùi hương hơi nhạt.",
        isVerified: true,
        isApproved: true,
        userName: "Trần Văn Nam"
      },
      {
        rating: 5,
        title: "Rất thích!",
        content: "Làm sạch rất tốt mà không làm khô da. Giá cả hợp lý.",
        isVerified: false,
        isApproved: true,
        userName: "Lê Thị Hoa"
      }
    ],
    variants: [
      { 
        name: "Dạng tuýp nhỏ", 
        sku: "SRM-01", 
        price: 120000, 
        stock: 30, 
        image: generateImageUrl(400, 400, "cleanser-tube-small"),
        optionIds: ["option-1", "option-2"] 
      },
      { 
        name: "Dạng tuýp lớn", 
        sku: "SRM-02", 
        price: 180000, 
        stock: 40, 
        image: generateImageUrl(400, 400, "cleanser-tube-large"),
        optionIds: ["option-3", "option-4"] 
      },
      { 
        name: "Dạng chai", 
        sku: "SRM-03", 
        price: 200000, 
        stock: 30, 
        image: generateImageUrl(400, 400, "cleanser-bottle"),
        optionIds: ["option-5", "option-6"] 
      }
    ]
  },
  {
    name: "Kem chống nắng toàn thân",
    description: "Bảo vệ da khỏi tia UV, không nhờn rít.",
    price: 250000,
    stock: 80,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "sunscreen"),
    usageInstructions: "<p>Bước 1: Thoa đều lên toàn thân trước khi ra nắng 15-20 phút</p><p>Bước 2: Thoa lại mỗi 2 tiếng hoặc sau khi bơi, đổ mồ hôi</p><p>Bước 3: Sử dụng hàng ngày để bảo vệ da tốt nhất</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Chỉ số chống nắng", value: "SPF 50+" },
      { key: "Dạng", value: "Kem" }
    ],
    benefits: [
      {
        benefitKey: "Bảo vệ khỏi tia UV",
        benefitValue: "Chỉ số SPF 50+ bảo vệ da khỏi tia UVA và UVB có hại",
        orderIndex: 1
      },
      {
        benefitKey: "Không nhờn rít",
        benefitValue: "Công thức nhẹ, thấm nhanh, không để lại cảm giác nhờn rít khó chịu",
        orderIndex: 2
      },
      {
        benefitKey: "Chống nước",
        benefitValue: "Công thức chống nước, bền màu ngay cả khi bơi lội hoặc đổ mồ hôi",
        orderIndex: 3
      }
    ],
    badges: [
      {
        badgeType: "CERTIFICATION",
        title: "Kiểm định FDA",
        icon: "✅",
        color: "blue",
        orderIndex: 1
      },
      {
        badgeType: "QUALITY",
        title: "Chất lượng cao cấp",
        icon: "⭐",
        color: "gold",
        orderIndex: 2
      },
      {
        badgeType: "SHIPPING",
        title: "Miễn phí vận chuyển",
        icon: "🚚",
        color: "green",
        orderIndex: 3
      }
    ],
    reviews: [
      {
        rating: 5,
        title: "Chống nắng hiệu quả",
        content: "Mình làm việc ngoài trời nhiều, dùng kem này không bị cháy nắng. Thấm nhanh, không nhờn rít.",
        isVerified: true,
        isApproved: true,
        userName: "Phạm Minh Tuấn"
      },
      {
        rating: 4,
        title: "Tốt nhưng hơi đắt",
        content: "Chất lượng tốt, bảo vệ da hiệu quả. Chỉ có điều giá hơi cao so với mặt bằng chung.",
        isVerified: true,
        isApproved: true,
        userName: "Hoàng Thị Mai"
      },
      {
        rating: 5,
        title: "Sẽ mua lại",
        content: "Kem chống nắng tốt nhất mình từng dùng. Không gây bít tắc lỗ chân lông.",
        isVerified: true,
        isApproved: true,
        userName: "Đỗ Văn Hùng"
      }
    ],
    variants: [
      { 
        name: "Dạng tuýp", 
        sku: "KCN-01", 
        price: 250000, 
        stock: 30, 
        image: generateImageUrl(400, 400, "sunscreen-tube"),
        optionIds: ["option-7", "option-8"] 
      },
      { 
        name: "Dạng xịt", 
        sku: "KCN-02", 
        price: 270000, 
        stock: 25, 
        image: generateImageUrl(400, 400, "sunscreen-spray"),
        optionIds: ["option-9", "option-10"] 
      },
      { 
        name: "Dạng gel", 
        sku: "KCN-03", 
        price: 260000, 
        stock: 25, 
        image: generateImageUrl(400, 400, "sunscreen-gel"),
        optionIds: ["option-1", "option-3"] 
      }
    ]
  },
  {
    name: "Son dưỡng môi thiên nhiên",
    description: "Dưỡng ẩm, làm mềm môi, không chì.",
    price: 90000,
    stock: 150,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "lipbalm"),
    usageInstructions: "<p>Bước 1: Làm sạch môi</p><p>Bước 2: Thoa đều son dưỡng lên môi</p><p>Bước 3: Sử dụng 2-3 lần mỗi ngày hoặc khi cần thiết</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Màu sắc", value: "Hồng nhạt" },
      { key: "Hương", value: "Dâu tây" }
    ],
    benefits: [
      {
        benefitKey: "Dưỡng ẩm tức thì",
        benefitValue: "Cung cấp độ ẩm ngay lập tức cho đôi môi khô và nứt nẻ",
        orderIndex: 1
      },
      {
        benefitKey: "100% thiên nhiên",
        benefitValue: "Thành phần hoàn toàn từ thiên nhiên, an toàn cho sức khỏe",
        orderIndex: 2
      },
      {
        benefitKey: "Mùi hương dễ chịu",
        benefitValue: "Hương dâu tây tự nhiên, tạo cảm giác tươi mát",
        orderIndex: 3
      }
    ],
    badges: [
      {
        badgeType: "MADE_IN",
        title: "Sản xuất tại Việt Nam",
        icon: "🇻🇳",
        color: "green",
        orderIndex: 1
      },
      {
        badgeType: "WARRANTY",
        title: "Bảo hành 30 ngày",
        icon: "🛡️",
        color: "blue",
        orderIndex: 2
      },
      {
        badgeType: "RETURN_POLICY",
        title: "Đổi trả miễn phí",
        icon: "↩️",
        color: "orange",
        orderIndex: 3
      }
    ],
    reviews: [
      {
        rating: 5,
        title: "Môi mềm mượt",
        content: "Thoa lên môi rất mềm mượt, mùi dâu tây dễ chịu. Thiết kế đẹp nữa.",
        isVerified: true,
        isApproved: true,
        userName: "Vũ Thị Linh"
      },
      {
        rating: 4,
        title: "Dưỡng ẩm tốt",
        content: "Dưỡng ẩm rất tốt, đặc biệt vào mùa khô. Mùi hương tự nhiên, không hóa chất.",
        isVerified: true,
        isApproved: true,
        userName: "Bùi Văn Đức"
      },
      {
        rating: 5,
        title: "Thiên nhiên 100%",
        content: "Thích nhất là thành phần thiên nhiên, an toàn cho sức khỏe. Hiệu quả dưỡng ẩm rất tốt.",
        isVerified: true,
        isApproved: true,
        userName: "Ngô Thị Hương"
      }
    ],
    variants: [
      { 
        name: "Hồng tự nhiên", 
        sku: "SON-01", 
        price: 90000, 
        stock: 50, 
        image: generateImageUrl(400, 400, "lipbalm-pink"),
        optionIds: ["option-2", "option-4"] 
      },
      { 
        name: "Cam đào", 
        sku: "SON-02", 
        price: 95000, 
        stock: 50, 
        image: generateImageUrl(400, 400, "lipbalm-peach"),
        optionIds: ["option-5", "option-7"] 
      },
      { 
        name: "Đỏ cherry", 
        sku: "SON-03", 
        price: 95000, 
        stock: 50, 
        image: generateImageUrl(400, 400, "lipbalm-cherry"),
        optionIds: ["option-6", "option-8"] 
      }
    ]
  }
];

// Helper function to calculate average rating
function calculateAverageRating(reviews: any[]): number {
  if (reviews.length === 0) return 0;
  const approvedReviews = reviews.filter(review => review.isApproved);
  if (approvedReviews.length === 0) return 0;
  
  const sum = approvedReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / approvedReviews.length) * 10) / 10; // Round to 1 decimal place
}

// Helper function to create sample users for reviews
async function createSampleUsers() {
  const userNames = [
    "Nguyễn Thị Lan", "Trần Văn Nam", "Lê Thị Hoa", "Phạm Minh Tuấn", 
    "Hoàng Thị Mai", "Đỗ Văn Hùng", "Vũ Thị Linh", "Bùi Văn Đức", "Ngô Thị Hương"
  ];
  
  const users = [];
  for (const name of userNames) {
    const email = name.toLowerCase().replace(/ /g, '') + '@example.com';
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: {
        email,
        name,
        password: 'hashedpassword123', // In real app, this would be properly hashed
        secretKey: 'sample-secret-key'
      }
    });
    users.push(user);
  }
  return users;
}

export async function seedCosmeticData() {
  console.log('🌱 Starting enhanced cosmetic data seeding...');

  try {
    // 1. Create sample users for reviews
    console.log('👥 Creating sample users...');
    const users = await createSampleUsers();
    console.log(`✅ Created/updated ${users.length} sample users`);

    // 2. Create distributor sample if not exists
    const distributorId = "distributor-1";
    const existingDistributor = await prisma.cosmeticDistributor.findUnique({
      where: { id: distributorId }
    });

    if (!existingDistributor) {
      await prisma.cosmeticDistributor.create({
        data: {
          id: distributorId,
          name: "Nhà phân phối mẫu",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          phone: "0123456789",
          email: "distributor@example.com"
        }
      });
      console.log('✅ Created sample distributor');
    } else {
      console.log('ℹ️  Sample distributor already exists');
    }

    // 3. Create shipping policies
    console.log('🚚 Creating shipping policies...');
    for (const policy of shippingPolicyData) {
      await prisma.shippingPolicy.upsert({
        where: { id: policy.id },
        update: {
          name: policy.name,
          description: policy.description,
          deliveryTime: policy.deliveryTime,
          freeShippingThreshold: policy.freeShippingThreshold
        },
        create: {
          id: policy.id,
          name: policy.name,
          description: policy.description,
          deliveryTime: policy.deliveryTime,
          freeShippingThreshold: policy.freeShippingThreshold,
          features: {
            create: policy.features
          }
        }
      });
    }
    console.log(`✅ Created/updated ${shippingPolicyData.length} shipping policies`);

    // 4. Create options
    console.log('🔧 Creating options...');
    for (const option of optionSampleData) {
      await prisma.cosmeticOption.upsert({
        where: { id: option.id },
        update: {
          optionKey: option.optionKey,
          optionValue: option.optionValue
        },
        create: {
          id: option.id,
          optionKey: option.optionKey,
          optionValue: option.optionValue
        }
      });
    }
    console.log(`✅ Created/updated ${optionSampleData.length} options`);

    // 5. Create cosmetics with enhanced features
    console.log('💄 Creating enhanced cosmetics...');
    for (const cosmetic of cosmeticSampleData) {
      const existingCosmetic = await prisma.cosmetic.findFirst({
        where: { name: cosmetic.name }
      });

      if (existingCosmetic) {
        console.log(`ℹ️  Cosmetic "${cosmetic.name}" already exists, skipping...`);
        continue;
      }

      // Calculate rating statistics
      const averageRating = calculateAverageRating(cosmetic.reviews);
      const totalReviews = cosmetic.reviews.filter(r => r.isApproved).length;

      await prisma.$transaction(async (tx) => {
        // Create cosmetic with enhanced fields
        const createdCosmetic = await tx.cosmetic.create({
          data: {
            name: cosmetic.name,
            description: cosmetic.description,
            price: cosmetic.price,
            stock: cosmetic.stock,
            type: cosmetic.type,
            distributorId: cosmetic.distributorId,
            image: cosmetic.image,
            usageInstructions: cosmetic.usageInstructions,
            shippingPolicyId: cosmetic.shippingPolicyId,
            averageRating,
            totalReviews,
          },
        });

        // Create specifications
        if (cosmetic.specifications?.length > 0) {
          for (const spec of cosmetic.specifications) {
            await tx.cosmeticSpec.create({
              data: {
                cosmeticId: createdCosmetic.id,
                specKey: spec.key,
                specValue: spec.value,
              },
            });
          }
        }

        // Create benefits
        if (cosmetic.benefits?.length > 0) {
          for (const benefit of cosmetic.benefits) {
            await tx.cosmeticBenefit.create({
              data: {
                cosmeticId: createdCosmetic.id,
                benefitKey: benefit.benefitKey,
                benefitValue: benefit.benefitValue,
                orderIndex: benefit.orderIndex,
              },
            });
          }
        }

        // Create badges
        if (cosmetic.badges?.length > 0) {
          for (const badge of cosmetic.badges) {
            await tx.cosmeticBadge.create({
              data: {
                cosmeticId: createdCosmetic.id,
                badgeType: badge.badgeType as any,
                title: badge.title,
                icon: badge.icon,
                color: badge.color,
                orderIndex: badge.orderIndex,
              },
            });
          }
        }

        // Create reviews with user associations
        if (cosmetic.reviews?.length > 0) {
          for (const review of cosmetic.reviews) {
            const user = users.find(u => u.name === review.userName);
            await tx.cosmeticReview.create({
              data: {
                cosmeticId: createdCosmetic.id,
                userId: user?.id,
                rating: review.rating,
                title: review.title,
                content: review.content,
                isVerified: review.isVerified,
                isApproved: review.isApproved,
              },
            });
          }
        }

        // Create variants with options using implicit many-to-many
        if (cosmetic.variants?.length > 0) {
          for (const variant of cosmetic.variants) {
            await tx.cosmeticVariant.create({
              data: {
                cosmeticId: createdCosmetic.id,
                name: variant.name,
                sku: variant.sku,
                price: variant.price,
                stock: variant.stock,
                image: variant.image,
                CosmeticOption: {
                  connect: variant.optionIds.map(id => ({ id }))
                }
              },
            });
          }
        }
      });

      console.log(`✅ Created enhanced cosmetic "${cosmetic.name}" with benefits, badges, reviews and variants`);
    }

    console.log('🎉 Enhanced cosmetic data seeding completed successfully!');
    
    // Display statistics
    const stats = await getStats();
    console.log('\n📊 Database Statistics:');
    console.log(`- Users: ${stats.users}`);
    console.log(`- Distributors: ${stats.distributors}`);
    console.log(`- Shipping Policies: ${stats.shippingPolicies}`);
    console.log(`- Shipping Features: ${stats.shippingFeatures}`);
    console.log(`- Options: ${stats.options}`);
    console.log(`- Cosmetics: ${stats.cosmetics}`);
    console.log(`- Variants: ${stats.variants}`);
    console.log(`- Specifications: ${stats.specifications}`);
    console.log(`- Benefits: ${stats.benefits}`);
    console.log(`- Badges: ${stats.badges}`);
    console.log(`- Reviews: ${stats.reviews}`);

  } catch (error) {
    console.error('❌ Error seeding enhanced cosmetic data:', error);
    throw error;
  }
}

async function getStats() {
  const [
    users, distributors, shippingPolicies, shippingFeatures, options, 
    cosmetics, variants, specifications, benefits, badges, reviews
  ] = await Promise.all([
    prisma.user.count(),
    prisma.cosmeticDistributor.count(),
    prisma.shippingPolicy.count(),
    prisma.shippingFeature.count(),
    prisma.cosmeticOption.count(),
    prisma.cosmetic.count(),
    prisma.cosmeticVariant.count(),
    prisma.cosmeticSpec.count(),
    prisma.cosmeticBenefit.count(),
    prisma.cosmeticBadge.count(),
    prisma.cosmeticReview.count(),
  ]);

  return { 
    users, distributors, shippingPolicies, shippingFeatures, options, 
    cosmetics, variants, specifications, benefits, badges, reviews 
  };
}

// Script to run directly
if (require.main === module) {
  seedCosmeticData()
    .then(() => {
      console.log('✅ Enhanced seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Enhanced seed failed:', error);
      process.exit(1);
    });
} 
