import { z } from "zod";

import { User } from "@prisma/client";

import { AuthResponseDto } from "./auth.dto";

export type AuthUser = Pick<User, "id" | "email" | "role" | "name"> & {
  googleId?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = z.infer<typeof AuthResponseDto>;

export type AuthPayload = {
  id: string;
  email: string;
  role: string;
  name: string;
  googleId?: string;
};
