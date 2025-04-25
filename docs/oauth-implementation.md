# Hướng Dẫn Triển Khai Google OAuth

## Tổng Quan
Tài liệu này mô tả việc triển khai xác thực Google OAuth trong ứng dụng của chúng ta. Hệ thống hỗ trợ cả xác thực truyền thống bằng email/mật khẩu và đăng nhập qua Google OAuth.

## Kiến Trúc

### Các Thành Phần
1. **Chiến Lược Google OAuth**
   - Vị trí: `src/config/google-oauth.config.ts`
   - Xử lý luồng xác thực OAuth2.0 với Google
   - Cấu hình thông qua biến môi trường

2. **Auth Router**
   - Vị trí: `src/modules/auth/auth.router.ts`
   - Định nghĩa các routes OAuth:
     - `/auth/google` - Khởi tạo OAuth flow
     - `/auth/google/callback` - Xử lý callback từ Google
     - `/auth/refresh-token` - Làm mới token
     - `/auth/logout` - Đăng xuất

3. **Auth Controller**
   - Vị trí: `src/modules/auth/auth.controller.ts`
   - Quản lý các routes OAuth và callbacks
   - Xử lý thiết lập cookie và chuyển hướng

4. **Auth Service**
   - Vị trí: `src/modules/auth/auth.service.ts`
   - Xử lý dữ liệu người dùng OAuth
   - Quản lý tạo/cập nhật người dùng
   - Tạo JWT tokens

5. **Tích Hợp Redis**
   - Vị trí: `src/config/redis.ts`
   - Xử lý blacklist token
   - Quản lý trạng thái phiên

## Chi Tiết Triển Khai

### 1. Cấu Hình Google OAuth
```typescript
export const googleOAuthConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
  scope: ['profile', 'email'],
};
```

### 2. Routes OAuth
```typescript
// Routes Google OAuth
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleAuthCallback);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
```

### 3. Model Người Dùng
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String?
  name      String
  googleId  String?  @unique
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. Luồng Xác Thực
1. **Khởi Tạo OAuth**
   ```typescript
   static async googleAuth(req: Request, res: Response): Promise<void> {
     passport.authenticate('google', { 
       scope: ['profile', 'email'],
       prompt: 'select_account'
     })(req, res);
   }
   ```

2. **Xử Lý Callback**
   ```typescript
   static async googleAuthCallback(req: Request, res: Response): Promise<void> {
     passport.authenticate('google', async (err: Error, profile: any) => {
       if (err) {
         return res.redirect(`${googleOAuthConfig.frontendURL}/auth/error`);
       }
       
       try {
         const authResponse = await AuthService.handleGoogleOAuth(profile);
         this.setAuthCookies(res, authResponse);
         res.redirect(`${googleOAuthConfig.frontendURL}/auth/success`);
       } catch (error) {
         res.redirect(`${googleOAuthConfig.frontendURL}/auth/error`);
       }
     })(req, res);
   }
   ```

3. **Xử Lý Người Dùng**
   ```typescript
   static async handleGoogleOAuth(profile: Profile): Promise<AuthResponseDto> {
     const user = await this.findOrCreateUser(profile);
     const tokens = await this.generateTokens(user);
     return {
       user: {
         id: user.id,
         email: user.email,
         name: user.name,
         role: user.role
       },
       ...tokens
     };
   }
   ```

## Biện Pháp Bảo Mật

### Lưu Trữ Token
- Access token được trả về trong response body
- Refresh token được lưu trong HTTP-only cookie
- Hỗ trợ cross-domain với SameSite=lax
- Bật flag Secure trong môi trường production

### Làm Mới Token
```typescript
const newAccessToken = jwt.sign(
  { 
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
```

### Blacklist Token
```typescript
if (redis && refreshToken) {
  await redis.set(`blacklist:${refreshToken}`, '1', 'EX', 7 * 24 * 60 * 60); // 7 days
}
```

## Xử Lý Lỗi

### Lỗi OAuth
```typescript
catch (error) {
  logger.error('Lỗi Google OAuth:', error);
  res.redirect(`${googleOAuthConfig.frontendURL}/auth/error`);
}
```

### Kiểm Tra Token
```typescript
if (!accessToken && !refreshToken) {
  return res.status(401).json({
    status: 'error',
    message: 'Yêu cầu xác thực'
  });
}
```

## Kiểm Thử

### Các Bước Kiểm Thử Thủ Công
1. Truy cập `/auth/google`
2. Hoàn thành màn hình đồng ý của Google
3. Xác nhận chuyển hướng về frontend
4. Kiểm tra sự hiện diện của cookie
5. Xác nhận làm mới token
6. Kiểm tra luồng đăng xuất

### Response Mẫu
```typescript
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}
```

## Tích Hợp Frontend

### URL Chuyển Hướng
- Thành công: `${FRONTEND_URL}/auth/success`
- Lỗi: `${FRONTEND_URL}/auth/error`

### Truy Cập Cookie
- Cookies được thiết lập HTTP-only
- Frontend xử lý chuyển hướng
- Sử dụng endpoint refresh token để làm mới token

## Bảo Trì

### Biến Môi Trường
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### Cập Nhật Bảo Mật
- Cập nhật dependencies thường xuyên
- Giám sát hết hạn token
- Rà soát quản lý phiên
