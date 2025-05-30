import { prisma } from '../src/config/prisma';

const shippingPolicyData = [
  {
    id: "shipping-policy-1",
    name: "Chính sách giao hàng tiêu chuẩn",
    description: "Chính sách giao hàng tiêu chuẩn cho các sản phẩm chăm sóc da",
    deliveryTime: "3-5 ngày làm việc",
    freeShippingThreshold: 500000,
    features: [
      { title: "Giao hàng nhanh", description: "3-5 ngày làm việc", icon: "🚚", orderIndex: 1 },
      { title: "Miễn phí vận chuyển", description: "cho đơn hàng từ 500.000₫", icon: "💰", orderIndex: 2 },
      { title: "Đóng gói cẩn thận", description: "Bảo vệ sản phẩm trong quá trình vận chuyển", icon: "📦", orderIndex: 3 },
      { title: "Theo dõi đơn hàng", description: "Cập nhật tình trạng theo thời gian thực", icon: "📱", orderIndex: 4 }
    ]
  },
  {
    id: "shipping-policy-2",
    name: "Chính sách giao hàng cao cấp",
    description: "Chính sách giao hàng cao cấp cho các sản phẩm makeup và skincare",
    deliveryTime: "1-2 ngày làm việc",
    freeShippingThreshold: 300000,
    features: [
      { title: "Giao hàng siêu tốc", description: "1-2 ngày làm việc", icon: "⚡", orderIndex: 1 },
      { title: "Miễn phí ship", description: "cho đơn hàng từ 300.000₫", icon: "🎁", orderIndex: 2 },
      { title: "Giao hàng COD", description: "Thanh toán khi nhận hàng", icon: "💳", orderIndex: 3 },
      { title: "Đổi trả miễn phí", description: "trong vòng 7 ngày", icon: "↩️", orderIndex: 4 },
      { title: "Hỗ trợ 24/7", description: "Tư vấn và hỗ trợ mọi lúc", icon: "📞", orderIndex: 5 }
    ]
  }
];

export async function seedShippingPolicies() {
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
} 
