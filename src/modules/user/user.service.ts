import * as bcrypt from "bcrypt";
import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO, UserResponse } from "./types/user.types";

export class UserService {
  static prisma = new PrismaClient();

  static async findAll(): Promise<UserResponse[]> {
    const users = await UserService.prisma.user.findMany();
    return users.map(UserService.mapToResponse);
  }

  static async findById(id: string): Promise<UserResponse> {
    const user = await UserService.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
    }
    return UserService.mapToResponse(user);
  }

  static async findByEmail(email: string): Promise<UserResponse> {
    const user = await UserService.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
    }
    return UserService.mapToResponse(user);
  }

  static async create(data: CreateUserDTO): Promise<UserResponse> {
    const existingUser = await UserService.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new HttpException(HttpStatus.BAD_REQUEST, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserService.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return UserService.mapToResponse(user);
  }

  static async update(id: string, data: UpdateUserDTO): Promise<UserResponse> {
    const user = await UserService.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
    }
    if (data.email && data.email !== user.email) {
      const existingUser = await UserService.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new HttpException(HttpStatus.BAD_REQUEST, "Email already exists");
      }
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const updatedUser = await UserService.prisma.user.update({
      where: { id },
      data,
    });
    return UserService.mapToResponse(updatedUser);
  }

  static async delete(id: string): Promise<void> {
    const user = await UserService.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
    }
    await UserService.prisma.user.delete({
      where: { id },
    });
  }

  private static mapToResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      googleId: user.googleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
