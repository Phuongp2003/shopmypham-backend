# Cấu Trúc Dự Án

## 1. Thư Mục

```
src/
├── config/                 # Cấu hình ứng dụng
│   ├── prisma.ts          # Cấu hình Prisma
│   ├── redis.ts           # Cấu hình Redis
│   ├── swagger.ts         # Cấu hình Swagger
│   └── db.health.ts       # Kiểm tra sức khỏe database
├── common/                 # Code dùng chung
│   ├── logger/            # Hệ thống logging
│   └── middlewares/       # Middleware dùng chung
├── modules/               # Các module chức năng
│   └── auth/             # Module xác thực
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       ├── auth.repository.ts
│       └── auth.router.ts
└── core/                  # Core của ứng dụng
    └── startup.ts         # Khởi tạo ứng dụng
```

## 2. Module

### 2.1 Config Module
- Quản lý cấu hình toàn bộ ứng dụng
- Các thành phần chính:
  - Prisma: Quản lý kết nối database
  - Redis: Quản lý cache và session
  - Swagger: Tài liệu API
  - Health Check: Kiểm tra sức khỏe hệ thống

### 2.2 Common Module
- Các thành phần dùng chung:
  - Logger: Hệ thống logging
  - Middleware: Xử lý request/response
  - Utils: Các hàm tiện ích

### 2.3 Auth Module
- Quản lý xác thực và phân quyền
- Các thành phần:
  - Controller: Xử lý HTTP request
  - Service: Logic nghiệp vụ
  - Repository: Truy cập dữ liệu
  - Router: Định nghĩa routes
  - Strategies: Các phương thức xác thực

## 3. Cấu Hình

### 3.1 Database
- Sử dụng MySQL thông qua Prisma ORM
- Cấu hình kết nối trong `.env`:
  ```
  DATABASE_URL="mysql://user:password@host:port/database"
  ```

### 3.2 Redis
- Sử dụng Redis cho caching và session
- Cấu hình trong `.env`:
  ```
  REDIS_HOST="host"
  REDIS_PORT=6379
  REDIS_PASSWORD="password"
  ```

### 3.3 Server
- Express.js server
- Cấu hình trong `.env`:
  ```
  PORT=3000
  NODE_ENV=development
  ```

### 3.4 JWT
- Xác thực bằng JWT
- Cấu hình trong `.env`:
  ```
  JWT_SECRET="secret-key"
  ```

## 4. Design Patterns

### 4.1 Đã Triển Khai
- Singleton: Prisma, Redis
- Factory: Logger
- Repository: Auth
- Strategy: Authentication
- Middleware: Auth
- Observer: Health Check

### 4.2 Có Thể Áp Dụng
- Builder: Query Builder
- Prototype: Cache Objects
- Adapter: Third-party Services
- Decorator: Request/Response
- Command: API Requests
- Template Method: Business Logic 
