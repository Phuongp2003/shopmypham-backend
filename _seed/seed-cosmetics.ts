import { prisma } from '../src/config/prisma';
import { CosmeticType } from '../src/modules/cosmetic/cosmetic.types';

// Helper function to generate placeholder images
const generateImageUrl = (width: number = 400, height: number = 400, seed?: string): string => {
  if (seed) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }
  return `https://picsum.photos/${width}/${height}`;
};

// Cosmetic sample data (chỉ 3 mẫu, sẽ clone để đủ 20)
const cosmeticSampleData = [
  {
    name: "Sữa rửa mặt dịu nhẹ",
    description: "Làm sạch sâu, phù hợp da nhạy cảm.",
    price: 120000,
    stock: 100,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "cleanser"),
    usageInstructions: "<p>Làm ướt mặt → lấy sữa rửa mặt → massage → rửa sạch</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "150ml" },
      { key: "Thành phần", value: "Chiết xuất trà xanh" }
    ],
    benefits: [
      { benefitKey: "Làm sạch sâu", benefitValue: "Loại bỏ bụi bẩn", orderIndex: 1 },
      { benefitKey: "Dịu nhẹ", benefitValue: "Không gây kích ứng", orderIndex: 2 }
    ],
    badges: [
      { badgeType: "QUALITY", title: "Chất lượng cao cấp", icon: "⭐", color: "gold", orderIndex: 1 }
    ],
    variants: [
      { name: "Tuýp 150ml", sku: "SRM-150", price: 120000, stock: 30, image: generateImageUrl(400, 400, "cleanser1"), optionIds: ["option-1"] }
    ]
  },
  {
    name: "Kem dưỡng ẩm ban đêm",
    description: "Dưỡng ẩm sâu suốt đêm.",
    price: 250000,
    stock: 60,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "nightcream"),
    usageInstructions: "<p>Sử dụng vào buổi tối trước khi ngủ</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "50ml" },
      { key: "Thành phần", value: "Hyaluronic Acid" }
    ],
    benefits: [
      { benefitKey: "Dưỡng ẩm", benefitValue: "Cấp ẩm cả đêm", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "VEGAN", title: "Thuần chay", icon: "🌱", color: "green", orderIndex: 1 }
    ],
    variants: [
      { name: "Hũ 50ml", sku: "KDA-50", price: 250000, stock: 30, image: generateImageUrl(400, 400, "nightcream1"), optionIds: ["option-2"] }
    ]
  },
  {
    name: "Kem chống nắng SPF50",
    description: "Chống nắng phổ rộng, không gây bí da.",
    price: 180000,
    stock: 90,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "sunblock"),
    usageInstructions: "<p>Thoa 15 phút trước khi ra nắng</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Chỉ số SPF", value: "50+" },
      { key: "Chất kem", value: "Dạng gel" }
    ],
    benefits: [
      { benefitKey: "Chống nắng", benefitValue: "Bảo vệ da khỏi UV", orderIndex: 1 },
      { benefitKey: "Không bết dính", benefitValue: "Khô thoáng cả ngày", orderIndex: 2 }
    ],
    badges: [
      { badgeType: "BEST_SELLER", title: "Bán chạy", icon: "🔥", color: "red", orderIndex: 1 }
    ],
    variants: [
      { name: "Tuýp 50ml", sku: "KCN-50", price: 180000, stock: 45, image: generateImageUrl(400, 400, "sunblock1"), optionIds: ["option-3"] }
    ]
  },
  {
    name: "Son dưỡng môi hồng tự nhiên",
    description: "Cấp ẩm và làm hồng môi tự nhiên.",
    price: 95000,
    stock: 200,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "lipbalm"),
    usageInstructions: "<p>Thoa lên môi bất cứ khi nào cảm thấy khô</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Trọng lượng", value: "5g" },
      { key: "Hương", value: "Dâu" }
    ],
    benefits: [
      { benefitKey: "Cấp ẩm", benefitValue: "Dưỡng ẩm lâu dài", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "NATURAL", title: "Thành phần thiên nhiên", icon: "🍃", color: "green", orderIndex: 1 }
    ],
    variants: [
      { name: "Thỏi 5g", sku: "SDL-5", price: 95000, stock: 100, image: generateImageUrl(400, 400, "lipbalm1"), optionIds: ["option-4"] }
    ]
  },
  {
    name: "Phấn nước trang điểm",
    description: "Lớp nền mỏng nhẹ, che phủ tốt.",
    price: 320000,
    stock: 70,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "cushion"),
    usageInstructions: "<p>Dùng bông phấn tán đều lên mặt</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Tông màu", value: "Light Beige" },
      { key: "Chống nắng", value: "SPF30" }
    ],
    benefits: [
      { benefitKey: "Che khuyết điểm", benefitValue: "Tự nhiên, không dày", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Hộp 15g", sku: "PNTD-15", price: 320000, stock: 35, image: generateImageUrl(400, 400, "cushion1"), optionIds: ["option-5"] }
    ]
  },
  {
    name: "Toner hoa cúc",
    description: "Làm dịu da và cân bằng pH.",
    price: 165000,
    stock: 50,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "toner"),
    usageInstructions: "<p>Dùng sau bước rửa mặt</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "250ml" },
      { key: "Chiết xuất", value: "Hoa cúc La Mã" }
    ],
    benefits: [
      { benefitKey: "Cân bằng da", benefitValue: "Chuẩn bị cho bước dưỡng", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Chai 250ml", sku: "THC-250", price: 165000, stock: 25, image: generateImageUrl(400, 400, "toner1"), optionIds: ["option-6"] }
    ]
  },
  {
    name: "Tinh chất dưỡng trắng da",
    description: "Giúp làm sáng và đều màu da.",
    price: 300000,
    stock: 80,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "whitening-serum"),
    usageInstructions: "<p>Thoa đều lên mặt và cổ vào buổi tối</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "30ml" },
      { key: "Thành phần", value: "Vitamin C, Niacinamide" }
    ],
    benefits: [
      { benefitKey: "Dưỡng trắng", benefitValue: "Làm sáng da hiệu quả", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "BEST_SELLER", title: "Bán chạy", icon: "🔥", color: "red", orderIndex: 1 }
    ],
    variants: [
      { name: "Chai 30ml", sku: "TSW-30", price: 300000, stock: 40, image: generateImageUrl(400, 400, "whitening-serum1"), optionIds: ["option-7"] }
    ]
  },
  {
    name: "Gel tẩy tế bào chết",
    description: "Loại bỏ lớp da chết nhẹ nhàng, giúp da mịn màng.",
    price: 140000,
    stock: 90,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "exfoliating-gel"),
    usageInstructions: "<p>Sử dụng 2-3 lần/tuần sau khi rửa mặt</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "100ml" },
      { key: "Thành phần", value: "AHA, BHA" }
    ],
    benefits: [
      { benefitKey: "Tẩy da chết", benefitValue: "Giúp da sáng mịn", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Tuýp 100ml", sku: "GTB-100", price: 140000, stock: 50, image: generateImageUrl(400, 400, "exfoliating-gel1"), optionIds: ["option-8"] }
    ]
  },
  {
    name: "Phấn má hồng dạng kem",
    description: "Tạo má hồng tự nhiên, dễ tán.",
    price: 180000,
    stock: 75,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "cream-blush"),
    usageInstructions: "<p>Chấm nhẹ lên má rồi tán đều</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Trọng lượng", value: "10g" },
      { key: "Màu sắc", value: "Hồng đào" }
    ],
    benefits: [
      { benefitKey: "Tạo màu", benefitValue: "Má hồng tự nhiên", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "VEGAN", title: "Thuần chay", icon: "🌱", color: "green", orderIndex: 1 }
    ],
    variants: [
      { name: "Hộp 10g", sku: "PMH-10", price: 180000, stock: 35, image: generateImageUrl(400, 400, "cream-blush1"), optionIds: ["option-9"] }
    ]
  },
  {
    name: "Mascara chống lem",
    description: "Giúp mi dài và cong suốt ngày dài.",
    price: 220000,
    stock: 110,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "mascara"),
    usageInstructions: "<p>Chải đều từ chân mi đến ngọn mi</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Dung tích", value: "8ml" },
      { key: "Đặc điểm", value: "Không lem, không vón cục" }
    ],
    benefits: [
      { benefitKey: "Dài mi", benefitValue: "Tạo hiệu ứng dài mi", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Ống 8ml", sku: "MSR-8", price: 220000, stock: 60, image: generateImageUrl(400, 400, "mascara1"), optionIds: ["option-10"] }
    ]
  },
  {
    name: "Tẩy trang dạng nước",
    description: "Loại bỏ lớp trang điểm hiệu quả, không gây khô da.",
    price: 190000,
    stock: 70,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "cleansing-oil"),
    usageInstructions: "<p>Massage nhẹ nhàng lên mặt khô rồi rửa sạch</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "150ml" },
      { key: "Thành phần", value: "Dầu thực vật tự nhiên" }
    ],
    benefits: [
      { benefitKey: "Tẩy trang", benefitValue: "Làm sạch sâu, giữ ẩm", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "NATURAL", title: "Thành phần thiên nhiên", icon: "🍃", color: "green", orderIndex: 1 }
    ],
    variants: [
      { name: "Chai 150ml", sku: "TTD-150", price: 190000, stock: 40, image: generateImageUrl(400, 400, "cleansing-oil1"), optionIds: ["option-11"] }
    ]
  },
  {
    name: "Kem nền dạng lỏng",
    description: "Che phủ hoàn hảo, nhẹ mặt và lâu trôi.",
    price: 280000,
    stock: 65,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "liquid-foundation"),
    usageInstructions: "<p>Thoa đều lên mặt bằng cọ hoặc bông mút</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Dung tích", value: "30ml" },
      { key: "Màu sắc", value: "Be tự nhiên" }
    ],
    benefits: [
      { benefitKey: "Che phủ", benefitValue: "Tự nhiên, không cakey", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Chai 35ml", sku: "KNDL-30", price: 280000, stock: 30, image: generateImageUrl(400, 400, "liquid-foundation1"), optionIds: ["option-12"] }
    ]
  },
  {
    name: "Xịt khoáng dưỡng da",
    description: "Cấp ẩm tức thì, làm dịu da mệt mỏi.",
    price: 150000,
    stock: 90,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "facial-mist"),
    usageInstructions: "<p>Xịt đều lên mặt khi cảm thấy khô hoặc sau trang điểm</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "120ml" },
      { key: "Thành phần", value: "Nước khoáng tự nhiên" }
    ],
    benefits: [
      { benefitKey: "Cấp ẩm", benefitValue: "Dưỡng ẩm nhanh chóng", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Chai 120ml", sku: "XKD-120", price: 150000, stock: 45, image: generateImageUrl(400, 400, "facial-mist1"), optionIds: ["option-13"] }
    ]
  },
  {
    name: "Kẻ mắt nước chống thấm",
    description: "Viền mắt sắc nét, bền lâu cả ngày.",
    price: 210000,
    stock: 85,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "liquid-eyeliner"),
    usageInstructions: "<p>Vẽ viền mắt theo ý muốn, để khô tự nhiên</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Dung tích", value: "5ml" },
      { key: "Đặc điểm", value: "Chống thấm nước" }
    ],
    benefits: [
      { benefitKey: "Viền mắt", benefitValue: "Sắc nét, bền lâu", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "BEST_SELLER", title: "Bán chạy", icon: "🔥", color: "red", orderIndex: 1 }
    ],
    variants: [
      { name: "Chai 5ml", sku: "KEMT-5", price: 210000, stock: 50, image: generateImageUrl(400, 400, "liquid-eyeliner1"), optionIds: ["option-14"] }
    ]
  },
  {
    name: "Sáp vuốt tóc nam",
    description: "Kiểm soát kiểu tóc, giữ nếp lâu dài.",
    price: 160000,
    stock: 120,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "hair-wax"),
    usageInstructions: "<p>Lấy một lượng nhỏ, vuốt đều lên tóc</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Trọng lượng", value: "75g" },
      { key: "Mùi hương", value: "Bạc hà" }
    ],
    benefits: [
      { benefitKey: "Giữ nếp", benefitValue: "Kiểu tóc bền vững", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Hũ 75g", sku: "SVT-75", price: 160000, stock: 70, image: generateImageUrl(400, 400, "hair-wax1"), optionIds: ["option-15"] }
    ]
  },
  {
    name: "Serum vitamin C sáng da",
    description: "Giúp da sáng khỏe và đều màu.",
    price: 300000,
    stock: 80,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "serum-vitamin-c"),
    usageInstructions: "<p>Thoa 2-3 giọt lên mặt sau bước toner</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "30ml" },
      { key: "Thành phần", value: "Vitamin C, Hyaluronic Acid" }
    ],
    benefits: [
      { benefitKey: "Sáng da", benefitValue: "Giảm thâm nám", orderIndex: 1 },
      { benefitKey: "Dưỡng ẩm", benefitValue: "Cấp nước sâu", orderIndex: 2 }
    ],
    badges: [
      { badgeType: "NEW", title: "Sản phẩm mới", icon: "🆕", color: "blue", orderIndex: 1 }
    ],
    variants: [
      { name: "Chai 20ml", sku: "SERUM-C30", price: 300000, stock: 40, image: generateImageUrl(400, 400, "serum-vitamin-c1"), optionIds: ["option-7"] }
    ]
  },
  {
    name: "Kem mắt giảm quầng thâm",
    description: "Giảm bọng mắt và quầng thâm hiệu quả.",
    price: 280000,
    stock: 55,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "eye-cream"),
    usageInstructions: "<p>Thoa nhẹ vùng mắt mỗi sáng và tối</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "20ml" },
      { key: "Thành phần", value: "Peptide, Caffeine" }
    ],
    benefits: [
      { benefitKey: "Giảm thâm", benefitValue: "Sáng vùng mắt", orderIndex: 1 },
      { benefitKey: "Giảm bọng", benefitValue: "Giảm sưng phù", orderIndex: 2 }
    ],
    badges: [
      { badgeType: "EFFECTIVE", title: "Hiệu quả nhanh", icon: "⚡", color: "purple", orderIndex: 1 }
    ],
    variants: [
      { name: "Tuýp 20ml", sku: "CREAM-EYE20", price: 280000, stock: 30, image: generateImageUrl(400, 400, "eye-cream1"), optionIds: ["option-8"] }
    ]
  },
  {
    name: "Phấn phủ kiềm dầu",
    description: "Giúp da khô ráo, không bóng nhờn suốt ngày.",
    price: 150000,
    stock: 120,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "powder"),
    usageInstructions: "<p>Dùng cọ hoặc bông phấn tán đều lên da</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Trọng lượng", value: "10g" },
      { key: "Loại", value: "Phấn bột" }
    ],
    benefits: [
      { benefitKey: "Kiềm dầu", benefitValue: "Giữ lớp trang điểm lâu", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Hộp 14g", sku: "POWDER-10", price: 150000, stock: 60, image: generateImageUrl(400, 400, "powder1"), optionIds: ["option-9"] }
    ]
  },
  {
    name: "Mascara làm dài mi",
    description: "Tạo độ dài và cong mi tự nhiên.",
    price: 130000,
    stock: 90,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "mascara"),
    usageInstructions: "<p>Chuốt từ gốc đến ngọn mi</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Dung tích", value: "8ml" },
      { key: "Màu sắc", value: "Đen" }
    ],
    benefits: [
      { benefitKey: "Làm dài mi", benefitValue: "Mi cong, không vón cục", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "POPULAR", title: "Yêu thích", icon: "❤️", color: "pink", orderIndex: 1 }
    ],
    variants: [
      { name: "Ống 7ml", sku: "MASCARA-8", price: 130000, stock: 45, image: generateImageUrl(400, 400, "mascara1"), optionIds: ["option-10"] }
    ]
  },
  {
    name: "Gel tẩy tế bào chết dịu nhẹ",
    description: "Loại bỏ tế bào chết, làm sáng da tự nhiên.",
    price: 140000,
    stock: 70,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "exfoliating-gel"),
    usageInstructions: "<p>Massage nhẹ nhàng 2-3 lần/tuần rồi rửa sạch</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "100ml" },
      { key: "Thành phần", value: "Chiết xuất cam" }
    ],
    benefits: [
      { benefitKey: "Tẩy tế bào chết", benefitValue: "Da sáng và mịn màng", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "NATURAL", title: "Thành phần tự nhiên", icon: "🍃", color: "green", orderIndex: 1 }
    ],
    variants: [
      { name: "Tuýp 120ml", sku: "GEL-EXF100", price: 140000, stock: 35, image: generateImageUrl(400, 400, "exfoliating-gel1"), optionIds: ["option-11"] }
    ]
  },
  {
    name: "Tẩy trang dạng dầu ",
    description: "Làm sạch lớp trang điểm và bụi bẩn hiệu quả.",
    price: 220000,
    stock: 85,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "cleansing-oil"),
    usageInstructions: "<p>Massage nhẹ nhàng lên mặt rồi rửa sạch</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "150ml" },
      { key: "Thành phần", value: "Dầu thực vật" }
    ],
    benefits: [
      { benefitKey: "Tẩy trang", benefitValue: "Loại bỏ bụi bẩn và lớp trang điểm", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Chai 125ml", sku: "OIL-CLEANS150", price: 220000, stock: 40, image: generateImageUrl(400, 400, "cleansing-oil1"), optionIds: ["option-12"] }
    ]
  },
  {
    name: "Kem lót nền mịn",
    description: "Giúp lớp trang điểm bám lâu và mịn màng.",
    price: 200000,
    stock: 75,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "primer"),
    usageInstructions: "<p>Thoa một lớp mỏng trước khi trang điểm</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Dung tích", value: "30ml" },
      { key: "Loại da phù hợp", value: "Mọi loại da" }
    ],
    benefits: [
      { benefitKey: "Làm mịn", benefitValue: "Che phủ lỗ chân lông", orderIndex: 1 },
      { benefitKey: "Giữ lớp nền", benefitValue: "Không bị xuống tông", orderIndex: 2 }
    ],
    badges: [
      { badgeType: "BEST_SELLER", title: "Bán chạy", icon: "🔥", color: "red", orderIndex: 1 }
    ],
    variants: [
      { name: "Tuýp 30ml", sku: "PRIMER-30", price: 200000, stock: 35, image: generateImageUrl(400, 400, "primer1"), optionIds: ["option-13"] }
    ]
  },
  {
    name: "Xịt khoáng dưỡng ẩm",
    description: "Cấp nước tức thì cho da, làm dịu và tươi mát.",
    price: 110000,
    stock: 100,
    type: "SKINCARE" as CosmeticType,
    image: generateImageUrl(500, 500, "mist"),
    usageInstructions: "<p>Xịt đều lên mặt khi cần dưỡng ẩm</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-1",
    specifications: [
      { key: "Dung tích", value: "100ml" },
      { key: "Thành phần", value: "Nước khoáng tinh khiết" }
    ],
    benefits: [
      { benefitKey: "Cấp ẩm", benefitValue: "Giữ da mềm mịn", orderIndex: 1 }
    ],
    badges: [],
    variants: [
      { name: "Chai 100ml", sku: "MIST-100", price: 110000, stock: 50, image: generateImageUrl(400, 400, "mist1"), optionIds: ["option-14"] }
    ]
  },
  {
    name: "Son môi lì lâu trôi",
    description: "Màu sắc đậm, bền màu suốt ngày dài.",
    price: 180000,
    stock: 90,
    type: "MAKEUP" as CosmeticType,
    image: generateImageUrl(500, 500, "matte-lipstick"),
    usageInstructions: "<p>Thoa lên môi, có thể thoa nhiều lớp để màu đậm hơn</p>",
    distributorId: "distributor-1",
    shippingPolicyId: "shipping-policy-2",
    specifications: [
      { key: "Trọng lượng", value: "4g" },
      { key: "Màu sắc", value: "Đỏ cam" }
    ],
    benefits: [
      { benefitKey: "Lâu trôi", benefitValue: "Không lem, không trôi", orderIndex: 1 }
    ],
    badges: [
      { badgeType: "POPULAR", title: "Yêu thích", icon: "❤️", color: "pink", orderIndex: 1 }
    ],
    variants: [
      { name: "Thỏi 4g", sku: "LIPSTICK-M4", price: 180000, stock: 45, image: generateImageUrl(400, 400, "matte-lipstick1"), optionIds: ["option-15"] }
    ]
  }
];


// function generateMoreCosmetics(baseData: any[], targetCount = 20): any[] {
//   const cosmetics = [...baseData];
//   let idx = 1;
//   while (cosmetics.length < targetCount) {
//     const base = baseData[idx % baseData.length];
//     const newCosmetic = {
//       ...base,
//       name: `${base.name} (Demo ${cosmetics.length + 1})`,
//       price: base.price + (idx * 10000),
//       stock: base.stock + idx * 5,
//       image: generateImageUrl(500, 500, `cosmetic-demo-${cosmetics.length + 1}`),
//       variants: base.variants.map((v: any, vIdx: number) => ({
//         ...v,
//         name: `${v.name} (Demo ${cosmetics.length + 1}-${vIdx + 1})`,
//         sku: `${v.sku}-D${cosmetics.length + 1}`,
//         price: v.price + vIdx * 5000,
//         stock: v.stock + vIdx * 2,
//         image: generateImageUrl(400, 400, `variant-demo-${cosmetics.length + 1}-${vIdx + 1}`),
//         optionIds: v.optionIds.slice(0, 2 + ((vIdx + idx) % 2)),
//       })),
//     };
//     cosmetics.push(newCosmetic);
//     idx++;
//   }
//   return cosmetics;
// }

export async function seedCosmetics() {
  // const cosmeticData20 = generateMoreCosmetics(cosmeticSampleData, 20);
  const allCreatedVariants: any[] = [];
  for (const cosmetic of cosmeticSampleData) {
    const existingCosmetic = await prisma.cosmetic.findFirst({ where: { name: cosmetic.name } });
    if (existingCosmetic) {
      console.log(`ℹ️  Cosmetic "${cosmetic.name}" already exists, skipping...`);
      continue;
    }
    await prisma.$transaction(async (tx) => {
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
        },
      });
      // Create variants
      if (cosmetic.variants?.length > 0) {
        for (const variant of cosmetic.variants) {
          // Kiểm tra variant đã tồn tại chưa theo name và cosmeticId
          const existingVariant = await tx.cosmeticVariant.findFirst({
            where: {
              name: variant.name,
              cosmeticId: createdCosmetic.id,
            },
          });
           if (!existingVariant) {
            const createdVariant = await tx.cosmeticVariant.create({
              data: {
                cosmeticId: createdCosmetic.id,
                name: variant.name,
                sku: variant.sku,
                price: variant.price,
                stock: variant.stock,
                image: variant.image,
                CosmeticOption: {
                  connect: variant.optionIds.map((id: string) => ({ id }))
                }
              },
            });
            allCreatedVariants.push(createdVariant);
        }
        else {
      console.log(`⚠️ Variant "${variant.name}" for cosmetic "${cosmetic.name}" already exists, skipping...`);
    }
        }
      }
    });
    console.log(`✅ Created enhanced cosmetic "${cosmetic.name}" with variants`);
  }
  return { allVariants: allCreatedVariants };
} 
