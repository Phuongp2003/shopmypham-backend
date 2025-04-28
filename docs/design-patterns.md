# Design Patterns trong Dự Án

## Các Pattern Đã Triển Khai

### 1. Creational Patterns (Nhóm Khởi Tạo)
1. **Singleton Pattern**
   - Đảm bảo một class chỉ có một instance duy nhất
   - Được sử dụng trong:
     - Prisma Client (`src/config/prisma.ts`)
       ```typescript
       // Sử dụng global variable để đảm bảo single instance
       declare global {
         var prisma: PrismaClient | undefined;
       }
       const prisma = global.prisma || new PrismaClient({
         log: ['info', 'warn', 'error'],
       });
       ```
     - Redis Client (`src/config/redis.ts`)
       ```typescript
       // Sử dụng static instance và getInstance method
       class RedisClient {
         private static instance: Redis | null = null;
         private static isConnecting: boolean = false;

         static async getInstance(): Promise<Redis | null> {
           if (this.instance) return this.instance;
           // ... connection handling logic
         }
       }
       ```

2. **Factory Pattern**
   - Cung cấp interface để tạo đối tượng với các cấu hình khác nhau
   - Được sử dụng trong:
     - Logger Factory (`src/common/logger/logger.factory.ts`)
       ```typescript
       // Tạo logger với nhiều cấu hình và format
       const logger = winston.createLogger({
         levels,
         level: process.env.LOG_LEVEL || 'info',
         format,
         transports: [
           new winston.transports.Console({ format: consoleFormat }),
           new winston.transports.DailyRotateFile({
             filename: 'logs/error-%DATE%.log',
             datePattern: 'YYYY-MM-DD',
             maxSize: '20m',
             level: 'error'
           })
         ]
       });
       ```

### 2. Structural Patterns (Nhóm Cấu Trúc)
1. **Repository Pattern**
   - Lớp trung gian giữa domain và data mapping
   - Được sử dụng trong:
     - Auth Service (`src/modules/auth/auth.service.ts`)
       ```typescript
       export class AuthService {
         static async login(input: z.infer<typeof LoginDto>): Promise<AuthResponseDto> {
           // Tách biệt logic xử lý auth khỏi database
           const user = await prisma.user.findUnique({
             where: { email: validatedData.email },
           });
           // ... authentication logic
         }
       }
       ```

### 3. Behavioral Patterns (Nhóm Hành Vi)
1. **Template Method Pattern**
   - Định nghĩa khuôn mẫu cho một thuật toán
   - Được sử dụng trong:
     - App Initializer (`src/core/startup.ts`)
       ```typescript
       export class AppInitializer {
         static async initialize(): Promise<Express> {
           // Template method với các bước khởi tạo rõ ràng
           await this.initializeServices();
           this.registerRoutes();
           this.registerErrorHandler();
           
           // Graceful shutdown handling
           process.on('SIGTERM', async () => {
             cleanupHealthCheck();
             process.exit(0);
           });
           
           return this.app;
         }
       }
       ```

2. **Middleware Pattern**
   - Thêm chức năng mới mà không thay đổi cấu trúc
   - Được sử dụng trong:
     - Auth Middleware (`src/common/middlewares/auth.middleware.ts`)
       ```typescript
       export class AuthMiddleware {
         static async authenticate(req: Request, res: Response, next: NextFunction) {
           // Xử lý authentication
           const accessToken = req.cookies.accessToken;
           // ... token validation logic
         }
       }
       ```
     - Role Middleware (`src/common/middlewares/role.middleware.ts`)
       ```typescript
       // Xử lý role-based access control
       export const requireRole = (roles: UserRole[]) => {
         return (req: Request, res: Response, next: NextFunction) => {
           // ... role checking logic
         };
       };
       ```

3. **Observer Pattern**
   - Định nghĩa sự phụ thuộc một-nhiều giữa các đối tượng
   - Được sử dụng trong:
     - Health Check Observer (`src/config/db.health.ts`)
       ```typescript
       export const startHealthCheck = (intervalMs = 0) => {
         const check = async () => {
           // Monitor database connections
           const health = await checkDatabaseHealth();
           // ... health check logic
         };
         
         // Cleanup handling
         return () => {
           if (intervalId) clearInterval(intervalId);
         };
       };
       ```

## Kết Luận
Việc áp dụng các design patterns trong dự án giúp:
1. Đảm bảo tính nhất quán trong việc quản lý database connections và cache
2. Cung cấp một cách tiếp cận có cấu trúc cho việc logging và xử lý lỗi
3. Tách biệt logic xác thực và quản lý người dùng
4. Dễ dàng mở rộng và bảo trì code
5. Tăng khả năng tái sử dụng code
6. Quản lý lifecycle của ứng dụng một cách hiệu quả

## Các Pattern Có Thể Áp Dụng Thêm
1. **Strategy Pattern**
   - Có thể áp dụng cho việc xử lý các chiến lược xác thực khác nhau
   - Giúp dễ dàng thêm các phương thức xác thực mới

2. **Decorator Pattern**
   - Có thể áp dụng cho việc thêm metadata và validation cho các route handlers
   - Giúp giảm code lặp lại trong việc xử lý request

3. **Command Pattern**
   - Có thể áp dụng cho việc xử lý các tác vụ bất đồng bộ
   - Giúp quản lý các job và task queue hiệu quả hơn
