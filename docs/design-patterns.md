# Design Patterns trong Dự Án

## Các Pattern Đã Triển Khai

### 1. Creational Patterns (Nhóm Khởi Tạo)
1. **Singleton Pattern**
   - Đảm bảo một class chỉ có một instance duy nhất
   - Được sử dụng trong:
     - Prisma Client (`src/config/prisma.ts`)
     - Redis Client (`src/config/redis.ts`)

2. **Factory Pattern**
   - Cung cấp interface để tạo đối tượng
   - Được sử dụng trong:
     - Logger Factory (`src/common/logger/logger.factory.ts`)

### 2. Structural Patterns (Nhóm Cấu Trúc)
1. **Repository Pattern**
   - Lớp trung gian giữa domain và data mapping
   - Được sử dụng trong:
     - Auth Repository (`src/modules/auth/auth.repository.ts`)

2. **Strategy Pattern**
   - Đóng gói các thuật toán có thể hoán đổi
   - Được sử dụng trong:
     - Authentication Strategy (`src/modules/auth/strategies/jwt.strategy.ts`)

### 3. Behavioral Patterns (Nhóm Hành Vi)
1. **Observer Pattern**
   - Định nghĩa sự phụ thuộc một-nhiều giữa các đối tượng
   - Được sử dụng trong:
     - Health Check Observer (`src/config/db.health.ts`)

2. **Middleware Pattern**
   - Thêm chức năng mới mà không thay đổi cấu trúc
   - Được sử dụng trong:
     - Auth Middleware (`src/common/middlewares/auth.middleware.ts`)

## Các Pattern Có Thể Áp Dụng Thêm

### 1. Creational Patterns
1. **Builder Pattern**
   - Xây dựng đối tượng phức tạp từng bước
   - Có thể áp dụng cho:
     - Tạo cấu hình phức tạp
     - Xây dựng query phức tạp

2. **Prototype Pattern**
   - Tạo đối tượng mới bằng cách sao chép
   - Có thể áp dụng cho:
     - Cache objects
     - Template objects

### 2. Structural Patterns
1. **Adapter Pattern**
   - Chuyển đổi interface của class
   - Có thể áp dụng cho:
     - Tích hợp service bên thứ ba
     - Legacy code integration

2. **Decorator Pattern**
   - Thêm chức năng động cho đối tượng
   - Có thể áp dụng cho:
     - Request/Response handling
     - Logging enhancement

### 3. Behavioral Patterns
1. **Command Pattern**
   - Đóng gói request thành đối tượng
   - Có thể áp dụng cho:
     - API request handling
     - Task queue

2. **Template Method Pattern**
   - Định nghĩa skeleton của thuật toán
   - Có thể áp dụng cho:
     - Common business logic
     - Workflow processing

## Kết Luận
Việc áp dụng các design patterns giúp:
1. Code dễ đọc và bảo trì
2. Dễ dàng mở rộng và thêm tính năng
3. Tách biệt các thành phần
4. Tăng khả năng tái sử dụng code
5. Dễ dàng kiểm thử và debug 
