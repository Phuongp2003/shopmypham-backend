import { User } from "@prisma/client";

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
