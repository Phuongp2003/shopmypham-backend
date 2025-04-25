# Backend Skeleton

A Node.js + TypeScript backend skeleton with Prisma, Redis, and Swagger.

## Features

- Node.js + TypeScript
- Prisma ORM
- Redis caching (optional)
- Swagger/OpenAPI documentation
- JWT authentication
- Docker support
- NGINX reverse proxy

## Prerequisites

- Node.js 20.x
- Docker and Docker Compose
- PostgreSQL 15
- Redis 7 (optional)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Initialize the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

## Development

Run the development server:
```bash
npm run dev
```

The server will be available at `http://localhost:3000`

## Docker

Start all services:
```bash
docker-compose up -d
```

Stop all services:
```bash
docker-compose down
```

## API Documentation

Swagger UI is available at:
- Development: `http://localhost:3000/docs`
- Docker: `http://localhost/docs`

## Project Structure

```
backend/
├── src/
│   ├── modules/          # Feature modules
│   ├── common/           # Shared utilities
│   ├── config/           # Configuration files
│   ├── core/             # Core application logic
│   └── types/            # TypeScript type definitions
├── prisma/               # Database schema and migrations
├── docker/               # Docker configuration
└── nginx/                # NGINX configuration
```

## License

MIT 
