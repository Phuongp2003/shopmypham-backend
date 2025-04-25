# API Documentation

## 1. Authentication

### 1.1 Đăng Ký
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Response**
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

**Access Token Payload**
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "name": "User Name",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 1.2 Đăng Nhập
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

**Access Token Payload**
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "name": "User Name",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 1.3 Làm Mới Token
```http
POST /auth/refresh-token
```

**Response**
```json
{
  "accessToken": "new-jwt-token",
  "refreshToken": "new-refresh-token"
}
```

**Access Token Payload**
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "name": "User Name",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 1.4 Đăng Xuất
```http
POST /auth/logout
Authorization: Bearer <access-token>
```

**Response**
```json
{
  "message": "Logged out successfully"
}
```

## 2. Health Check

### 2.1 Kiểm Tra Sức Khỏe
```http
GET /healthz
```

**Response**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": true,
    "redis": true
  }
}
```

## 3. Posts

### 3.1 Get All Posts
```http
GET /posts?search=keyword&sortBy=createdAt&sortOrder=desc&page=1&limit=10&published=true
Authorization: Bearer <access-token>
```

**Response**
```json
{
  "posts": [
    {
      "id": "post-id",
      "title": "Post Title",
      "content": "Post Content",
      "published": true,
      "author": {
        "id": "user-id",
        "name": "Author Name",
        "email": "author@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### 3.2 Get Post by ID
```http
GET /posts/{id}
Authorization: Bearer <access-token>
```

**Response**
```json
{
  "id": "post-id",
  "title": "Post Title",
  "content": "Post Content",
  "published": true,
  "author": {
    "id": "user-id",
    "name": "Author Name",
    "email": "author@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.3 Create Post
```http
POST /posts
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "title": "New Post",
  "content": "Post content",
  "published": true
}
```

**Response**
```json
{
  "id": "post-id",
  "title": "New Post",
  "content": "Post content",
  "published": true,
  "author": {
    "id": "user-id",
    "name": "Author Name",
    "email": "author@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.4 Update Post
```http
PUT /posts/{id}
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "title": "Updated Post",
  "content": "Updated content",
  "published": false
}
```

**Response**
```json
{
  "id": "post-id",
  "title": "Updated Post",
  "content": "Updated content",
  "published": false,
  "author": {
    "id": "user-id",
    "name": "Author Name",
    "email": "author@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.5 Delete Post
```http
DELETE /posts/{id}
Authorization: Bearer <access-token>
```

**Response**
```http
204 No Content
```

## 4. Cosmetics

### 4.1 Get All Cosmetics
```http
GET /cosmetics?search=keyword&sortBy=createdAt&sortOrder=desc&page=1&limit=10&category=face
Authorization: Bearer <access-token>
```

**Response**
```json
{
  "cosmetics": [
    {
      "id": "cosmetic-id",
      "name": "Cosmetic Name",
      "description": "Product description",
      "price": 29.99,
      "category": "face",
      "brand": "Brand Name",
      "stock": 100,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### 4.2 Get Cosmetic by ID
```http
GET /cosmetics/{id}
Authorization: Bearer <access-token>
```

**Response**
```json
{
  "id": "cosmetic-id",
  "name": "Cosmetic Name",
  "description": "Product description",
  "price": 29.99,
  "category": "face",
  "brand": "Brand Name",
  "stock": 100,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 4.3 Create Cosmetic
```http
POST /cosmetics
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "name": "New Cosmetic",
  "description": "Product description",
  "price": 29.99,
  "category": "face",
  "brand": "Brand Name",
  "stock": 100
}
```

**Response**
```json
{
  "id": "cosmetic-id",
  "name": "New Cosmetic",
  "description": "Product description",
  "price": 29.99,
  "category": "face",
  "brand": "Brand Name",
  "stock": 100,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 4.4 Update Cosmetic
```http
PUT /cosmetics/{id}
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "name": "Updated Cosmetic",
  "description": "Updated description",
  "price": 39.99,
  "category": "face",
  "brand": "Brand Name",
  "stock": 50
}
```

**Response**
```json
{
  "id": "cosmetic-id",
  "name": "Updated Cosmetic",
  "description": "Updated description",
  "price": 39.99,
  "category": "face",
  "brand": "Brand Name",
  "stock": 50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 4.5 Delete Cosmetic
```http
DELETE /cosmetics/{id}
Authorization: Bearer <access-token>
```

**Response**
```http
204 No Content
```

## 5. Error Responses

### 5.1 Validation Error
```json
{
  "status": "error",
  "message": "Validation failed",
  "details": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

### 5.2 Authentication Error
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

### 5.3 Authorization Error
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

### 5.4 Not Found Error
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### 5.5 Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## 6. Security

### 6.1 Authentication
- Sử dụng JWT cho authentication
- Access token hết hạn sau 15 phút
- Refresh token hết hạn sau 7 ngày
- Refresh token được lưu trong HTTP-only cookie

### 6.2 Headers
- `Authorization: Bearer <access-token>` cho các request yêu cầu xác thực
- `Content-Type: application/json` cho request body

### 6.3 Rate Limiting
- 100 requests/phút cho mỗi IP
- 10 requests/phút cho các endpoint authentication

## 7. Best Practices

### 7.1 Request
- Sử dụng HTTPS
- Validate input data
- Handle errors gracefully
- Use proper HTTP methods

### 7.2 Response
- Return appropriate HTTP status codes
- Include meaningful error messages
- Use consistent response format
- Implement proper caching

### 7.3 Security
- Never expose sensitive data
- Implement proper authentication
- Use secure headers
- Validate all inputs 
