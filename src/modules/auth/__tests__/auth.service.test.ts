import { HttpStatus } from "@/common/enums/http-status.enum";
import {
  assertError,
  clearDatabase,
  createTestUser,
  prisma,
} from "@/test/utils";

import { AuthService } from "../auth.service";

describe("AuthService", () => {
  let testUser: any;

  beforeEach(async () => {
    // Initialize test data
    testUser = await createTestUser({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const newUser = await AuthService.register({
        email: "new@example.com",
        password: "password123",
        name: "New User",
      });

      expect(newUser).toBeDefined();
      expect(newUser.accessToken).toBeDefined();
      expect(newUser.refreshToken).toBeDefined();
    });

    it("should throw error when registering with existing email", async () => {
      // First, create the test user
      await createTestUser({
        email: testUser.email,
        password: "password123",
        name: "Test User",
      });

      // Attempt to register the same user again
      try {
        await AuthService.register({
          email: testUser.email,
          password: "password123",
          name: "Test User",
        });
        fail("Should have thrown an error");
      } catch (error) {
        assertError(error, HttpStatus.BAD_REQUEST, "User already exists");
      }
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const loginResult = await AuthService.login({
        email: testUser.email,
        password: "password123",
      });

      expect(loginResult).toBeDefined();
      expect(loginResult.accessToken).toBeDefined();
      expect(loginResult.refreshToken).toBeDefined();
    });

    it("should throw error with invalid credentials", async () => {
      try {
        await AuthService.login({
          email: testUser.email,
          password: "wrongpassword",
        });
        fail("Should have thrown an error");
      } catch (error) {
        assertError(error, HttpStatus.UNAUTHORIZED, "Invalid credentials");
      }
    });
  });
});
