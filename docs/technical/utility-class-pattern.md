[← Triển Khai OAuth](../oauth-implementation.md)

# Technical

# Utility Class Pattern trong Dự Án

## 1. Đặc điểm chung

- **Chỉ dùng để đăng ký, không khởi tạo instance**: Các class như Service, Controller, Middleware đều chỉ chứa các phương thức static.
- **Stateless**: Không lưu trữ trạng thái nội bộ, mọi logic đều thực hiện qua các phương thức static.
- **Dễ mở rộng**: Có thể kế thừa và override các phương thức static nếu cần mở rộng logic.
- **Đăng ký trực tiếp**: Sử dụng trực tiếp tên class và phương thức static khi đăng ký vào router hoặc middleware.

## 2. Mẫu code chuẩn

### Service
```typescript
export class ExampleService {
  static async doSomething(param: string): Promise<Result> {
    // ...logic
  }
}
```

### Controller
```typescript
export class ExampleController {
  static async handleRequest(req: Request, res: Response) {
    const result = await ExampleService.doSomething(req.body.param);
    res.json(result);
  }
}
```

### Middleware
```typescript
export class ExampleMiddleware {
  static async handle(req: Request, res: Response, next: NextFunction) {
    // ...logic kiểm tra
    next();
  }
}
```

## 3. Cách sử dụng

- **Service**: Gọi trực tiếp qua tên class, không cần new:
  ```typescript
  await ExampleService.doSomething(param);
  ```
- **Controller**: Đăng ký method static vào router:
  ```typescript
  router.get('/example', ExampleController.handleRequest);
  ```
- **Middleware**: Đăng ký method static vào router hoặc app:
  ```typescript
  router.use(ExampleMiddleware.handle);
  ```

## 4. Lợi ích
- Đơn giản hóa việc sử dụng, không cần quản lý instance
- Dễ test, dễ mở rộng
- Tránh lỗi do khởi tạo nhiều instance không cần thiết
- Phù hợp với các logic stateless, dùng chung toàn ứng dụng

## 5. Lưu ý
- Không nên dùng cho các class cần lưu trạng thái riêng biệt cho từng instance
- Nếu cần mở rộng, hãy kế thừa và override các phương thức static
- Đảm bảo không sử dụng biến instance (this) trong các phương thức static

---

[← Triển Khai OAuth](../oauth-implementation.md)
