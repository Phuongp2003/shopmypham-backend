# Hướng Dẫn Cài Đặt

## 1. Yêu Cầu Hệ Thống

### 1.1 Phần Cứng
- CPU: 2 cores trở lên
- RAM: 4GB trở lên
- Ổ cứng: 10GB trống

### 1.2 Phần Mềm
- Node.js: v18.x trở lên
- npm: v9.x trở lên
- MySQL: v8.x
- Redis: v6.x
- Docker (tùy chọn)

## 2. Cài Đặt

### 2.1 Clone Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2.2 Cài Đặt Dependencies
```bash
npm install
```

### 2.3 Cấu Hình Môi Trường
1. Tạo file `.env` từ `.env.example`
2. Cập nhật các biến môi trường:
   ```env
   # Database
   DATABASE_URL="mysql://user:password@host:port/database"

   # Redis
   REDIS_HOST="host"
   REDIS_PORT=6379
   REDIS_PASSWORD="password"

   # Server
   PORT=3000
   NODE_ENV=development

   # JWT
   JWT_SECRET="secret-key"
   ```

### 2.4 Khởi Tạo Database
```bash
# Tạo schema
npx prisma db push

# Seed dữ liệu (nếu có)
npx prisma db seed
```

## 3. Chạy Ứng Dụng

### 3.1 Development Mode
```bash
npm run dev
```

### 3.2 Production Mode
```bash
npm run build
npm start
```

### 3.3 Docker (Tùy chọn)
```bash
# Build image
docker build -t <image-name> .

# Run container
docker run -p 3000:3000 <image-name>
```

## 4. Kiểm Tra

### 4.1 Health Check
```bash
curl http://localhost:3000/healthz
```

### 4.2 API Documentation
- Truy cập: http://localhost:3000/docs
- Swagger UI sẽ hiển thị tất cả API endpoints

## 5. Troubleshooting

### 5.1 Database Connection
- Kiểm tra DATABASE_URL trong .env
- Đảm bảo MySQL service đang chạy
- Kiểm tra quyền truy cập database

### 5.2 Redis Connection
- Kiểm tra REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
- Đảm bảo Redis service đang chạy
- Kiểm tra firewall settings

### 5.3 Logs
- Kiểm tra logs trong thư mục `logs/`
- Development mode: logs hiển thị trên console
- Production mode: logs được lưu vào file

## 6. Development Workflow

### 6.1 Tạo Module Mới
1. Tạo thư mục trong `src/modules/`
2. Tạo các file cần thiết:
   - controller.ts
   - service.ts
   - repository.ts
   - router.ts
3. Đăng ký router trong `src/core/startup.ts`

### 6.2 Testing
```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm run test:coverage
```

### 6.3 Linting
```bash
# Kiểm tra lỗi
npm run lint

# Sửa lỗi tự động
npm run lint:fix
``` 
